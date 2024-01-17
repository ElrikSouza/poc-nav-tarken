import { Route, Routes } from "react-router-dom";
import { Workflow } from "../pages/workflow/Workflow";
import { WorkflowSelector } from "../pages/workflow/WorkflowSelector";
import { CustomerList } from "../pages/CustomerList";
import { InspectorMenu } from "../pages/inspector/InspectorMenu";
import { RootLayout } from "../pages/layout/RootLayout";

/**
 * Those are the normal routes of the application. They are not meant to be mounted
 * anywhere else.
 */
export function NativeRoutes() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route
          path="/insp/cliente/:customerId/integrante/:contactId/pid/:personProfileId/*"
          element={<InspectorMenu />}
        />

        <Route path="/insp/cliente/:customerId/*" element={<InspectorMenu />} />

        <Route path="/workflow/:workflowId/*" element={<Workflow />} />

        <Route path="/workflow" element={<WorkflowSelector />} />
      </Routes>
    </RootLayout>
  );
}
