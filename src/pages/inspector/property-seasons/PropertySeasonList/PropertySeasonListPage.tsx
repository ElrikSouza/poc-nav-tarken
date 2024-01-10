import { InspectorKeys } from "../../../../routing/envs/inspector.keys";
import { useAppNavigation } from "../../../../routing/useAppNavigation";
import { InspectorPageProps } from "../../inspector.types";

export const PropertySeasonListPage = ({
  customerId,
  contactId,
}: InspectorPageProps) => {
  const { handleSameEnvNav } = useAppNavigation();

  const handleOpen = () => {
    handleSameEnvNav({ key: InspectorKeys.PropertySeasonSubRoute });
  };

  return (
    <main className="w-full h-full">
      List page customerId = {customerId} contactId = {contactId}
      <button
        className="bg-black text-slate-300 rounded-md"
        onClick={handleOpen}
      >
        Ir para rota de teste
      </button>
    </main>
  );
};
