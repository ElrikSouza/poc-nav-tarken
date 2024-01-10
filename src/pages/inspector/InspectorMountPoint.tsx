import { useParams } from "react-router-dom";
import { InspectorMenu } from "./components/InspectorMenu";
import { RoutingMountPoint } from "../../routing/prefix-ctx/RoutingMountPoint";
import { ChangeEnvParams, RoutingEnvs } from "../../routing/routing.envs";
import { useMemo, useState } from "react";
import { InspectorRoutes } from "./InspectorRoutes";
import { useAppNavigation } from "../../routing/useAppNavigation";
import { InspectorKeys } from "../../routing/envs/inspector.keys";

export const InspectorMountPoint = () => {
  const { customerId = "", contactId } = useParams();
  const { handleCrossEnvNav } = useAppNavigation();

  const openWorkflow = () =>
    handleCrossEnvNav({
      envParams: { env: RoutingEnvs.Global },
      suffixParams: { key: InspectorKeys.WorkflowSelection },
    });

  const env = useMemo((): ChangeEnvParams => {
    if (contactId) {
      return {
        env: RoutingEnvs.InspContact,
        params: { contactId, customerId },
      };
    }

    return { env: RoutingEnvs.InspCustomer, params: { customerId } };
  }, [customerId, contactId]);

  const [counter, setCounter] = useState(2);

  return (
    <RoutingMountPoint env={env}>
      <div className="h-full w-full flex flex-col">
        <div class="w-full p-3 bg-slate-800 flex justify-between">
          <h1 className="text-slate-100 text-lg">Teste</h1>
          <button onClick={openWorkflow}>Workflow</button>
        </div>
        <div class="flex h-full w-fullflex-1">
          a
          <button onClick={() => setCounter((prev) => prev + 1)}>
            {counter}
          </button>
          <InspectorMenu />
          <InspectorRoutes {...{ customerId, contactId }} />
        </div>
      </div>
    </RoutingMountPoint>
  );
};
