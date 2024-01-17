import { InspectorViewMode } from "./inspector.types";

export const getViewMode = ({
  isMonoContact,
  contactId,
}: {
  isMonoContact: boolean;
  contactId: string | undefined;
}): InspectorViewMode => {
  if (contactId) return InspectorViewMode.Contact;
  return isMonoContact
    ? InspectorViewMode.CustomerMonoContact
    : InspectorViewMode.CustomerMultiContact;
};
