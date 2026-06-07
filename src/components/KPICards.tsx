import { Activity, Building2, Plus, Stethoscope } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface KPICardsProps {
  total: number;
  hospitals: number;
  extended: number;
  healthCenters: number;
}

export function KPICards({ total, hospitals, extended, healthCenters }: KPICardsProps) {
  const cards = [
    {
      title: 'Total Facilities',
      value: total,
      badge: <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold mb-1">Active</span>
    },
    {
      title: 'Hospitals',
      value: hospitals,
      badge: <div className="w-2 h-2 rounded-full bg-emerald-500 mb-2"></div>
    },
    {
      title: 'Extended Health',
      value: extended,
      badge: <div className="w-2 h-2 rounded-full bg-sky-500 mb-2"></div>
    },
    {
      title: 'Health Centers',
      value: healthCenters,
      badge: <div className="w-2 h-2 rounded-full bg-amber-500 mb-2"></div>
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          key={card.title}
          className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide truncate">
            {card.title}
          </p>
          <div className="flex items-end justify-between mt-1 h-8">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white leading-none">
              {card.value}
            </h3>
            {card.badge}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
