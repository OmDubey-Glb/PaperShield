# PaperShield

A multilingual, voice-first interface for helping people understand official paperwork in **English, Hindi and Marathi**.

## Included in this repository

- Responsive React + TypeScript + Vite frontend
- Warm ivory and teal glass-inspired UI
- Camera capture input and PDF/image file picker
- English, Hindi and Marathi interface strings
- Browser speech recognition and speech synthesis hooks
- Sample notice for a quick demo
- Backend integration contract placeholders

## Important: source-export limitation

This ZIP is a **GitHub-ready starter/reconstructed project**, not a byte-for-byte export of the deployed AppDeploy application. The original AppDeploy backend implementation and its private configuration were not available for export in this session. The backend files in this ZIP are integration placeholders.

The frontend supports the interface and demo flow. Real PDF text extraction, photo OCR, document-grounded AI analysis and backend question answering require connecting the actual analysis API. Without that API, the app displays preview-mode/sample explanations and clearly indicates this limitation.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Connect the deployed PaperShield API

Create a local `.env` file (do not commit it) and set:

```env
VITE_API_BASE_URL=https://YOUR-API-HOST
```

The frontend expects:
- `POST /api/analyze` with `{ "text": "...", "language": "Hindi", "languageCode": "hi" }`
- Response containing `{ "result": { "summary": "..." } }`

Question answering should be implemented as an authenticated endpoint and connected in `src/App.tsx`. Make sure the server prompt strictly follows the selected language and grounds every claim in the supplied document.

## GitHub upload

1. Create a repository named `PaperShield`.
2. Extract this ZIP on your computer.
3. Upload the contents of the `PaperShield` folder (not the ZIP itself) to the repository.
4. Commit with message `Add PaperShield starter project`.

## Security and privacy

- Never commit `.env`, API keys, access tokens, uploaded documents or personal information.
- Keep provider credentials on the server, never in `VITE_*` variables.
- Use HTTPS and request camera/microphone permissions only when needed.
- Do not treat AI output as legal, financial or government advice. Verify deadlines, amounts and instructions with the issuing organization.
