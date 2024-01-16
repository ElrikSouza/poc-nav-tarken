import { useEffect, useState } from "react";

export type Contact = {
  id: string;
  name: string;
  personProfileId: string;
};

export type Customer = {
  id: string;
  name: string;
  contact: Contact[];
};

export const customers = <Customer[]>[
  {
    id: "1",
    name: "PolyContact",
    contact: [
      { name: "First contact", id: "1312", personProfileId: "f1" },
      { name: "Second contact", id: "4444", personProfileId: "f2" },
    ],
  },
  {
    id: "2",
    name: "MonoContact",
    contact: [{ name: "Only contact", id: "2222", personProfileId: "f3" }],
  },
];

export const useCustomer = (customerId: string) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setCustomer(customers.find((c) => c.id === customerId) ?? null);
        resolve();
        setIsLoading(false);
      }, 300);
    });
  }, [customerId]);

  return {
    customer,
    isLoading,
  };
};
