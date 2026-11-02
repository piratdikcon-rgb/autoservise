import React, { useState } from 'react';
import { SERVICE_DETAILS, ServiceDetailContent, SERVICES } from '../data/servicesData';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, Wrench, ChevronRight, HelpCircle, FileText, Check, Phone } from 'lucide-react';

interface ServiceDetailPageProps {
  serviceId: string;
  onBack: () => void;
  onOpenBooking: (serviceTitle: string, note?: string) => void;
  onSwitchService: (serviceId: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  onBack,
  onOpenBooking,
  onSwitchService,
}) => {
  // If serviceId doesn't have custom detail, fall back to wheel_align or first
  const detail: ServiceDetailContent =
    SERVICE_DETAILS[serviceId] || SERVICE_DETAILS['wheel_align'];

  const serviceBase = SERVICES.find((s) => s.id === detail.serviceId) || SERVICES[0];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="pt-24 pb-20 bg-neutral-950 min-h-screen text-neutral-100">
      {/* Top Breadcrumb & Back Bar */}
      <div className="border-b border-neutral-800 bg-neutral-900/50 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Назад ко всем услугам</span>
            </button>

            <nav className="hidden sm:flex items-center gap-2 text-xs text-neutral-400">
              <span className="hover:text-white cursor-pointer" onClick={onBack}>Главная</span>
              <span>/</span>
              <span className="hover:text-white cursor-pointer" onClick={onBack}>Услуги</span>
              <span>/</span>
              <span className="text-orange-400 font-medium truncate max-w-xs">{serviceBase.title}</span>
            </nav>
          </div>

          {/* Quick switcher between 2 demo services */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-lg border border-neutral-800 text-xs">
            <span className="text-neutral-500 px-2 hidden md:inline">Примеры детальных страниц:</span>
            <button
              type="button"
              onClick={() => onSwitchService('wheel_align')}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                detail.serviceId === 'wheel_align'
                  ? 'bg-orange-600 text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              3D Сход-развал Hunter
            </button>
            <button
              type="button"
              onClick={() => onSwitchService('comp_diag')}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                detail.serviceId === 'comp_diag'
                  ? 'bg-orange-600 text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Компьютерная диагностика
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        {/* Hero of the Service */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest">
              <span>{detail.badge}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Томск, Комсомольский пр-т, 70</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Гарантия качества</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {detail.heroHeadline}
            </h1>

            <p className="text-base text-neutral-300 leading-relaxed">
              {detail.longDescription}
            </p>

            {/* Quick Metrics Bar */}
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-[11px] text-neutral-500 uppercase font-mono block">Стоимость</span>
                <span className="text-xl font-black text-white font-mono tabular-nums">
                  от {serviceBase.priceFrom.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <div>
                <span className="text-[11px] text-neutral-500 uppercase font-mono block">Длительность</span>
                <span className="text-base font-bold text-white flex items-center gap-1 mt-0.5">
                  <Clock className="w-4 h-4 text-orange-400" />
                  {serviceBase.durationMinutes} мин
                </span>
              </div>
              <div>
                <span className="text-[11px] text-neutral-500 uppercase font-mono block">Гарантия</span>
                <span className="text-base font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {serviceBase.warrantyMonths} мес.
                </span>
              </div>
              <div>
                <span className="text-[11px] text-neutral-500 uppercase font-mono block">Стенд</span>
                <span className="text-xs font-bold text-neutral-200 mt-1 block truncate">
                  {detail.equipmentName}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenBooking(detail.heroHeadline, `Запись на услугу: ${detail.heroHeadline}`)}
                className="px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold shadow-lg shadow-orange-600/30 transition-all hover:shadow-orange-600/50 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <Wrench className="w-4 h-4" />
                <span>Записаться на эту услугу</span>
              </button>

              <a
                href="tel:+73822904412"
                className="px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                <span>Консультация мастера: +7 (3822) 90-44-12</span>
              </a>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden shadow-2xl relative group">
              <img
                src={detail.imageUrl}
                alt={detail.heroHeadline}
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700/80">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>Оборудование в собственности сервиса</span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  Регулярная калибровка лазерных датчиков с метрологической поверкой
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Symptoms / Why Needed */}
        <div className="space-y-6 pt-6">
          <div>
            <div className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-1.5">
              Показания к процедуре
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Когда необходимо проводить данную работу
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {detail.whyNeeded.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-neutral-800 bg-neutral-900/50 space-y-2 hover:border-neutral-700 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-orange-600/10 text-orange-400 font-mono font-bold text-xs flex items-center justify-center">
                  0{idx + 1}
                </div>
                <h3 className="text-sm font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Technological Process */}
        <div className="space-y-6 pt-6">
          <div>
            <div className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-1.5">
              Технологическая карта
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Как проходит процедура в нашем техцентре
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Строгое соблюдение стандартов производителя без пропуска контрольных этапов.
            </p>
          </div>

          <div className="space-y-3">
            {detail.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-5 rounded-2xl border border-neutral-800 bg-neutral-900/60 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-neutral-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-600 text-white font-mono font-black text-sm flex items-center justify-center shrink-0">
                  {step.stepNumber}
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="text-sm font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment & Specs */}
        <div className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider font-mono">
              Используемое оборудование
            </span>
            <h3 className="text-2xl font-bold text-white">
              {detail.equipmentName}
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Мы инвестируем в эталонное дилерское оснащение, позволяющее с высокой точностью устранять проблемы, с которыми не справляются гаражные сервисы.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {detail.equipmentSpecs.map((spec, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-xs text-neutral-200">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Table */}
        <div className="space-y-6 pt-6">
          <div>
            <div className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-1.5">
              Тарифная сетка
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Стоимость по категориям автомобилей
            </h2>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 uppercase font-mono">
                  <tr>
                    <th className="py-3.5 px-6">Категория / Класс кузова</th>
                    <th className="py-3.5 px-6">Время на посту</th>
                    <th className="py-3.5 px-6 text-right">Стоимость работ</th>
                    <th className="py-3.5 px-6 text-right">Запись</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80 text-neutral-300">
                  {detail.priceTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-neutral-900/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-white">
                        {row.vehicleType}
                      </td>
                      <td className="py-4 px-6 font-mono text-neutral-400">
                        {row.time}
                      </td>
                      <td className="py-4 px-6 text-right font-mono font-bold text-white tabular-nums text-sm">
                        {row.price.toLocaleString('ru-RU')} ₽
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => onOpenBooking(detail.heroHeadline, `Категория: ${row.vehicleType}`)}
                          className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          Выбрать
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6 pt-6 max-w-4xl">
          <div>
            <div className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              <span>Частые вопросы автовладельцев</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ответы мастера-приемщика
            </h2>
          </div>

          <div className="space-y-3">
            {detail.faq.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900 transition-colors"
                >
                  <span className="text-sm font-bold text-white">{item.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-orange-400 transition-transform ${
                      openFaqIndex === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">
              Готовы записаться на {detail.heroHeadline.toLowerCase()}?
            </h3>
            <p className="text-xs text-neutral-400">
              Подберем удобное окно в графике сегодня или завтра. Приемка без задержек.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onBack}
              className="px-4 py-3 rounded-xl border border-neutral-700 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Ко всем услугам
            </button>
            <button
              onClick={() => onOpenBooking(detail.heroHeadline)}
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shadow-md shadow-orange-600/30 cursor-pointer"
            >
              Забронировать время
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
