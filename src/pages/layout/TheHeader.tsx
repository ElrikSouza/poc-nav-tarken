import { InspectorKeys } from "../../routing/envs/inspector.keys";
import { RoutingEnvs } from "../../routing/routing.envs";
import { useAppNavigation } from "../../routing/useAppNavigation";

export const TheHeader = () => {
  const { handleCrossEnvNav } = useAppNavigation(); // doesn't need a prefix because all routes are cross env

  const handleReturnHome = () =>
    handleCrossEnvNav({
      envParams: { env: RoutingEnvs.Global, params: undefined },
    });

  const handleWorkflow = () =>
    handleCrossEnvNav({
      envParams: { env: RoutingEnvs.Global },
      suffixParams: { key: InspectorKeys.WorkflowSelection },
    });

  return (
    <div className="w-full p-3 bg-indigo-800 flex justify-between">
      <h1
        role="button"
        tabIndex={0}
        className="text-xl font-normal text-indigo-50"
        onClick={handleReturnHome}
      >
        NavPoc
      </h1>

      <button className="text-indigo-50" onClick={handleWorkflow}>
        Workflow
      </button>
    </div>
  );
};
