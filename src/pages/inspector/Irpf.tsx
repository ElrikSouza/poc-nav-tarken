import { InspectorKeys } from "../../routing/envs/inspector.keys";
import { useAppNavigation } from "../../routing/useAppNavigation";

export const Irpf = () => {
  const { handleSameEnvNav } = useAppNavigation();

  const handleOpenIrpfDetails = (irpfId: string) => {
    handleSameEnvNav({
      key: InspectorKeys.IrpfStatementDetail,
      params: { statementId: irpfId },
    });
  };

  return (
    <div className="h-full w-full">
      <div className="flex gap-3">
        {["2023", "2022", "2021"].map((year) => (
          <div
            className="bg-slate-300 border border-slate-900 rounded-md"
            key={year}
          >
            <div
              className="text-base text-slate-950"
              onClick={() => handleOpenIrpfDetails(year)}
            >
              {year}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
