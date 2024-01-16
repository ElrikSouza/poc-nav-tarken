export type InspectorPageProps = {
  customerId?: string;
  contactId?: string;
  personProfileId?: string;
};

export enum InspectorViewMode {
  CustomerMonoContact = "customer-mono",
  CustomerMultiContact = "customer-multi",
  Contact = "contact",
}
