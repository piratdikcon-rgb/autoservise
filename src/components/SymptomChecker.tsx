import React, { useState } from 'react';
import { SYMPTOMS, DiagnosticSymptom } from '../data/servicesData';
import { AlertTriangle, CheckCircle, Wrench, ArrowRight, ShieldAlert, Activity, ChevronRight } from 'lucide-react';

interface SymptomCheckerProps {
  onBookService: (serviceTitle: string, note?: string) => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onBookService }) => {
  const [activeSystem, setActiveSystem] = useState<string>('all');
  const [selectedSymptom, setSelectedSymptom] = useState<DiagnosticSymptom>(SYMPTOMS[0]);

  const systems = [
    { id: 'all', label: 'Все симптомы' },
    { id: 'engine', label: 'Двигатель' },
    { id: 'suspension', label: 'Подвеска и руль' },
    { id: 'brakes', label: 'Тормозная система' },
    { id: 'transmission', label: 'АКПП / Трансмиссия' },
    { id: 'climate', label: 'Климат и салон' }
  ];

  const filteredSymptoms = activeSystem === 'all'
    ? SYMPTOMS
    : SYMPTOMS.filter((s) => s.system === activeSystem);

  const getDangerBadge = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'high':
        return (
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>Критично: движение небезопасно</span>
          </div>
        );
      case 'medium':
        return (
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Требуется визит в сервис в течение 100-300 км</span>
          </div>
        );
      case 'low':
        return (
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Плановый осмотр при очередном ТО</span>
          </div>
        );
    }
  };

  return (
    <section id="diagnostics" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3">
            <span>Интерактивная диагностика</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>База симптомов и дефектов</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Оценка опасности</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Определите причину стука, вибрации или ошибки
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Выберите характер проявления неисправности. Мы подскажем вероятные причины, уровень опасности дальнейшей езды и ориентировочную стоимость устранения.
          </p>
        </div>

        {/* Filter controls (Single-line interactive buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {systems.map((sys) => {
            const isActive = activeSystem === sys.id;
            return (
              <button
                key={sys.id}
                type="button"
                onClick={() => setActiveSystem(sys.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-orange-600 text-white font-bold shadow-sm shadow-orange-600/30'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {sys.label}
              </button>
            );
          })}
        </div>

        {/* Interactive 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* List of Symptoms (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {filteredSymptoms.map((symptom) => {
              const isSelected = selectedSymptom.id === symptom.id;
              return (
                <div
                  key={symptom.id}
                  onClick={() => setSelectedSymptom(symptom)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'border-orange-500 bg-neutral-900 text-white shadow-md'
                      : 'border-neutral-800/80 bg-neutral-900/40 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5 font-medium">
                    <span>{symptom.systemName}</span>
                    <span className="font-mono text-[11px] text-orange-400">{symptom.estimatedCost}</span>
                  </div>
                  <div className="text-sm font-semibold leading-snug">
                    {symptom.symptomTitle}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep dive detail panel (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div className="space-y-3 pb-6 border-b border-neutral-800">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-mono">
                    {selectedSymptom.systemName}
                  </span>
                  {getDangerBadge(selectedSymptom.dangerLevel)}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {selectedSymptom.symptomTitle}
                </h3>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  {selectedSymptom.description}
                </p>
              </div>

              {/* Probable Causes */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                  Вероятные причины поломки:
                </span>
                <ul className="space-y-2.5">
                  {selectedSymptom.probableCauses.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-neutral-200">
                      <span className="w-5 h-5 rounded bg-neutral-800 text-orange-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Action */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Что сделает мастер на диагностике:
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {selectedSymptom.recommendedAction}
                </p>
              </div>

              {/* Booking Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-neutral-400 block">Ориентировочная стоимость:</span>
                  <span className="text-xl font-bold text-white font-mono tabular-nums">
                    {selectedSymptom.estimatedCost}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onBookService(
                      selectedSymptom.symptomTitle,
                      `Жалоба клиента: ${selectedSymptom.symptomTitle}`
                    )
                  }
                  className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 transition-colors shadow-sm shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Записаться на осмотр этой проблемы</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
