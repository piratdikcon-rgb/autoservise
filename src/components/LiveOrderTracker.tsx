import React, { useState } from 'react';
import { DEMO_ORDERS } from '../data/servicesData';
import { Search, CheckCircle, Clock, ShieldCheck, Car, Wrench, AlertCircle } from 'lucide-react';

interface LiveOrderTrackerProps {
  initialPlate?: string;
}

export const LiveOrderTracker: React.FC<LiveOrderTrackerProps> = ({ initialPlate = 'А777АА77' }) => {
  const [searchInput, setSearchInput] = useState(initialPlate);
  const [activeOrderKey, setActiveOrderKey] = useState<string>(initialPlate);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const cleanKey = (str: string) => str.replace(/\s+/g, '').toUpperCase();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = cleanKey(searchInput);
    if (DEMO_ORDERS[cleaned]) {
      setActiveOrderKey(cleaned);
      setErrorMsg(null);
    } else {
      setErrorMsg(`Заказ-наряд по номеру «${searchInput}» не найден в демо-базе. Попробуйте один из примеров ниже.`);
    }
  };

  const order = DEMO_ORDERS[activeOrderKey] || DEMO_ORDERS['А777АА77'];

  return (
    <section id="tracker" className="py-20 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3">
            <span>Онлайн-трекинг ремонта</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Статус в реальном времени</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Без звонков мастеру</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Отслеживайте статус готовности автомобиля
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Каждый этап работы фиксируется в нашей внутренней CRM-системе: от первичного заезда на подъемник до финальной протяжки колес динамометрическим ключом.
          </p>
        </div>

        {/* Search bar & demo badges */}
        <div className="max-w-xl mb-8 space-y-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Введите госномер, например: А 777 АА 77"
                className="w-full px-4 py-3 pl-11 rounded-xl bg-neutral-950 border border-neutral-700/80 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-orange-500 transition-colors uppercase font-mono"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              Проверить
            </button>
          </form>

          {/* Demo quick links */}
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>Быстрые примеры:</span>
            {Object.keys(DEMO_ORDERS).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSearchInput(key);
                  setActiveOrderKey(key);
                  setErrorMsg(null);
                }}
                className={`px-2.5 py-1 rounded border font-mono text-[11px] transition-colors cursor-pointer ${
                  activeOrderKey === key
                    ? 'border-orange-500 text-orange-400 bg-orange-500/10'
                    : 'border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                {DEMO_ORDERS[key].plate} ({DEMO_ORDERS[key].status === 'ready' ? 'Готов' : 'В работе'})
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Live Order Card */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 space-y-8 shadow-xl">
          {/* Header of Order */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-bold text-white">
                  {order.car}
                </span>
                <span className="px-3 py-1 rounded bg-neutral-800 text-white font-mono font-bold text-sm tracking-wider border border-neutral-700">
                  {order.plate}
                </span>
              </div>
              <div className="text-xs text-neutral-400">
                Ответственный мастер: <span className="text-neutral-200 font-medium">{order.master}</span>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <div className="text-xs text-neutral-400">Ожидаемое время выдачи:</div>
              <div className="text-sm font-bold text-orange-400 flex items-center sm:justify-end gap-1.5 font-mono">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>{order.eta}</span>
              </div>
              <div className="text-xs text-neutral-400 font-mono tabular-nums">
                Сумма по заказ-наряду: <span className="text-white font-bold">{order.totalCost.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>

          {/* Stepper */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
              Этапы выполнения ремонта:
            </span>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {order.steps.map((step, idx) => {
                const isStepCompleted = idx < order.currentStep;
                const isCurrent = idx === order.currentStep - 1 && order.status !== 'ready';

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border relative transition-all ${
                      isStepCompleted
                        ? 'border-emerald-500/40 bg-emerald-950/20 text-neutral-200'
                        : isCurrent
                        ? 'border-orange-500 bg-orange-950/20 text-white shadow-sm ring-1 ring-orange-500/30'
                        : 'border-neutral-800 bg-neutral-900/40 text-neutral-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-neutral-400">
                        Этап 0{idx + 1}
                      </span>
                      {isStepCompleted ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <Wrench className="w-4 h-4 text-orange-400 animate-spin" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-neutral-700" />
                      )}
                    </div>
                    <div className="text-xs font-semibold leading-snug">
                      {step.name}
                    </div>
                    <div className="text-[11px] font-mono text-neutral-400 mt-2">
                      {step.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Master's Recommendations */}
          {order.recommendations.length > 0 && (
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 space-y-1.5">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                Заключение мастера после контрольного осмотра:
              </span>
              {order.recommendations.map((rec, i) => (
                <p key={i} className="text-xs text-neutral-300 leading-relaxed">
                  {rec}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
