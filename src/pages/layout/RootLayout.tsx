import { ReactNode } from "react";
import { TheHeader } from "./TheHeader";

export const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full overflow-hidden flex-col flex">
      <TheHeader />
      {children}
    </div>
  );
};
