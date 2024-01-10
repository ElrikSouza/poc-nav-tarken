import { InspectorPageProps } from "../../inspector.types";

export const PropertySeasonImportPage = ({
  customerId,
  contactId,
}: InspectorPageProps) => {
  return (
    <main className="w-full h-full">
      Import page customer id = {customerId} contact id = {contactId}
    </main>
  );
};
