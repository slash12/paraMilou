import AiWidget from "../components/AiWidget";

export default function AiDetect() {
  return (
    <AiWidget
        title="AI Detector"
        description="Check your text for AI-generated content."
        widgetId={import.meta.env.VITE_CLEVER_AI_DETECT_WIDGET_ID}
      />
  );
}
