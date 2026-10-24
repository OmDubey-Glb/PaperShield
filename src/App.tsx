import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Mic, Camera, UploadCloud, FileText, Globe, ArrowRight, Volume2, Trash2, Sparkles } from "lucide-react";

type Lang = "en" | "hi" | "mr";
const copy = {
  en: { kicker:"PAPERWORK, MADE HUMAN", title:"Official paperwork, explained like a human would.", sub:"Your documents. Your language. Your privacy.", add:"Add a document", hint:"Take a clear photo of a notice or choose a PDF from your device.", camera:"Use camera", pdf:"Upload PDF", private:"Private session · no document library", sample:"Try a sample notice", report:"Important details", listen:"Enable hands-free voice", ask:"Ask a question about your document…", analyze:"Analyze document", empty:"Your explanation will appear here.", mic:"Listening… speak now", allow:"Your browser will ask before the camera or microphone starts.", clear:"Clear session", sampleTitle:"Sample document notice", sampleText:"This is a fictional sample for testing only. It mentions checking identity documents, a sample loan balance and overdue payments, and a reminder to verify information with the real bank using official contact details.", summary:"This is a fictional sample notice. It asks the reader to verify identity information and check any loan balance or overdue payment details directly with their bank.", points:["The notice is a fictional sample, not a real demand.","Verify identity-document requests through the bank’s official website or phone number.","Check any loan balance and overdue payment amounts against an official bank statement.","Do not act on property or legal warnings without confirming them with the bank and a qualified adviser."] },
  hi: { kicker:"कागज़ी काम, अब आसान", title:"सरकारी और ज़रूरी दस्तावेज़, आसान भाषा में समझें।", sub:"आपके दस्तावेज़। आपकी भाषा। आपकी निजता।", add:"दस्तावेज़ जोड़ें", hint:"नोटिस की साफ़ तस्वीर लें या अपने डिवाइस से PDF चुनें।", camera:"कैमरा इस्तेमाल करें", pdf:"PDF अपलोड करें", private:"निजी सत्र · दस्तावेज़ लाइब्रेरी नहीं", sample:"नमूना नोटिस देखें", report:"ज़रूरी जानकारी", listen:"हैंड्स-फ़्री आवाज़ चालू करें", ask:"अपने दस्तावेज़ के बारे में सवाल पूछें…", analyze:"दस्तावेज़ समझें", empty:"आपकी व्याख्या यहाँ दिखाई देगी।", mic:"सुन रहा हूँ… अब बोलें", allow:"कैमरा या माइक्रोफ़ोन शुरू करने से पहले ब्राउज़र अनुमति माँगेगा।", clear:"सत्र हटाएँ", sampleTitle:"नमूना दस्तावेज़ नोटिस", sampleText:"यह केवल परीक्षण के लिए एक काल्पनिक नमूना है। इसमें पहचान दस्तावेज़ जाँचने, ऋण की शेष राशि और बकाया भुगतान देखने तथा आधिकारिक संपर्क विवरण से बैंक से पुष्टि करने की बात है।", summary:"यह एक काल्पनिक नमूना नोटिस है। इसमें पहचान संबंधी जानकारी की पुष्टि करने और ऋण या बकाया भुगतान का विवरण सीधे बैंक से जाँचने को कहा गया है।", points:["यह नोटिस केवल काल्पनिक नमूना है, असली माँग नहीं।","पहचान दस्तावेज़ की माँग की पुष्टि बैंक की आधिकारिक वेबसाइट या फ़ोन नंबर से करें।","ऋण की राशि और बकाया भुगतान बैंक के आधिकारिक विवरण से मिलाएँ।","संपत्ति या कानूनी चेतावनी पर कार्रवाई करने से पहले बैंक और योग्य सलाहकार से पुष्टि करें।"] },
  mr: { kicker:"कागदपत्रांची भाषा सोपी", title:"अधिकृत कागदपत्रे, अगदी सोप्या भाषेत समजून घ्या.", sub:"तुमची कागदपत्रे. तुमची भाषा. तुमची गोपनीयता.", add:"कागदपत्र जोडा", hint:"नोटीसचा स्पष्ट फोटो काढा किंवा डिव्हाइसमधून PDF निवडा.", camera:"कॅमेरा वापरा", pdf:"PDF अपलोड करा", private:"खाजगी सत्र · कागदपत्र लायब्ररी नाही", sample:"नमुना नोटीस पाहा", report:"महत्त्वाचे तपशील", listen:"हँड्स-फ्री आवाज सुरू करा", ask:"तुमच्या कागदपत्राबद्दल प्रश्न विचारा…", analyze:"कागदपत्र समजावून घ्या", empty:"तुमचे स्पष्टीकरण येथे दिसेल.", mic:"ऐकत आहे… आता बोला", allow:"कॅमेरा किंवा मायक्रोफोन सुरू करण्यापूर्वी ब्राउझर परवानगी मागेल.", clear:"सत्र साफ करा", sampleTitle:"नमुना कागदपत्र नोटीस", sampleText:"ही केवळ चाचणीसाठी तयार केलेली काल्पनिक नमुना नोटीस आहे. यात ओळखपत्रे तपासणे, कर्जाची शिल्लक आणि थकीत हप्ते पाहणे, तसेच अधिकृत संपर्क तपशीलांद्वारे बँकेकडून खात्री करणे नमूद आहे.", summary:"ही काल्पनिक नमुना नोटीस आहे. यात ओळखविषयक माहितीची खात्री करण्यास आणि कर्जाची शिल्लक किंवा थकीत रक्कम थेट बँकेकडून तपासण्यास सांगितले आहे.", points:["ही नोटीस केवळ काल्पनिक नमुना आहे; खरी मागणी नाही.","ओळखपत्रांची मागणी बँकेच्या अधिकृत वेबसाइट किंवा फोनवरून तपासा.","कर्जाची शिल्लक आणि थकीत रक्कम बँकेच्या अधिकृत स्टेटमेंटशी पडताळा.","मालमत्ता किंवा कायदेशीर इशाऱ्यावर कृती करण्यापूर्वी बँक आणि पात्र सल्लागाराकडून खात्री करा."] }
};
export default function App() {
  const [lang,setLang] = useState<Lang>("en");
  const [fileName,setFileName] = useState("");
  const [text,setText] = useState("");
  const [report,setReport] = useState(false);
  const [question,setQuestion] = useState("");
  const [answer,setAnswer] = useState("");
  const [listening,setListening] = useState(false);
  const [busy,setBusy] = useState(false);
  const [voiceOn,setVoiceOn] = useState(false);
  const [error,setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const t = copy[lang];

  useEffect(()=>{ document.documentElement.lang = lang; },[lang]);
  function speak(value:string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(value);
    utter.lang = lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-IN";
    window.speechSynthesis.speak(utter);
  }
  function setSample() { setFileName(t.sampleTitle); setText(t.sampleText); setReport(true); setAnswer(""); }
  async function onFile(file?:File) {
    if (!file) return;
    setError(""); setFileName(file.name); setReport(false); setAnswer("");
    if (file.type === "text/plain") setText(await file.text());
    else if (file.type === "application/pdf") {
      setText("PDF selected: " + file.name + ". Connect a PDF text-extraction/OCR service to analyze its contents. For now, use the sample notice to preview the interface.");
      setError("PDF upload is ready. Actual PDF text extraction and AI analysis require the backend service to be configured.");
    } else if (file.type.startsWith("image/")) {
      setText("Image selected: " + file.name + ". Connect an OCR service to extract the text from this photo.");
      setError("Photo upload is ready. Actual image OCR and AI analysis require the backend service to be configured.");
    } else setError("Please choose a PDF, image or text file.");
  }
  async function analyze() {
    if (!text) { setSample(); return; }
    setBusy(true); setError("");
    try {
      const endpoint = import.meta.env.VITE_API_BASE_URL;
      if (endpoint) {
        const res = await fetch(endpoint.replace(/\/$/,"") + "/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text,language:lang==="hi"?"Hindi":lang==="mr"?"Marathi":"English",languageCode:lang})});
        if (!res.ok) throw new Error("Analysis service returned an error.");
        const data = await res.json();
        setAnswer(data.result?.summary || data.summary || "");
      } else {
        setAnswer(t.summary + "\n\n" + t.points.join("\n"));
        setError("Preview mode: connect your deployed PaperShield analysis API for real document OCR and AI explanations.");
      }
      setReport(true);
    } catch(e) { setError(e instanceof Error ? e.message : "Analysis failed."); }
    finally { setBusy(false); }
  }
  function startListening() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setError("Speech recognition is not supported in this browser. Try Chrome on Android or desktop."); return; }
    const rec = new SR(); rec.lang = lang==="hi"?"hi-IN":lang==="mr"?"mr-IN":"en-IN"; rec.interimResults=false; rec.continuous=false;
    rec.onresult = (e:any)=>{ const spoken=e.results[0][0].transcript; setQuestion(spoken); answerQuestion(spoken); };
    rec.onerror = ()=>setListening(false); rec.onend=()=>setListening(false);
    recognitionRef.current=rec; setListening(true); rec.start();
  }
  async function answerQuestion(q=question) {
    if (!q.trim()) return;
    const fallback = lang==="hi" ? "इस नमूना संस्करण में वास्तविक दस्तावेज़-आधारित उत्तर देने के लिए AI सेवा जोड़ना आवश्यक है। कृपया मूल दस्तावेज़ से जानकारी की पुष्टि करें।" : lang==="mr" ? "या नमुना आवृत्तीत कागदपत्रावर आधारित उत्तरांसाठी AI सेवा जोडणे आवश्यक आहे. कृपया मूळ कागदपत्रातून माहितीची खात्री करा." : "This preview needs the AI service connected to answer questions from your actual document. Please verify information against the original document.";
    setAnswer(fallback); speak(fallback);
  }
  function enableVoice() {
    const SR=(window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setError("Speech recognition is not supported in this browser."); return; }
    setVoiceOn(true); startListening();
  }
  function clear() { recognitionRef.current?.stop(); window.speechSynthesis?.cancel(); setVoiceOn(false); setListening(false); setFileName(""); setText(""); setReport(false); setAnswer(""); setQuestion(""); setError(""); }
  return <main className="shell">
    <header className="topbar"><div className="brand"><span className="brand-mark"><ShieldCheck/></span><span>Paper<span>Shield</span></span></div><div className="top-actions"><span className="privacy"><i/>Private mode</span><div className="language"><Globe size={17}/>{(["en","hi","mr"] as Lang[]).map(l=><button className={lang===l?"active":""} onClick={()=>{setLang(l);setAnswer("");}} key={l}>{l.toUpperCase()}</button>)}</div></div></header>
    <section className="hero"><div><div className="kicker">{t.kicker}</div><h1>{t.title}</h1><p>{t.sub}</p><div className="trust"><span><Mic/>Voice-first</span><span>文 3 languages</span><span><ShieldCheck/>Privacy-minded</span></div></div><div className="orb-wrap"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="orb"><Sparkles/></div><span className="orb-note">Your documents<br/>understood<br/>in your language</span></div></section>
    <section className="upload glass"><div className="section-head"><div><div className="step">01 / START HERE</div><h2>{t.add}</h2><p>{t.hint}</p></div><FileText className="file-icon"/></div>
      <div className="actions"><button className="primary" onClick={()=>cameraRef.current?.click()}><Camera/>{t.camera}<ArrowRight/></button><button className="secondary" onClick={()=>inputRef.current?.click()}><UploadCloud/>{t.pdf}</button></div>
      <input ref={cameraRef} hidden type="file" accept="image/*" capture="environment" onChange={e=>onFile(e.target.files?.[0])}/><input ref={inputRef} hidden type="file" accept="application/pdf,image/*,.txt" onChange={e=>onFile(e.target.files?.[0])}/>
      <div className="hint-row"><span><ShieldCheck size={17}/>{t.allow}</span><button onClick={()=>setSample()}>{t.sample}<ArrowRight size={15}/></button></div>
      {fileName && <div className="selected"><FileText size={18}/><span>{fileName}</span><button onClick={clear} aria-label="Clear"><Trash2 size={17}/></button></div>}
      {error && <p className="notice">{error}</p>}
      <div className="bottom-row"><span>{t.private}</span><button onClick={clear}>{t.clear}</button></div>
    </section>
    {fileName && <section className="report glass"><div className="step">02 / DOCUMENT EXPLANATION</div><h2>{t.report}</h2><button className="primary analyze" disabled={busy} onClick={analyze}>{busy?"Analyzing…":t.analyze}</button>{busy && <div className="loader"><div/></div>}{report && <><p className="summary">{answer || t.summary}</p><ol>{t.points.map((p,i)=><li key={i}>{p}</li>)}</ol><button className="listen" onClick={()=>speak(answer || t.summary)}><Volume2 size={18}/> {lang==="hi"?"सुनें":lang==="mr"?"ऐका":"Listen to explanation"}</button></>}</section>}
    <section className="voice glass"><div className="step">03 / VOICE ASSISTANT</div><h2>{t.listen}</h2><p>{t.empty}</p><button className="primary" onClick={enableVoice}><Mic/>{voiceOn?(listening?t.mic:"Start speaking"):t.listen}</button><div className="question"><input value={question} onChange={e=>setQuestion(e.target.value)} placeholder={t.ask}/><button onClick={()=>answerQuestion()}><ArrowRight/></button></div>{answer && <p className="voice-answer">{answer}</p>}</section>
    <footer><ShieldCheck size={17}/> SECURE · ACCESSIBLE · FOR EVERYONE</footer>
  </main>;
}