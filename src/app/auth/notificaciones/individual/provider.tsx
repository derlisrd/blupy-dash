import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { FichaResults, UserDevice } from "@/services/dto/notificaciones/ficha";
import { useMutation } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";

type modalsType = {
  wa: boolean;
  sms: boolean;
  push: boolean;
};

interface NotificationContextType {
  cliente: FichaResults | null;
  selectedDevice: UserDevice | null;
  setSelectedDevice: React.Dispatch<React.SetStateAction<UserDevice | null>>;
  modals: modalsType;
  //setModals: React.Dispatch<React.SetStateAction<modalsType>>;
  setCliente: React.Dispatch<React.SetStateAction<FichaResults | null>>;
  isPending: boolean;
  buscarFicha: (query: string) => Promise<void>;
  handleModal: (modalKey: keyof modalsType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationIndividualProvider = ({ children }: { children: React.ReactNode }) => {
  const { userData } = useAuth();
  const [cliente, setCliente] = useState<FichaResults | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<UserDevice | null>(null);
  const [modals, setModals] = useState<modalsType>({ wa: false, sms: false, push: false });

  const handleModal = (modalKey: keyof modalsType) => {
    setModals((prev) => ({ ...prev, [modalKey]: !prev[modalKey] }));
  };

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["buscarFicha"],
    mutationFn: async ({ query }: { query: string }) => {
      const response = await API.notificaciones.ficha(query, userData && userData.tokenWithBearer);

      if (response && response.success) {
        setCliente(response.results);
      }
    },
  });

  const buscarFicha = async (q: string) => mutateAsync({ query: q });

  const values = {
    cliente,
    selectedDevice,
    setSelectedDevice,
    modals,
    handleModal,
    setCliente,
    isPending,
    buscarFicha,
  };

  return <NotificationContext.Provider value={values}>{children}</NotificationContext.Provider>;
};

export const useNotificationHook = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotificationHook must be used within a NotificationIndividualProvider");
  }
  return context;
};
