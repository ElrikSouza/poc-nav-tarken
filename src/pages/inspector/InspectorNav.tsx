import { MenuEntry } from "../../hooks/useMenu";
import { SameEnvNavFn } from "../../routing/useAppNavigation";

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
        <button onClick={() => handleSameEnvNav({ key: entry.key })}>
          {entry.label}
        </button>
      ))}
    </div>
  );
};
