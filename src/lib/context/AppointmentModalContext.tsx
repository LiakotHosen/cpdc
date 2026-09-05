'use client';

import React, { createContext, useContext, useState } from 'react';

interface AppointmentModalContextType {
  isOpen: boolean;
  selectedServiceId: string | null;
  selectedServiceName: string | null;
  estimatedPriceRange?: string | null;
  openBooking: (serviceId?: string, serviceName?: string, priceRange?: string) => void;
  closeBooking: () => void;
}

const AppointmentModalContext = createContext<AppointmentModalContextType>({
  isOpen: false,
  selectedServiceId: null,
  selectedServiceName: null,
  estimatedPriceRange: null,
  openBooking: () => {},
  closeBooking: () => {}
});

export function AppointmentModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedServiceName, setSelectedServiceName] = useState<string | null>(null);
  const [estimatedPriceRange, setEstimatedPriceRange] = useState<string | null>(null);

  const openBooking = (serviceId?: string, serviceName?: string, priceRange?: string) => {
    setSelectedServiceId(serviceId || null);
    setSelectedServiceName(serviceName || null);
    setEstimatedPriceRange(priceRange || null);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
    setSelectedServiceId(null);
    setSelectedServiceName(null);
    setEstimatedPriceRange(null);
  };

  return (
    <AppointmentModalContext.Provider
      value={{
        isOpen,
        selectedServiceId,
        selectedServiceName,
        estimatedPriceRange,
        openBooking,
        closeBooking
      }}
    >
      {children}
    </AppointmentModalContext.Provider>
  );
}

export function useAppointmentModal() {
  return useContext(AppointmentModalContext);
}
