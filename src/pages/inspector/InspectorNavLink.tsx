import { InspectorKeys } from "../../routing/envs/inspector.keys";
import { SameEnvNavFn } from "../../routing/useAppNavigation";
import { useIsRouteSuffixActive } from "../../routing/useIsRouteSuffixActive";

export const InspectorNavLink = ({
  routeKey,
  label,
  handleSameEnvNav,
}: {
  handleSameEnvNav: SameEnvNavFn;
  routeKey: InspectorKeys;
  label: string;
}) => {
  const isActive = useIsRouteSuffixActive({ routeKey });
  console.log(isActive);

  return (
    <button
      onClick={() => handleSameEnvNav({ key: routeKey })}
      className={`text-left px-2 py-1 hover:bg-neutral-200 bg-opacity-40 rounded-md ${
        isActive ? "bg-neutral-300" : ""
      }`}
    >
      {label}
    </button>
  );
};
