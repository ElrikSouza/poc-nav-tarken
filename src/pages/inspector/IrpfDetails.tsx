import { useParams } from "react-router-dom";
import { useAppNavigation } from "../../routing/useAppNavigation";
import { InspectorKeys } from "../../routing/envs/inspector.keys";

export const IrpfDetails = () => {
  const { statementId } = useParams();

  const { handleSameEnvNav } = useAppNavigation();

  const handleBackToIrpf = () => {
    handleSameEnvNav({ params: {}, key: InspectorKeys.Irpf });
  };

  return (
    <div className="h-full w-full">
      <div className="text-2xl">Statement: {statementId}</div>
      <button
        className="block rounded-md bg-slate-800 text-slate-50 px-2 py-1"
        onClick={handleBackToIrpf}
      >
        Voltar
      </button>
    </div>
  );
};
