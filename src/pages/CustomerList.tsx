import { Customer, customers } from "../hooks/useCustomer";
import { RoutingEnvs } from "../routing/routing.envs";
import { useAppNavigation } from "../routing/useAppNavigation";

export const CustomerList = () => {
  const { handleCrossEnvNav } = useAppNavigation();

  const handleOpenCustomer = (customer: Customer) => {
    if (customer.contact.length === 1) {
      handleCrossEnvNav({
        envParams: {
          env: RoutingEnvs.InspContact,
          params: {
            customerId: customer.id,
            personProfileId: customer.contact[0].personProfileId,
            contactId: customer.contact[0].id,
          },
        },
      });
    } else {
      handleCrossEnvNav({
        envParams: {
          env: RoutingEnvs.InspCustomer,
          params: {
            customerId: customer.id,
          },
        },
      });
    }
  };

  return (
    <div className="h-full w-full p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-light">Clientes</h1>

      <div className="flex flex-col gap-2" role="button" tabIndex={0}>
        {customers.map((customer) => (
          <div
            className="rounded-md shadow-slate-200 shadow-md p-2 w-full"
            key={customer.id}
            onClick={() => handleOpenCustomer(customer)}
          >
            {customer.name}
          </div>
        ))}
      </div>
    </div>
  );
};
