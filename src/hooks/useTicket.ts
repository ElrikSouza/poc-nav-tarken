import { useEffect, useState } from "react";
import { customers } from "./useCustomer";

export type Ticket = {
  id: string;
  name: string;
  relatedCustomerId: string;
};

export const tickets = <Ticket[]>[
  { id: "1", relatedCustomerId: customers[0].id, name: "Ticket 1" },
  { id: "2", relatedCustomerId: customers[1].id, name: "Ticket 2" },
];

export function useTicket({ ticketId }: { ticketId: string }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoadingTicket, setIsLoadingTicket] = useState(true);

  useEffect(() => {
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setTicket(tickets.find((t) => t.id === ticketId) ?? null);
        setIsLoadingTicket(false);
        resolve();
      }, 300);
    });
  }, [ticketId]);

  return {
    ticket,
    isLoadingTicket,
  };
}
