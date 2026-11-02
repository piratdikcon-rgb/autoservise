import React from 'react';
import { TEAM_MEMBERS } from '../data/servicesData';
import { Award, Wrench, ShieldCheck } from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3">
            <span>Экспертная команда</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Стаж от 10 лет</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Дилерские сертификаты</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Мастера, которым доверяют сложные случаи
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            В нашем штате нет случайных стажеров. Каждый механик прошел сертификацию производителей и регулярно подтверждает квалификацию в учебных центрах Bosch и VAG.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden flex flex-col justify-between group hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="font-mono bg-neutral-950/80 backdrop-blur-sm px-2.5 py-1 rounded border border-neutral-700">
                      Опыт {member.experienceYears} лет
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-orange-400 font-medium">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {member.specialty}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-neutral-800/80 space-y-2">
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                  Сертификаты и допуски:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.certifications.map((cert, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-neutral-800/80 text-[11px] text-neutral-300 font-mono"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
