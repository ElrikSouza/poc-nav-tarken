import { Route, Routes, useParams } from "react-router-dom";
import { TicketModal } from "./TicketModal";
import { useAppNavigation } from "../../routing/useAppNavigation";
import { RoutingEnvs } from "../../routing/routing.envs";
import { useEffect, useState } from "react";
import { InspectorKeys } from "../../routing/envs/inspector.keys";

export const Workflow = () => {
  const { workflowId = "" } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [loading]);

  const { handleCrossEnvNav } = useAppNavigation();

  const handleOpenTicket = (ticketId: string) => {
    handleCrossEnvNav({
      envParams: { env: RoutingEnvs.Ticket, params: { ticketId, workflowId } },
      suffixParams: { key: InspectorKeys.PropertySeasons },
    });
  };

  return (
    <div className="w-full h-full">
      {loading && <h1 className="text-xl">LOADING...</h1>}

      <button onClick={() => handleOpenTicket("1")}>
        Open ticket id {workflowId}
      </button>

      <Routes>
        <Route path="ticket/:ticketId/*" element={<TicketModal />} />
      </Routes>
    </div>
  );
};
