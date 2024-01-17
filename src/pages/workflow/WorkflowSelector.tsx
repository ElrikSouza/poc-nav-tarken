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
    <div className="h-full w-full p-2">
      <div className="flex gap-3">
        {["1", "2", "3"].map((num) => (
          <button
            className="h-16 w-32 bg-green-700 p-2 rounded-md"
            onClick={() => openWorkflow(num)}
            key={num}
          >
            <div className="text-green-50">Workflow {num}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
