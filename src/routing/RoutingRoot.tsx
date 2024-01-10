import { BrowserRouter } from "react-router-dom";
import { NativeRoutes } from "./NativeRoutes";

export function RoutingRoot() {
  return (
    <BrowserRouter>
      <NativeRoutes />
    </BrowserRouter>
  );
}
