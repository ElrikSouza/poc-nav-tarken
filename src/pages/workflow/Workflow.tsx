import { Route, Routes, useParams } from "react-router-dom";
import { TicketModal } from "./TicketModal";
import { useAppNavigation } from "../../routing/useAppNavigation";
import { RoutingEnvs } from "../../routing/routing.envs";
import { useEffect, useState } from "react";
import { InspectorKeys } from "../../routing/envs/inspector.keys";
import { Loading } from "../../components/Loading";
import { tickets } from "../../hooks/useTicket";

export const Workflow = () => {
  const { workflowId = "" } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
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
      {loading && (
        <div className="flex justify-center  items-center w-full h-full">
          <Loading color="black" />
        </div>
      )}

      <div className="w-full flex justify-start h-full p-3">
        <div className="bg-zinc-400 flex flex-col gap-2 h-full p-2 flex-initial w-32 rounded-md">
          {tickets.map((ticket) => (
            <button
              className="rounded-md bg-zinc-50 text-zinc-800"
              key={ticket.name + ticket.id}
              onClick={() => handleOpenTicket(ticket.id)}
            >
              {ticket.name}
            </button>
          ))}
        </div>
      </div>

      <Routes>
        <Route path="ticket/:ticketId/*" element={<TicketModal />} />
        <Route
          path="ticket/:ticketId/contato/:contactId/pid/:personProfileId/*"
          element={<TicketModal />}
        />
      </Routes>
    </div>
  );
};
