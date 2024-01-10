import { InspectorKeys } from "../../../../routing/envs/inspector.keys";
import { useIsRouteSuffixActive } from "../../../../routing/useIsRouteSuffixActive";

export function TicketInspRouteLink({
  label,
  routeKey,
  onNavigate,
}: {
  label: string;
  routeKey: InspectorKeys;
  onNavigate: (params: { key: InspectorKeys }) => void;
}) {
  const isActive = useIsRouteSuffixActive({ routeKey });

  const className = `p-2 text-blue-700 ${isActive ? "bg-purple-300" : ""}`;

  return (
    <div className={className} onClick={() => onNavigate({ key: routeKey })}>
      {label}
    </div>
  );
}
