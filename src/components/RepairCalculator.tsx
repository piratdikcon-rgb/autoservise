import React, { useState, useMemo } from 'react';
import { CAR_BRANDS, VEHICLE_CLASSES, SERVICES, ServiceItem } from '../data/servicesData';
import { Calculator, Check, ArrowRight, ShieldCheck, Clock, Sparkles } from 'lucide-react';

interface RepairCalculatorProps {
  onBookWithEstimate: (estimate: {
    brand: string;
    vehicleClass: string;
    services: string[];
    partsType: string;
    totalPrice: number;
    totalDuration: number;
  }) => void;
}

export const RepairCalculator: React.FC<RepairCalculatorProps> = ({ onBookWithEstimate }) => {
  const [selectedClassId, setSelectedClassId] = useState<string>('sedan');
  const [selectedBrand, setSelectedBrand] = useState<string>('BMW');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    'oil_maintenance',
    'comp_diag'
  ]);
  const [partsType, setPartsType] = useState<'oem' | 'aftermarket' | 'client_parts'>('aftermarket');

  const selectedClass = useMemo(
    () => VEHICLE_CLASSES.find((c) => c.id === selectedClassId) || VEHICLE_CLASSES[0],
    [selectedClassId]
  );

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedServices = useMemo(() => {
    return SERVICES.filter((s) => selectedServiceIds.includes(s.id));
  }, [selectedServiceIds]);

  const { totalPrice, totalMinutes } = useMemo(() => {
    let base = 0;
    let minutes = 0;

    selectedServices.forEach((s) => {
      base += s.priceFrom;
      minutes += s.durationMinutes;
    });

    // Multiplier for vehicle class
    let finalTotal = base * selectedClass.multiplier;

    // Multiplier for parts preference
    if (partsType === 'oem') {
      finalTotal *= 1.35;
    } else if (partsType === 'client_parts') {
      finalTotal *= 0.75; // only labor
    }

    return {
      totalPrice: Math.round(finalTotal / 100) * 100,
      totalMinutes: minutes
    };
  }, [selectedServices, selectedClass, partsType]);

  const handleBook = () => {
    onBookWithEstimate({
      brand: selectedBrand,
      vehicleClass: selectedClass.name,
      services: selectedServices.map((s) => s.title),
      partsType:
        partsType === 'oem'
          ? 'Оригинал (OEM)'
          : partsType === 'aftermarket'
          ? 'Премиум аналоги (Brembo/Mann/Bosch)'
          : 'Свои запчасти клиента',
      totalPrice,
      totalDuration: totalMinutes
    });
  };

  return (
    <section id="calculator" className="py-20 bg-neutral-900/60 border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3">
            <span>Онлайн калькулятор</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Фиксированный прайс</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Без скрытых наценок</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Рассчитайте стоимость ТО и ремонта за 1 минуту
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Выберите класс и марку автомобиля, укажите необходимые регламентные работы. Расчет формируется в реальном времени с учетом действующих акций.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls: 8 Cols */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Vehicle Class */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
                1. Тип и класс кузова
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {VEHICLE_CLASSES.map((vc) => {
                  const isActive = selectedClassId === vc.id;
                  return (
                    <button
                      key={vc.id}
                      type="button"
                      onClick={() => setSelectedClassId(vc.id)}
                      className={`p-3.5 text-left rounded-xl border transition-all cursor-pointer ${
                        isActive
                          ? 'border-orange-500 bg-orange-500/10 text-white shadow-sm'
                          : 'border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/60'
                      }`}
                    >
                      <div className="text-xs font-bold leading-tight">{vc.name}</div>
                      <div className="text-[11px] text-neutral-400 mt-1 font-mono">
                        Коэфф. {vc.multiplier}x
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Brand selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
                2. Марка автомобиля
              </label>
              <div className="flex flex-wrap gap-2">
                {CAR_BRANDS.map((brand) => {
                  const isActive = selectedBrand === brand;
                  return (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-neutral-100 text-neutral-950 border-neutral-100 font-bold'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      {brand}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Select Services */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
                  3. Выберите работы и операции
                </label>
                <span className="text-xs text-neutral-400">
                  Выбрано: {selectedServiceIds.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((srv) => {
                  const isChecked = selectedServiceIds.includes(srv.id);
                  return (
                    <div
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                        isChecked
                          ? 'border-orange-500/80 bg-orange-950/20 text-white'
                          : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/40'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-orange-500 text-white'
                            : 'border border-neutral-700 bg-neutral-800'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="text-sm font-semibold leading-snug line-clamp-2">
                          {srv.title}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono tabular-nums">
                          <span className="text-orange-400 font-bold">
                            от {srv.priceFrom.toLocaleString('ru-RU')} ₽
                          </span>
                          <span>·</span>
                          <span>{srv.durationMinutes} мин</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Spare Parts Preference */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
                4. Комплектующие и расходные материалы
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPartsType('aftermarket')}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    partsType === 'aftermarket'
                      ? 'border-orange-500 bg-orange-500/10 text-white'
                      : 'border-neutral-800 bg-neutral-900/70 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Проверенные аналоги</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Brembo, Bosch, Mann, Lemförder
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPartsType('oem')}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    partsType === 'oem'
                      ? 'border-orange-500 bg-orange-500/10 text-white'
                      : 'border-neutral-800 bg-neutral-900/70 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Оригинал (OEM)</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Заводские детали с маркировкой марки
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPartsType('client_parts')}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    partsType === 'client_parts'
                      ? 'border-orange-500 bg-orange-500/10 text-white'
                      : 'border-neutral-800 bg-neutral-900/70 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Свои запчасти</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Оплата только за работы мастеров
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Summary Card: 4 Cols */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Итоговая смета
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 font-mono">
                  {selectedBrand} · {selectedClass.name}
                </span>
              </div>

              {/* Price Display */}
              <div className="space-y-1">
                <span className="text-xs text-neutral-400">Ориентировочная сумма:</span>
                <div className="text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                  {totalPrice.toLocaleString('ru-RU')}{' '}
                  <span className="text-orange-500 font-sans text-2xl font-bold">₽</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Включает работы, расходные жидкости и утилизацию старых фильтров.
                </p>
              </div>

              {/* Metrics */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="flex items-center gap-2 text-neutral-400">
                    <Clock className="w-4 h-4 text-orange-400" />
                    Время в ремзоне:
                  </span>
                  <span className="font-mono font-bold text-white tabular-nums">
                    ≈ {Math.floor(totalMinutes / 60)} ч {totalMinutes % 60} мин
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-300">
                  <span className="flex items-center gap-2 text-neutral-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Срок гарантии:
                  </span>
                  <span className="font-bold text-white">24 месяца</span>
                </div>

                <div className="flex items-center justify-between text-neutral-300">
                  <span className="flex items-center gap-2 text-neutral-400">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Бонус при записи:
                  </span>
                  <span className="font-medium text-amber-300">Мойка кузова бесплатно</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleBook}
                disabled={selectedServiceIds.length === 0}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-orange-600 hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-orange-600/30 hover:shadow-orange-600/50 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Зафиксировать цену и записаться</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-neutral-500 text-center leading-normal">
                Фиксация цены гарантирует сохранение расчетной стоимости при заезде в сервис в течение 14 дней.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
