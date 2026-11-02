import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, Send, Navigation, Truck, ShieldCheck } from 'lucide-react';

interface ContactsSectionProps {
  onOpenTow: () => void;
  onOpenBooking: () => void;
}

export const ContactsSection: React.FC<ContactsSectionProps> = ({ onOpenTow, onOpenBooking }) => {
  return (
    <section id="contacts" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Info: 6 Cols */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3">
                <span>Контакты и локация</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>Удобный заезд</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>Парковка для клиентов</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ждем вас в Apex Motors в Томске
              </h2>
              <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
                Собственная охраняемая территория, клиентский зал с панорамным остеклением в ремонтную зону, бесплатный зерновой кофе и Wi-Fi.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium">Адрес техцентра:</div>
                  <div className="text-base font-bold text-white mt-0.5">
                    г. Томск, Комсомольский проспект, 70
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    Удобный заезд с Комсомольского проспекта и ул. Сибирской, охраняемая парковка
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium">Режим работы ремзоны и приемки:</div>
                  <div className="text-base font-bold text-white mt-0.5">
                    Ежедневно с 08:00 до 21:00
                  </div>
                  <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Без выходных и перерывов
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium">Телефон прямой связи:</div>
                  <div className="text-lg font-black text-white mt-0.5 font-mono">
                    <a href="tel:+73822904412" className="hover:text-orange-400 transition-colors">
                      +7 (3822) 90-44-12
                    </a>
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    Многоканальный номер мастера-приемщика в Томске
                  </div>
                </div>
              </div>
            </div>

            {/* Messengers and Emergency Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shadow-md shadow-orange-600/30 cursor-pointer"
              >
                Записаться на удобное время
              </button>

              <button
                type="button"
                onClick={onOpenTow}
                className="px-4 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-red-500/40 text-red-400 hover:text-red-300 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Truck className="w-4 h-4 text-red-500" />
                <span>Эвакуатор 24/7 (Томск)</span>
              </button>
            </div>
          </div>

          {/* Map & Facility Overview Card: 6 Cols */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden shadow-2xl relative">
              {/* Styled interactive map graphic / floor plan simulation */}
              <div className="relative h-80 sm:h-96 bg-[#161b22] p-6 flex flex-col justify-between overflow-hidden">
                {/* Stylized schematic streets */}
                <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-50,120 Q200,100 450,180 T900,150" stroke="#f97316" strokeWidth="6" fill="none" />
                  <path d="M120,-50 L180,500" stroke="#64748b" strokeWidth="4" fill="none" />
                  <path d="M380,-50 L340,500" stroke="#475569" strokeWidth="3" fill="none" />
                  <path d="M-50,280 L900,280" stroke="#334155" strokeWidth="3" fill="none" />
                  <circle cx="280" cy="160" r="14" fill="#f97316" />
                  <circle cx="280" cy="160" r="28" fill="#f97316" opacity="0.2" />
                </svg>

                {/* Map badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="bg-neutral-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-700/80 text-xs font-mono text-white flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-orange-500" />
                    <span>Комсомольский пр-т · ул. Сибирская</span>
                  </div>

                  <div className="bg-neutral-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-700/80 text-xs text-neutral-300">
                    Шлагбаум №1
                  </div>
                </div>

                {/* Center pin overlay */}
                <div className="relative z-10 self-center my-auto p-4 rounded-xl bg-neutral-950/95 border border-orange-500/50 shadow-2xl text-center max-w-xs space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white mx-auto shadow-md">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-bold text-white">Техцентр Apex Motors</div>
                  <div className="text-xs text-neutral-400">Томск, въезд свободный, охране сказать «в автосервис»</div>
                </div>

                {/* Bottom nav buttons */}
                <div className="relative z-10 flex items-center justify-between text-xs text-neutral-300 bg-neutral-950/90 backdrop-blur-md p-3 rounded-xl border border-neutral-800">
                  <span>Координаты: 56.4846° N, 84.9876° E</span>
                  <a
                    href="https://yandex.ru/maps"
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-400 hover:text-orange-300 font-semibold"
                  >
                    Открыть в Яндекс Навигаторе →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
