import { InspectorKeys } from "../../../routing/envs/inspector.keys";
import { useAppNavigation } from "../../../routing/useAppNavigation";

export const NestedRoute = () => {
  const { handleSameEnvNav } = useAppNavigation();

  const handleGoBack = () => {
    handleSameEnvNav({ key: InspectorKeys.PropertySeasons });
  };

  return (
    <div className="h-full w-full">
      <h1 className="text-2xl">Subrota da pagina de property seasons</h1>
      <button className="bg-slate-800 text-slate-200" onClick={handleGoBack}>
        Voltar para propery seasons
      </button>
    </div>
  );
};
