import { InspectorKeys } from "../../../../routing/envs/inspector.keys";
import { useAppNavigation } from "../../../../routing/useAppNavigation";
import { TicketInspRouteLink } from "./TicketInspRouteLink";

export function TicketMenu() {
  const { handleSameEnvNav } = useAppNavigation();
  return (
    <aside className="bg-slate-200">
      Menu
      <nav className="flex flex-col gap-2">
        <TicketInspRouteLink
          label="Importar safras"
          routeKey={InspectorKeys.PropertySeasonsImport}
          onNavigate={handleSameEnvNav}
        />

        <TicketInspRouteLink
          label="Listar safras"
          routeKey={InspectorKeys.PropertySeasons}
          onNavigate={handleSameEnvNav}
        />

        <TicketInspRouteLink
          label="IRPF"
          routeKey={InspectorKeys.Irpf}
          onNavigate={handleSameEnvNav}
        />
      </nav>
    </aside>
  );
}
