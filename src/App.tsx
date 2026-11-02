import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RepairCalculator } from './components/RepairCalculator';
import { SymptomChecker } from './components/SymptomChecker';
import { ServicesSection } from './components/ServicesSection';
import { EquipmentAndStandards } from './components/EquipmentAndStandards';
import { LiveOrderTracker } from './components/LiveOrderTracker';
import { TeamSection } from './components/TeamSection';
import { ReviewsAndGuarantee } from './components/ReviewsAndGuarantee';
import { ContactsSection } from './components/ContactsSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { EmergencyTowModal } from './components/EmergencyTowModal';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { ServiceItem } from './data/servicesData';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'service-detail'>('home');
  const [selectedDetailServiceId, setSelectedDetailServiceId] = useState<string>('wheel_align');

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string | undefined>(undefined);
  const [bookingNote, setBookingNote] = useState<string | undefined>(undefined);
  const [bookingEstimate, setBookingEstimate] = useState<{
    brand: string;
    vehicleClass: string;
    services: string[];
    partsType: string;
    totalPrice: number;
    totalDuration: number;
  } | null>(null);

  const [isTowOpen, setIsTowOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleOpenBooking = (serviceTitle?: string, note?: string) => {
    setBookingService(serviceTitle);
    setBookingNote(note);
    setBookingEstimate(null);
    setIsBookingOpen(true);
  };

  const handleBookWithEstimate = (estimate: {
    brand: string;
    vehicleClass: string;
    services: string[];
    partsType: string;
    totalPrice: number;
    totalDuration: number;
  }) => {
    setBookingEstimate(estimate);
    setBookingService(estimate.services.join(', '));
    setBookingNote(`Расчет из онлайн-калькулятора. Бренд: ${estimate.brand}, Тип: ${estimate.vehicleClass}, Запчасти: ${estimate.partsType}`);
    setIsBookingOpen(true);
  };

  const handleSelectServiceFromCatalog = (service: ServiceItem) => {
    setBookingService(service.title);
    setBookingNote(`Выбрана услуга из каталога: ${service.title} (от ${service.priceFrom} ₽)`);
    setBookingEstimate(null);
    setIsBookingOpen(true);
  };

  const handleViewServiceDetail = (serviceId: string) => {
    setSelectedDetailServiceId(serviceId);
    setCurrentView('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToTracker = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('tracker');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById('tracker');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 transition-colors duration-200">
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenTracker={handleScrollToTracker}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      <main>
        {currentView === 'home' ? (
          <>
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onOpenTracker={handleScrollToTracker}
            />

            <RepairCalculator onBookWithEstimate={handleBookWithEstimate} />

            <SymptomChecker onBookService={handleOpenBooking} />

            <ServicesSection
              onSelectService={handleSelectServiceFromCatalog}
              onViewDetail={handleViewServiceDetail}
            />

            <EquipmentAndStandards />

            <LiveOrderTracker />

            <TeamSection />

            <ReviewsAndGuarantee />

            <ContactsSection
              onOpenTow={() => setIsTowOpen(true)}
              onOpenBooking={() => handleOpenBooking()}
            />
          </>
        ) : (
          <ServiceDetailPage
            serviceId={selectedDetailServiceId}
            onBack={handleBackToHome}
            onOpenBooking={handleOpenBooking}
            onSwitchService={(id) => setSelectedDetailServiceId(id)}
          />
        )}
      </main>

      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenTracker={handleScrollToTracker}
      />

      {/* Appointment booking modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={bookingService}
        initialNote={bookingNote}
        initialEstimate={bookingEstimate}
      />

      {/* 24/7 Tow truck modal */}
      <EmergencyTowModal
        isOpen={isTowOpen}
        onClose={() => setIsTowOpen(false)}
      />
    </div>
  );
}
