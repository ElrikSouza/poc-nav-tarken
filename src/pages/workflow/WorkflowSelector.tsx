import { RoutingEnvs } from "../../routing/routing.envs";
import { useAppNavigation } from "../../routing/useAppNavigation";

export const WorkflowSelector = () => {
  const { handleCrossEnvNav } = useAppNavigation();

  const openWorkflow = (workflowId: string) => {
    handleCrossEnvNav({
      envParams: {
        env: RoutingEnvs.Workflow,
        params: { workflowId },
      },
    });
  };

  return (
    <div className="h-full w-full">
      <div className="flex gap-3">
        <div
          className="h-16 w-32 bg-green-300 p-2"
          onClick={() => openWorkflow("1")}
        >
          <div className="text-green-50">Workflow 1</div>
        </div>

        <div
          className="h-16 w-32 bg-green-300 p-2"
          onClick={() => openWorkflow("2")}
        >
          <div className="text-green-50">Workflow 2</div>
        </div>
      </div>
    </div>
  );
};
