import { useParams } from "react-router-dom";
import { useCustomer } from "../../hooks/useCustomer";
import { useEffect, useMemo } from "react";
import { ChangeEnvParams, RoutingEnvs } from "../../routing/routing.envs";
import { useAppNavigation } from "../../routing/useAppNavigation";
import { CustomerContactSwitch } from "./CustomerContactSwitch";
import { InspectorRoutes } from "./InspectorRoutes";
import { RoutingMountPoint } from "../../routing/prefix-ctx/RoutingMountPoint";
import { useMenu } from "../../hooks/useMenu";
import { InspectorNav } from "./InspectorNav";
import { CustomerInfoLoading } from "./CustomerInfoLoading";
import { CustomerInfo } from "./CustomerInfo";
import { getViewMode } from "./utils";

export const InspectorMenu = () => {
  const { customerId, contactId, personProfileId } = useParams();
  const { customer, isLoading } = useCustomer(customerId ?? "");
  const isMonoContact = customer?.contact.length === 1;
  const viewMode = getViewMode({ isMonoContact, contactId });
  const { menu, isLoading: isLoadingMenu } = useMenu({ viewMode });

  const env = useMemo((): ChangeEnvParams => {
    if (contactId) {
      return {
        env: RoutingEnvs.InspContact,
        params: {
          contactId: contactId ?? "",
          personProfileId: personProfileId ?? "",
          customerId: customerId ?? "",
        },
      };
    }
    return {
      env: RoutingEnvs.InspCustomer,
      params: {
        customerId: customerId ?? "",
      },
    };
  }, [contactId, personProfileId, customerId]);

  // env override because this component is outside the prefix ctx
  const { handleCrossEnvNav, handleSameEnvNav } = useAppNavigation(env);

  // if the app is in the inspector customer environment, but the customer has only one contact,
  // change environment to inspector contact
  useEffect(() => {
    if (isMonoContact) {
      const contactId = customer.contact[0].id;
      const personProfileId = customer.contact[0].personProfileId;
      handleCrossEnvNav(
        {
          envParams: {
            env: RoutingEnvs.InspContact,
            params: { customerId: customer.id, contactId, personProfileId },
          },
        },
        true,
      );
    }
    // eslint-disable-next-line
  }, [isMonoContact, customer]);

  const onSelectContact = (id: string) => {
    const contact = customer?.contact.find((c) => c.id === id);
    if (contact) {
      handleCrossEnvNav(
        {
          envParams: {
            env: RoutingEnvs.InspContact,
            params: {
              contactId: id,
              customerId: customerId ?? "",
              personProfileId: contact.personProfileId,
            },
          },
        },
        true,
      );
    }
  };

  const onToggleMode = () => {
    const willBeCustomer = !!contactId;
    if (willBeCustomer) {
      handleCrossEnvNav(
        {
          envParams: {
            env: RoutingEnvs.InspCustomer,
            params: { customerId: customerId ?? "" },
          },
        },
        true,
      );
    } else {
      const firstContact = customer?.contact[0];
      if (!firstContact) return;
      handleCrossEnvNav(
        {
          envParams: {
            env: RoutingEnvs.InspContact,
            params: {
              customerId: customerId ?? "",
              personProfileId: firstContact.personProfileId,
              contactId: firstContact.id,
            },
          },
        },
        true,
      );
    }
  };

  const goHome = () => {
    handleCrossEnvNav({
      envParams: { env: RoutingEnvs.Global, params: undefined },
    });
  };

  const isInCustomerMode = !contactId;

  return (
    <div className="w-full h-full flex">
      <RoutingMountPoint env={env}>
        <div className="flex flex-col w-72 p-2 gap-2 border-l border-l-slate-400 shadow-slate-600 shadow-sm">
          <button
            className="px-1 py-2 hover:bg-sky-800 hover:text-sky-50 text-left rounded-md text-sm font-semibold text-zinc-500"
            onClick={goHome}
          >
            {"<-"} Voltar
          </button>

          {isLoading ? (
            <CustomerInfoLoading />
          ) : (
            <CustomerInfo name={customer?.name ?? "-"} />
          )}

          {!isMonoContact && !isLoading && (
            <div className="flex flex-col gap-2">
              <CustomerContactSwitch
                isCustomerMode={isInCustomerMode}
                onToggleMode={onToggleMode}
              />

              {!isInCustomerMode && (
                <div className="flex flex-col gap-0.5">
                  <div className="font-medium text-slate-400 text-sm">
                    Selecionar integrante
                  </div>

                  <select
                    className="w-full p-2 rounded-md block bg-zinc-200"
                    value={contactId}
                    onChange={(e) => onSelectContact(e.target.value)}
                  >
                    {customer?.contact.map((c) => (
                      <option value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {!isLoadingMenu && (
            <InspectorNav
              handleSameEnvNav={handleSameEnvNav}
              menuEntries={menu}
            />
          )}
        </div>
        <div className="flex-1 h-full">
          <InspectorRoutes
            isLoadingCustomerInfo={isLoading}
            contactId={contactId}
            customerId={customerId}
            personProfileId={personProfileId}
            viewMode={viewMode}
          />
        </div>
      </RoutingMountPoint>
    </div>
  );
};
