export const enum RoutingEnvs {
  InspCustomer = "/insp/cliente/:customerId/",
  InspContact = "/insp/cliente/:customerId/integrante/:contactId",
  Ticket = "/workflow/:workflowId/ticket/:ticketId",
  TicketContact = "/workflow/:workflowId/ticket/:ticketId/contato/:contactId",
  Workflow = "/workflow/:workflowId",
  Global = "/",
}

export type ChangeEnvParams =
  | {
      env: RoutingEnvs.InspCustomer;
      params: { customerId: string };
    }
  | {
      env: RoutingEnvs.InspContact;
      params: { customerId: string; contactId: string };
    }
  | {
      env: RoutingEnvs.Ticket;
      params: { workflowId: string; ticketId: string };
    }
  | {
      env: RoutingEnvs.TicketContact;
      params: { workflowId: string; ticketId: string; contactId: string };
    }
  | {
      env: RoutingEnvs.Workflow;
      params: { workflowId: string };
    }
  | { env: RoutingEnvs.Global; params: undefined };
