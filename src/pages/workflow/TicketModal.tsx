import { RoutingMountPoint } from "../../routing/prefix-ctx/RoutingMountPoint";
import { useParams } from "react-router-dom";
import { useTicket } from "../../hooks/useTicket";
import { useCustomer } from "../../hooks/useCustomer";
import { getViewMode } from "../inspector/utils";
import { useEffect, useMemo } from "react";
import { ChangeEnvParams, RoutingEnvs } from "../../routing/routing.envs";
import { useMenu } from "../../hooks/useMenu";
import { useAppNavigation } from "../../routing/useAppNavigation";
import { InspectorRoutes } from "../inspector/InspectorRoutes";
import { CustomerInfoLoading } from "../inspector/CustomerInfoLoading";
import { CustomerInfo } from "../inspector/CustomerInfo";
import { InspectorNav } from "../inspector/InspectorNav";
import { CustomerContactSwitch } from "../inspector/CustomerContactSwitch";

export function TicketModal() {
  const {
    workflowId = "",
    ticketId = "",
    contactId,
    personProfileId,
  } = useParams();
  const { ticket } = useTicket({ ticketId });
  const { customer, isLoading: isLoadingCustomer } = useCustomer(
    ticket?.relatedCustomerId ?? null,
  );
  const isMonoContact = customer?.contact.length === 1;
  const viewMode = getViewMode({ isMonoContact, contactId });
  const { menu } = useMenu({ viewMode });

  const env = useMemo((): ChangeEnvParams => {
    if (contactId) {
      return {
        env: RoutingEnvs.TicketContact,
        params: {
          personProfileId: personProfileId ?? "",
          contactId: contactId ?? "",
          ticketId,
          workflowId,
        },
      };
    }

    return { env: RoutingEnvs.Ticket, params: { workflowId, ticketId } };
  }, [ticketId, workflowId, personProfileId, contactId]);

  const { handleCrossEnvNav, handleSameEnvNav } = useAppNavigation(env);

  const onToggleMode = () => {
    const willBeCustomer = !!contactId;
    if (willBeCustomer) {
      handleCrossEnvNav(
        {
          envParams: {
            env: RoutingEnvs.Ticket,
            params: { ticketId, workflowId },
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
            env: RoutingEnvs.TicketContact,
            params: {
              ticketId,
              workflowId,
              personProfileId: firstContact.personProfileId,
              contactId: firstContact.id,
            },
          },
        },
        true,
      );
    }
  };

  const isInCustomerMode = !contactId;

  const onSelectContact = (id: string) => {
    const contact = customer?.contact.find((c) => c.id === id);
    if (contact) {
      handleCrossEnvNav(
        {
          envParams: {
            env: RoutingEnvs.TicketContact,
            params: {
              ticketId,
              workflowId,
              contactId: id,
              personProfileId: contact.personProfileId,
            },
          },
        },
        true,
      );
    }
  };

  useEffect(() => {
    if (isMonoContact) {
      const contactId = customer.contact[0].id;
      const personProfileId = customer.contact[0].personProfileId;
      handleCrossEnvNav(
        {
          envParams: {
            env: RoutingEnvs.TicketContact,
            params: {
              workflowId,
              ticketId,
              contactId,
              personProfileId,
            },
          },
        },
        true,
      );
    }
    // eslint-disable-next-line
  }, [isMonoContact, customer, ticketId, workflowId]);

  const handleClose = () =>
    handleCrossEnvNav({
      envParams: { env: RoutingEnvs.Workflow, params: { workflowId } },
    });

  const handleClickInspProfile = () =>
    handleCrossEnvNav({
      envParams: {
        env: RoutingEnvs.InspCustomer,
        params: { customerId: ticket?.id ?? "" },
      },
    });

  return (
    <RoutingMountPoint env={env}>
      <div className="h-screen w-screen top-0 left-0 fixed z-50 flex flex-col rounded-xl shadow-md bg-slate-50">
        <div className="flex justify-between border-b-slate-500 border-b p-2">
          <div className="text-lg p-2 w-full">
            Ticket - {workflowId} - {ticketId}
          </div>
          <button className="hover:text-blue-400" onClick={handleClose}>
            X
          </button>
        </div>

        <div className="flex w-full h-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 w-72">
              {isLoadingCustomer ? (
                <CustomerInfoLoading />
              ) : (
                <CustomerInfo name={customer?.name ?? "-"} />
              )}

              <button
                className="text-blue-600 hover:text-blue-50 hover:bg-blue-600 rounded-md w-full p-1 text-sm font-semibold text-left"
                onClick={handleClickInspProfile}
              >
                Acessar perfil no inspector
              </button>

              {!isMonoContact && !isLoadingCustomer && (
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
            </div>

            <InspectorNav
              handleSameEnvNav={handleSameEnvNav}
              menuEntries={menu}
            />
          </div>

          {!!ticket?.relatedCustomerId && (
            <InspectorRoutes
              viewMode={viewMode}
              contactId={contactId}
              customerId={ticket?.relatedCustomerId}
              personProfileId={personProfileId}
              isLoadingCustomerInfo={isLoadingCustomer}
            />
          )}
        </div>
      </div>
    </RoutingMountPoint>
  );
}
