import { useParams } from "react-router-dom";
import { useCustomer } from "../../hooks/useCustomer";
import { useEffect, useMemo } from "react";
import { ChangeEnvParams, RoutingEnvs } from "../../routing/routing.envs";
import { useAppNavigation } from "../../routing/useAppNavigation";
import { CustomerContactSwitch } from "./CustomerContactSwitch";
import { InspectorRoutes } from "./InspectorRoutes";
import { RoutingMountPoint } from "../../routing/prefix-ctx/RoutingMountPoint";
import { InspectorViewMode } from "./inspector.types";
import { useMenu } from "../../hooks/useMenu";
import { InspectorNav } from "./InspectorNav";

const getViewMode = ({
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

  // change env to contact env
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
      <div className="flex flex-col w-72 p-2">
        <button className="px-1 py-2 hover:bg-sky-800" onClick={goHome}>
          Voltar
        </button>
        {isMonoContact && !isLoading && <div>Customer: {customer.name}</div>}
        {!isMonoContact && !isLoading && (
          <div>
            <CustomerContactSwitch
              isCustomerMode={isInCustomerMode}
              onToggleMode={onToggleMode}
            />
            {!isInCustomerMode && (
              <>
                Contatos
                <select
                  value={contactId}
                  onChange={(e) => onSelectContact(e.target.value)}
                >
                  {customer?.contact.map((c) => (
                    <option value={c.id}>{c.name}</option>
                  ))}
                </select>
              </>
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
      <RoutingMountPoint env={env}>
        <div className="flex-1 h-full bg-sky-50">
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
