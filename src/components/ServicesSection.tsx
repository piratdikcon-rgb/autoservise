import React, { useState } from 'react';
import { SERVICES, ServiceItem } from '../data/servicesData';
import { Clock, ShieldCheck, Check, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onViewDetail: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onViewDetail }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Все услуги' },
    { id: 'diagnostics', label: 'Диагностика' },
    { id: 'maintenance', label: 'Техническое обслуживание (ТО)' },
    { id: 'suspension', label: 'Ходовая и 3D сход-развал' },
    { id: 'brakes', label: 'Тормозная система' },
    { id: 'engine', label: 'ДВС и трансмиссия' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-20 bg-neutral-900/40 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3">
              <span>Каталог и прайс-лист</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Сертифицированные технологии</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Гарантия до 24 мес</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Стоимость услуг автосервиса
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
              Работаем по фиксированному прайсу и технологическим картам производителей. Все снятые старые запчасти возвращаем владельцу для полного контроля.
            </p>
          </div>

          <a
            href="#calculator"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors whitespace-nowrap"
          >
            <span>Перейти к общему калькулятору</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-100 text-neutral-950 font-bold shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 flex flex-col justify-between hover:border-neutral-700 transition-all group"
            >
              <div className="space-y-4">
                {/* Header of Card */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors leading-snug">
                    {service.title}
                  </h3>
                  {service.popular && (
                    <span className="text-[11px] font-semibold text-orange-400 flex items-center gap-1 shrink-0">
                      <Sparkles className="w-3 h-3" />
                      Популярно
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Included bullets */}
                <div className="pt-2 border-t border-neutral-800/80 space-y-2">
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                    Что входит в процедуру:
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {service.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-6 mt-6 border-t border-neutral-800 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[11px] text-neutral-500 block">Стоимость:</span>
                  <div className="text-lg font-extrabold text-white font-mono tabular-nums">
                    от {service.priceFrom.toLocaleString('ru-RU')} ₽
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      {service.durationMinutes} мин
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      {service.warrantyMonths} мес.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onViewDetail(service.id)}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    Подробнее
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 transition-colors shadow-sm shadow-orange-600/30 cursor-pointer active:scale-[0.98]"
                  >
                    Записаться
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
