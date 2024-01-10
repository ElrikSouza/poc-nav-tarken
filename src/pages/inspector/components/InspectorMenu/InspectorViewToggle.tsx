import { InspectorViewMode } from "./inspector-menu.types";

interface InspectorViewToggleProps {
  onChangeMode: (newMode: InspectorViewMode) => void;
  currentMode: InspectorViewMode;
}

export function InspectorViewToggle({
  onChangeMode,
  currentMode,
}: InspectorViewToggleProps) {
  const label = currentMode === "contact" ? "Modo Integrante" : "Modo Cliente";

  const handleOnChange = () => {
    onChangeMode(currentMode === "contact" ? "customer" : "contact");
  };

  return (
    <button
      className="px-1 py-2 border-slate-800 border bg-slate-50 text-slate-800 hover:text-slate-200 hover:bg-slate-800"
      onClick={handleOnChange}
    >
      {label}
    </button>
  );
}
