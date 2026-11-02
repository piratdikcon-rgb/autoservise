import React from 'react';
import { Wrench, Phone, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenTracker }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5 text-lg font-extrabold text-white">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="flex items-baseline gap-1">
                <span>APEX</span>
                <span className="text-orange-500 font-semibold text-xs">MOTORS</span>
              </div>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Специализированный автосервис и технический центр в Томске. Сертифицированный ремонт немецких, японских и корейских автомобилей с гарантией до 2 лет.
            </p>
            <div className="pt-2 text-[11px] text-neutral-500">
              ООО «Апекс Моторс Томск» · ОГРН 1207000349182 · ИНН 7017491029
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Разделы сайта
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Каталог услуг и цены
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Калькулятор ТО и ремонта
                </a>
              </li>
              <li>
                <a href="#diagnostics" className="hover:text-white transition-colors">
                  Диагностика неисправностей
                </a>
              </li>
              <li>
                <a href="#equipment" className="hover:text-white transition-colors">
                  Стенд Hunter 3D и диагностика
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Отзывы автовладельцев
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTracker}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  Проверить статус заказ-наряда
                </button>
              </li>
            </ul>
          </div>

          {/* Services list */}
          <div className="md:col-span-2 space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Услуги
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li>Регламентное ТО</li>
              <li>3D Сход-развал Hunter</li>
              <li>Замена тормозных колодок</li>
              <li>Ремонт АКПП и DSG</li>
              <li>Диагностика перед покупкой</li>
              <li>Заправка кондиционера</li>
            </ul>
          </div>

          {/* Quick Contacts */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Связь и запись
            </div>
            <div className="text-base font-bold text-white font-mono">
              <a href="tel:+73822904412" className="hover:text-orange-400 transition-colors">
                +7 (3822) 90-44-12
              </a>
            </div>
            <div className="text-xs text-neutral-400">
              г. Томск, Комсомольский проспект, 70
            </div>
            <div className="text-xs text-neutral-400">
              Ежедневно с 08:00 до 21:00
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full py-2.5 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Онлайн-запись 24/7
              </button>
            </div>
          </div>
        </div>

        {/* Quiet copyright bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Apex Motors. Все права защищены.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">Политика конфиденциальности</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Условия обслуживания</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Договор оферты</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
