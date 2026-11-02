import AiWidget from "../components/AiWidget";

export default function Humanizer() {
  return (
    <AiWidget
      title="AI Humanizer"
      description="Humanize your text."
      widgetId={import.meta.env.VITE_CLEVER_AI_HUMEN_ID}
    />
  );
}
