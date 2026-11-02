import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Moon, Sun, ShieldCheck, Wrench, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceTitle?: string) => void;
  onOpenTracker: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenTracker,
  isDark,
  toggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 border-b ${
        isScrolled
          ? 'bg-neutral-950/90 dark:bg-neutral-950/95 backdrop-blur-md border-neutral-800'
          : 'bg-neutral-950/70 backdrop-blur-sm border-neutral-800/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand wordmark (single line, no subtitle clutters) */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-600/20 group-hover:bg-orange-500 transition-colors">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-white font-black tracking-wider">APEX</span>
              <span className="text-orange-500 font-semibold text-sm tracking-normal">MOTORS</span>
            </div>
          </a>

          {/* Zone 2: 4-5 Clean Nav links (whitespace-nowrap, single line) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <a
              href="#services"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Услуги и цены
            </a>
            <a
              href="#calculator"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Калькулятор ТО
            </a>
            <a
              href="#diagnostics"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Диагностика поломок
            </a>
            <a
              href="#equipment"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Оборудование
            </a>
            <a
              href="#reviews"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Отзывы
            </a>
            <button
              onClick={onOpenTracker}
              className="text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              Статус заказ-наряда
            </button>
          </nav>

          {/* Zone 3: 1 primary action + direct contact & theme toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+73822904412"
              className="hidden sm:flex flex-col text-right leading-tight pr-2 group"
            >
              <span className="text-xs text-neutral-400">Томск · 8:00 - 21:00</span>
              <span className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors font-mono tabular-nums">
                +7 (3822) 90-44-12
              </span>
            </a>

            <button
              onClick={toggleTheme}
              aria-label="Переключить тему"
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-sm shadow-orange-600/30 transition-all hover:shadow-orange-600/50 whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Записаться на сервис</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Меню"
              className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 px-4 py-5 space-y-3">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-neutral-200 hover:text-white"
          >
            Услуги и цены
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-neutral-200 hover:text-white"
          >
            Калькулятор ТО
          </a>
          <a
            href="#diagnostics"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-neutral-200 hover:text-white"
          >
            Диагностика поломок
          </a>
          <a
            href="#equipment"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-neutral-200 hover:text-white"
          >
            Оборудование & Гарантия
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-neutral-200 hover:text-white"
          >
            Отзывы
          </a>
          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracker();
              }}
              className="w-full py-2.5 px-3 text-sm text-left text-orange-400 hover:bg-neutral-800 rounded-lg flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Проверить статус ремонта по номеру авто
            </button>
            <a
              href="tel:+73822904412"
              className="flex items-center gap-2 py-2 text-sm text-neutral-300 font-mono"
            >
              <Phone className="w-4 h-4 text-orange-500" />
              +7 (3822) 90-44-12 (г. Томск)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
