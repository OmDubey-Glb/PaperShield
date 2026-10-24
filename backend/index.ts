/**
 * PaperShield API integration placeholder.
 *
 * The deployed AppDeploy backend is not exported in this starter archive.
 * Connect your document OCR + AI provider here before treating uploads as
 * production analysis. Never expose API keys in frontend code.
 *
 * Expected frontend contract:
 * POST /api/analyze { text, language, languageCode }
 * POST /api/ask { document, question, language, languageCode }
 */
export const paperShieldApiContract = {
  analyze: "/api/analyze",
  ask: "/api/ask",
  supportedLanguages: ["en", "hi", "mr"]
} as const;