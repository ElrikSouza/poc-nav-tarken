import { useParams } from "react-router-dom";
import { InspectorViewToggle } from "./InspectorViewToggle";
import { InspectorViewMode } from "./inspector-menu.types";
import { useAppNavigation } from "../../../../routing/useAppNavigation";
import { RoutingEnvs } from "../../../../routing/routing.envs";
import { TicketMenu } from "../../../workflow/components/TicketMenu/TicketMenu";
import { InspectorKeys } from "../../../../routing/envs/inspector.keys";

export const InspectorMenu = () => {
  const { customerId = "", contactId } = useParams();
  const { handleCrossEnvNav } = useAppNavigation();

  const handleChangeMode = () => {
    if (!contactId) {
      handleCrossEnvNav({
        envParams: {
          env: RoutingEnvs.InspContact,
          params: { contactId: "12132", customerId },
        },
        suffixParams: { key: InspectorKeys.PropertySeasonsImport },
      });
    } else {
      handleCrossEnvNav({
        envParams: {
          env: RoutingEnvs.InspCustomer,
          params: { customerId },
        },
        suffixParams: { key: InspectorKeys.PropertySeasonsImport },
      });
    }
  };

  const currentMode: InspectorViewMode = contactId ? "contact" : "customer";

  return (
    <aside className="flex flex-col flex-initial w-80 bg-white h-full gap-4">
      <div className="flex gap-2 justify-between items-center">
        <div className="rounded-lg shadow-md font-bold text-sm bg-blue-300 text-blue-900 place-items-center flex">
          FV
        </div>
        <h1 className="text-slate-900 text-sm">Fazenda Villa 2</h1>
      </div>

      <InspectorViewToggle
        currentMode={currentMode}
        onChangeMode={handleChangeMode}
      />

      <TicketMenu />
    </aside>
  );
};
