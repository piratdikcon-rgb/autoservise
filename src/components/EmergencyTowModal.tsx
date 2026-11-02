import React, { useState } from 'react';
import { X, Truck, Phone, Navigation, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface EmergencyTowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyTowModal: React.FC<EmergencyTowModalProps> = ({ isOpen, onClose }) => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('+7 ');
  const [problem, setProblem] = useState('Не заводится / Заблокирована АКПП');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-500 uppercase tracking-widest">
                <ShieldAlert className="w-4 h-4" />
                <span>Срочная помощь 24/7</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Вызов эвакуатора до автосервиса
              </h3>
              <p className="text-xs text-neutral-400">
                Бесплатная доставка авто в наш сервис при последующем ремонте от 25 000 ₽. Время подачи эвакуатора по Томску: 15-30 минут.
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Где находится автомобиль?</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Улица, дом или район (пр-т Ленина, Фрунзе, Иркутский тракт...)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2.5 pl-9 rounded-lg bg-neutral-900 border border-neutral-700/80 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                  <Navigation className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Телефон для связи с водителем эвакуатора</label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (999) 000-00-00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700/80 text-white text-xs font-mono placeholder-neutral-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Состояние колес и рулевого управления</label>
                <select
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700/80 text-white text-xs focus:outline-none focus:border-red-500"
                >
                  <option value="Не заводится / Заблокирована АКПП">Не заводится / Заблокирована АКПП</option>
                  <option value="Колеса крутятся, руль поворачивается">Колеса крутятся, руль поворачивается</option>
                  <option value="Заблокированы ведущие колеса (нужна лебедка/подкаты)">Заблокированы колеса (нужна лебедка)</option>
                  <option value="После ДТП (вырван рычаг / колесо)">После ДТП (вырван рычаг / колесо)</option>
                </select>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Дежурная диспетчерская:</span>
              <a href="tel:+78005558920" className="text-orange-400 font-mono font-bold hover:underline">
                8 (800) 555-89-20
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold shadow-lg shadow-red-600/30 transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Truck className="w-4 h-4" />
              <span>Вызвать эвакуатор сейчас</span>
            </button>
          </form>
        ) : (
          <div className="py-6 space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Эвакуатор направлен!</h3>
              <p className="text-xs text-neutral-300">
                Диспетчер передал заявку экипажу. Водитель свяжется с вами по номеру <span className="text-orange-400 font-mono">{phone}</span> в течение 2 минут.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-neutral-800 text-white text-xs font-bold hover:bg-neutral-700 transition-colors"
            >
              Понятно
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
