import { useEffect, useState } from "react";
import { InspectorKeys } from "../routing/envs/inspector.keys";
import { InspectorViewMode } from "../pages/inspector/inspector.types";

export type MenuEntry = {
  label: string;
  key: InspectorKeys;
};

const common = <MenuEntry[]>[
  {
    label: "Safras",
    key: InspectorKeys.PropertySeasons,
  },
];

const customerMenu = <MenuEntry[]>[
  {
    label: "Fluxo de caixa",
    key: InspectorKeys.Cashflow,
  },
  {
    label: "Endividamento Consolidado",
    key: InspectorKeys.Debt,
  },
];

const contact = <MenuEntry[]>[
  { label: "CPR", key: InspectorKeys.CPR },
  { label: "SCR", key: InspectorKeys.Debt },
];

export const useMenu = ({ viewMode }: { viewMode: InspectorViewMode }) => {
  const [menu, setMenu] = useState<MenuEntry[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    new Promise<void>((resolve) => {
      if (viewMode === InspectorViewMode.Contact) {
        setMenu([...common, ...contact]);
      } else if (viewMode === InspectorViewMode.CustomerMultiContact) {
        setMenu([...common, ...customerMenu]);
      } else {
        setMenu([...common, ...customerMenu, ...contact]);
      }
      resolve();
      setIsLoading(false);
    });
  }, [viewMode]);

  return { menu, isLoading };
};
