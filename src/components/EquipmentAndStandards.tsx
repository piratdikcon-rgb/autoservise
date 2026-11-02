import React from 'react';
import { Camera, ShieldCheck, Cpu, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const EquipmentAndStandards: React.FC = () => {
  return (
    <section id="equipment" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3">
            <span>Стандарты и оснащение</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Дилерский уровень</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Прозрачность для клиента</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Оборудование эталонного класса и 4 правила честности
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Мы отказались от сомнительных универсальных приборов в пользу сертифицированных стендов Hunter и дилерских диагностических интерфейсов.
          </p>
        </div>

        {/* 2-Column Showcase with Generated Real Photos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          {/* Card 1: Diagnostic tech */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden flex flex-col justify-between group">
            <div className="relative h-64 overflow-hidden">
              <img
                src="/src/assets/images/service_engine_diagnostics_1793637166692.jpg"
                alt="Дилерская компьютерная диагностика двигателя"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              <div className="absolute top-4 left-4 bg-neutral-900/90 backdrop-blur-sm border border-neutral-700 px-3 py-1 rounded text-xs font-mono font-bold text-orange-400">
                Bosch & ODIS / ICOM
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="text-xl font-bold text-white">
                Электронная диагностика уровня официального дилера
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Глубокий анализ потоковых данных датчиков в движении, осциллографирование сигналов зажигания, эндоскопия цилиндров HD-камерой без снятия ГБЦ.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-neutral-300 font-mono">
                <span className="bg-neutral-800 px-2.5 py-1 rounded">Адаптация мехатроника</span>
                <span className="bg-neutral-800 px-2.5 py-1 rounded">Прошивка ЭБУ</span>
                <span className="bg-neutral-800 px-2.5 py-1 rounded">Калибровка ADAS камер</span>
              </div>
            </div>
          </div>

          {/* Card 2: 3D Alignment */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden flex flex-col justify-between group">
            <div className="relative h-64 overflow-hidden">
              <img
                src="/src/assets/images/service_wheel_alignment_1793637167809.jpg"
                alt="3D сход-развал Hunter HawkEye Elite"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              <div className="absolute top-4 left-4 bg-neutral-900/90 backdrop-blur-sm border border-neutral-700 px-3 py-1 rounded text-xs font-mono font-bold text-orange-400">
                Hunter HawkEye Elite 3D
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="text-xl font-bold text-white">
                Прецизионный 3D стенд сход-развала Hunter
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Высокоскоростные цифровые камеры высокого разрешения и быстрозажимные колесные мишени без контакта с диском исключают повреждение ЛКП дисков.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-neutral-300 font-mono">
                <span className="bg-neutral-800 px-2.5 py-1 rounded">Точность 0.01°</span>
                <span className="bg-neutral-800 px-2.5 py-1 rounded">База геометрии 2026 года</span>
                <span className="bg-neutral-800 px-2.5 py-1 rounded">Выравнивание руля в 0°</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Customer Trust */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Свободный доступ в ремзону</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Вы в любой момент можете присутствовать около своего автомобиля или наблюдать за работами из комфортной клиентской зоны с мониторами.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
              <Camera className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Видеоотчеты в Telegram</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Мастер присылает короткие видео всех обнаруженных скрытых дефектов с замером люфтов и износа до начала каких-либо дополнительных работ.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Фиксированная смета</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Никаких «неожиданных» доплат при получении автомобиля. Сумма в заказ-наряде не меняется без вашего предварительного письменного согласия.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Гарантия 2 года без споров</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              В случае наступления гарантийного случая устраняем дефект вне очереди за наш счет. Мы уверены в квалификации наших мастеров.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
