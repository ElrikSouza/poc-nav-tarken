import { useParams } from "react-router-dom";
import { TicketMenu } from "./components/TicketMenu/TicketMenu";
import { InspectorRoutes } from "../inspector/InspectorRoutes";
import { useMemo, useState } from "react";
import { ChangeEnvParams, RoutingEnvs } from "../../routing/routing.envs";
import { RoutingMountPoint } from "../../routing/prefix-ctx/RoutingMountPoint";
import { useAppNavigation } from "../../routing/useAppNavigation";
import { InspectorKeys } from "../../routing/envs/inspector.keys";

const getCustomerIdFromTicket = (ticketId: string) => {
  return `fake-customer-${ticketId}`;
};

type RouteSection = "proposal" | "inspector";

export function TicketModal() {
  const { workflowId = "", ticketId = "" } = useParams();
  const customerId = getCustomerIdFromTicket(ticketId ?? "");
  const [routeSection] = useState<RouteSection>("inspector");
  const { handleCrossEnvNav } = useAppNavigation();

  const env = useMemo(
    (): ChangeEnvParams => ({
      env: RoutingEnvs.Ticket,
      params: { ticketId, workflowId },
    }),
    [workflowId, ticketId],
  );

  const handleOpenInspectorProfile = () => {
    handleCrossEnvNav({
      envParams: { env: RoutingEnvs.InspCustomer, params: { customerId } },
      suffixParams: { key: InspectorKeys.PropertySeasons },
    });
  };

  const handleClose = () => {
    handleCrossEnvNav({
      envParams: { env: RoutingEnvs.Workflow, params: { workflowId } },
    });
  };

  return (
    <RoutingMountPoint env={env}>
      <div className="h-screen w-screen top-0 left-0 fixed z-50 flex flex-col rounded-xl shadow-md bg-slate-50">
        <div className="flex justify-between">
          <div className="text-lg p-2 w-full">
            Ticket - {workflowId} - {ticketId}
          </div>
          <button className="hover:text-blue-400" onClick={handleClose}>
            Close
          </button>
        </div>

        <div className="flex w-full h-full">
          <div className="flex flex-col">
            <div className="flex flex-col text-red-500">
              Customer {customerId}
              <button
                className="text-blue-600"
                onClick={handleOpenInspectorProfile}
              >
                Ir para perfil
              </button>
            </div>
            <TicketMenu />
          </div>

          {routeSection === "inspector" && (
            <InspectorRoutes customerId={customerId} />
          )}
        </div>
      </div>
    </RoutingMountPoint>
  );
}
