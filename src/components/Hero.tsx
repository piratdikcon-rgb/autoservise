import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Clock, Wrench, ChevronRight } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenTracker: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenTracker }) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-neutral-800">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(249,115,22,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition and Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed metadata separator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest">
              <span>Специализированный техцентр</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Дилерские стандарты</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Томск, Комсомольский проспект</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
                Автосервис в Томске
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-neutral-200">
                Честный ремонт и ТО автомобилей с гарантией <span className="text-orange-500">2 года</span>
              </p>
            </div>

            <p className="text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Компьютерная диагностика дилерскими сканерами, 3D сход-развал Hunter HawkEye и замена агрегатов без скрытых платежей. Фиксируем стоимость до начала работ и пускаем в ремонтную зону.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-xl shadow-lg shadow-orange-600/30 transition-all hover:shadow-orange-600/50 cursor-pointer whitespace-nowrap shrink-0 active:scale-[0.98]"
              >
                <span>Рассчитать стоимость онлайн</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#diagnostics"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Определить поломку по звуку</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </a>
            </div>

            {/* Quick trust bullets (unboxed clean typography) */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-400 border-t border-neutral-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Фото- и видеоотчет каждого шага в Telegram</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Сохраняем дилерскую гарантию</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Собственный склад: 12 000+ запчастей</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Impact Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl shadow-black/80 group">
              <img
                src="/src/assets/images/hero_autoservice_bay_1793637166241.jpg"
                alt="Современная ремонтная зона автосервиса Apex Motors"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] lg:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              
              {/* Fallback container if image fails */}
              <div className="hidden peer-error:flex w-full h-[400px] lg:h-[480px] bg-neutral-900 items-center justify-center flex-col p-6 text-center">
                <Wrench className="w-12 h-12 text-orange-500 mb-2" />
                <span className="text-white font-bold">Ремонтная зона Apex Motors</span>
                <span className="text-xs text-neutral-400 mt-1">14 подъемников, 3D Hunter HawkEye</span>
              </div>

              {/* Scrim overlay for typography readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent pointer-events-none" />

              {/* Overlay card: Live workshop status */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700/60 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Ремзона работает сейчас</span>
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Свободно 3 подъемника из 14
                  </div>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Заехать без очереди
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-metric trust strip below hero split */}
        <div className="mt-14 pt-8 border-t border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="space-y-1">
            <div className="text-3xl font-black text-white font-mono tabular-nums tracking-tight">
              24 <span className="text-orange-500 font-sans text-xl font-bold">мес.</span>
            </div>
            <div className="text-xs text-neutral-400 leading-snug">
              Официальная гарантия на все выполненные работы и детали
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-black text-white font-mono tabular-nums tracking-tight">
              35 <span className="text-orange-500 font-sans text-xl font-bold">мин.</span>
            </div>
            <div className="text-xs text-neutral-400 leading-snug">
              Экспресс-замена масла и диагностика ходовой по 40 точкам
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-black text-white font-mono tabular-nums tracking-tight">
              12 000<span className="text-orange-500 font-sans text-xl font-bold">+</span>
            </div>
            <div className="text-xs text-neutral-400 leading-snug">
              Оригинальных и проверенных OEM запчастей в наличии
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-black text-white font-mono tabular-nums tracking-tight">
              4.9 <span className="text-orange-500 font-sans text-xl font-bold">★</span>
            </div>
            <div className="text-xs text-neutral-400 leading-snug">
              Рейтинг на Яндекс.Картах на основе 1 420+ отзывов клиентов
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
