import { MenuEntry } from "../../hooks/useMenu";
import { SameEnvNavFn } from "../../routing/useAppNavigation";
import { InspectorNavLink } from "./InspectorNavLink";

export const InspectorNav = ({
  menuEntries,
  handleSameEnvNav,
}: {
  menuEntries: MenuEntry[] | null;
  handleSameEnvNav: SameEnvNavFn;
}) => {
  return (
    <div className="flex flex-col gap-1">
      {menuEntries?.map((entry) => (
        <InspectorNavLink
          label={entry.label}
          routeKey={entry.key}
          handleSameEnvNav={handleSameEnvNav}
        />
      ))}
    </div>
  );
};
