import React, { useState } from 'react';
import { REVIEWS } from '../data/servicesData';
import { Star, ShieldCheck, Check, ThumbsUp, Wrench } from 'lucide-react';

export const ReviewsAndGuarantee: React.FC = () => {
  const [filterBrand, setFilterBrand] = useState<string>('all');

  const brands = ['all', 'BMW', 'Volkswagen', 'Toyota', 'Audi'];

  const filteredReviews = filterBrand === 'all'
    ? REVIEWS
    : REVIEWS.filter((r) => r.brand === filterBrand);

  return (
    <section id="reviews" className="py-20 bg-neutral-900/40 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3">
              <span>Реальный опыт клиентов</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Подтвержденные заказ-наряды</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Рейтинг 4.9 из 5.0</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Отзывы автовладельцев с номерами ремонтов
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
              Мы собираем обратную связь после каждого выполненного заказ-наряда. Все отзывы проверены сервисной службой контроля качества.
            </p>
          </div>

          {/* Brand filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {brands.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setFilterBrand(b)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                  filterBrand === b
                    ? 'bg-neutral-100 text-neutral-950 border-neutral-100 font-bold'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {b === 'all' ? 'Все марки' : b}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header of review */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {rev.author}
                    </h3>
                    <div className="text-xs text-orange-400 font-medium mt-0.5">
                      {rev.car} ({rev.year} г.в.)
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Service info strip */}
                <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-neutral-300">
                    <Wrench className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="font-medium">{rev.serviceDone}</span>
                  </div>
                  <div className="text-neutral-400 font-mono tabular-nums">
                    Сумма: <span className="text-white font-bold">{rev.cost.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  «{rev.comment}»
                </p>
              </div>

              {/* Review footer: order stamp */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  Заказ-наряд {rev.orderNumber} закрыт
                </span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Official 24-Month Guarantee Banner */}
        <div className="rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>Фирменная гарантия качества</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Гарантия 24 месяца или 40 000 км пробега
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
                Мы берем на себя полную ответственность за качество сборки, момент затяжки крепежа и ресурс установленных деталей. При любых нареканиях устраняем причину за наш счет без экспертиз и бюрократии.
              </p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>Гарантия фиксируется в официальном договоре</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>Сохранение заводской дилерской гарантии</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-2 w-full sm:w-auto">
                <div className="text-4xl font-black text-orange-500 font-mono">
                  100%
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Ответственность
                </div>
                <div className="text-[11px] text-neutral-400 max-w-[200px]">
                  Компенсируем стоимость такси, если задержим выдачу авто более чем на 30 минут.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
