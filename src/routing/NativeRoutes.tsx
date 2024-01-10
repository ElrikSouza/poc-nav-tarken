import { Route, Routes } from "react-router-dom";
import { InspectorMountPoint } from "../pages/inspector/InspectorMountPoint";
import { Workflow } from "../pages/workflow/Workflow";
import { WorkflowSelector } from "../pages/workflow/WorkflowSelector";

/**
 * Those are the normal routes of the application. They are not meant to be mounted
 * anywhere else.
 */
export function NativeRoutes() {
  return (
    <Routes>
      <Route
        path="/insp/cliente/:customerId/integrante/:contactId/*"
        element={<InspectorMountPoint />}
      />

      <Route
        path="/insp/cliente/:customerId/*"
        element={<InspectorMountPoint />}
      />

      <Route path="/workflow/:workflowId/*" element={<Workflow />} />

      <Route path="/workflow" element={<WorkflowSelector />} />
    </Routes>
  );
}
