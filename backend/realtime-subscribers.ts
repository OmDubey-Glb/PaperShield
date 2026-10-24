/**
 * Realtime event subscriber placeholder.
 * Wire authenticated session events here when connecting a realtime backend.
 */
export type PaperShieldVoiceEvent =
  | { type: "listening"; language: "en" | "hi" | "mr" }
  | { type: "transcript"; text: string }
  | { type: "assistant_reply"; text: string };