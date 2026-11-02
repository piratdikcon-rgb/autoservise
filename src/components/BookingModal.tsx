import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Car, Phone, User, CheckCircle2, ShieldCheck, Copy, Check } from 'lucide-react';
import { CAR_BRANDS, SERVICES } from '../data/servicesData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialNote?: string;
  initialEstimate?: {
    brand: string;
    vehicleClass: string;
    services: string[];
    partsType: string;
    totalPrice: number;
    totalDuration: number;
  } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialNote,
  initialEstimate,
}) => {
  const [carBrand, setCarBrand] = useState<string>(initialEstimate?.brand || 'BMW');
  const [carModel, setCarModel] = useState<string>('');
  const [carYear, setCarYear] = useState<string>('2021');
  const [selectedService, setSelectedService] = useState<string>(
    initialService || (initialEstimate ? initialEstimate.services.join(', ') : SERVICES[0].title)
  );
  const [selectedDate, setSelectedDate] = useState<string>('Завтра, 3 ноября');
  const [selectedTime, setSelectedTime] = useState<string>('11:00');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('+7 ');
  const [comment, setComment] = useState<string>(initialNote || '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
    if (initialNote) {
      setComment(initialNote);
    }
    if (initialEstimate) {
      setCarBrand(initialEstimate.brand);
      setSelectedService(initialEstimate.services.join(', '));
    }
  }, [initialService, initialNote, initialEstimate]);

  if (!isOpen) return null;

  const dateOptions = [
    'Сегодня (срочно)',
    'Завтра, 3 ноября',
    'Среда, 4 ноября',
    'Четверг, 5 ноября'
  ];

  const timeOptions = [
    '08:30', '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone || clientPhone.trim().length < 8) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setBookingCode(`APX-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 700);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-1.5">
                <span>Онлайн-запись</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>Без предоплаты</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Запись на сервис и диагностику
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Мастер-приемщик перезвонит в течение 5 минут для подтверждения времени и резерва подъемника.
              </p>
            </div>

            {/* If estimate was passed */}
            {initialEstimate && (
              <div className="p-3.5 rounded-xl bg-orange-950/20 border border-orange-500/30 text-xs text-neutral-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-orange-400">
                  <span>Предварительный расчет:</span>
                  <span className="font-mono text-sm">{initialEstimate.totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="text-neutral-300">
                  {initialEstimate.brand} · {initialEstimate.vehicleClass} · {initialEstimate.partsType}
                </div>
              </div>
            )}

            {/* Car Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Марка</label>
                <select
                  value={carBrand}
                  onChange={(e) => setCarBrand(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700/80 text-white text-xs focus:outline-none focus:border-orange-500"
                >
                  {CAR_BRANDS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Модель</label>
                <input
                  type="text"
                  placeholder="Например: X5, Camry, Tiguan"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700/80 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Год выпуска</label>
                <input
                  type="text"
                  placeholder="2020"
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700/80 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Service & Problem Description */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-300">Услуга или симптомы</label>
              <input
                type="text"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                placeholder="Что требуется сделать или какой симптом беспокоит"
                required
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700/80 text-white text-xs focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-orange-400" />
                <span>Желаемый день визита:</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {dateOptions.map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`p-2 rounded-lg border text-xs text-center transition-colors cursor-pointer ${
                      selectedDate === date
                        ? 'border-orange-500 bg-orange-600/20 text-white font-bold'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>Время заезда:</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {timeOptions.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-1.5 px-2 rounded-lg border text-xs text-center font-mono transition-colors cursor-pointer ${
                      selectedTime === time
                        ? 'border-orange-500 bg-orange-600/20 text-white font-bold'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Александр"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700/80 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Телефон для подтверждения</label>
                <input
                  type="tel"
                  placeholder="+7 (999) 000-00-00"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700/80 text-white text-xs font-mono placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold shadow-lg shadow-orange-600/30 transition-all hover:shadow-orange-600/50 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
            >
              {isSubmitting ? 'Бронирование подъемника...' : 'Подтвердить запись на сервис'}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Оплата только по факту выполненных работ после вашего тест-драйва</span>
            </div>
          </form>
        ) : (
          /* Confirmation Success State */
          <div className="py-6 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl font-extrabold text-white">
                Запись успешно подтверждена!
              </h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Подъемник забронирован на <span className="text-white font-medium">{selectedDate} в {selectedTime}</span>. На ваш телефон отправлено SMS с деталями.
              </p>
            </div>

            {/* Booking Code Card */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 max-w-sm mx-auto space-y-2">
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">
                Номер бронирования:
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-black text-orange-400 font-mono tracking-widest">
                  {bookingCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                  title="Скопировать"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/40 text-left text-xs text-neutral-300 space-y-1.5 border border-neutral-800/80">
              <div className="font-bold text-white mb-1">Что взять с собой:</div>
              <div>• Свидетельство о регистрации ТС (СТС)</div>
              <div>• Сервисную книжку (если требуется отметка)</div>
              <div>• Адрес техцентра: г. Томск, Комсомольский проспект, 70 (въезд через шлагбаум №1)</div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Закрыть окно
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
