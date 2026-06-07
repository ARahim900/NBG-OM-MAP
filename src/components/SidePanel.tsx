import { motion, AnimatePresence } from 'motion/react';
import { Building2, Plus, Stethoscope, MapPin, Info } from 'lucide-react';
import { Facility } from '../types';
import { colorPalette } from '../data';
import { cn } from '../lib/utils';

interface SidePanelProps {
  selectedWilayat: string | null;
  facilities: Facility[];
  selectedFacilityName?: string | null;
  onSelectFacility?: (name: string | null) => void;
}

export function SidePanel({ selectedWilayat, facilities, selectedFacilityName, onSelectFacility }: SidePanelProps) {
  const getIconLetter = (type: string) => {
    switch (type) {
      case 'Hospital': return 'H';
      case 'Extended Health Center': return 'E';
      case 'Health Center': return 'HC';
      default: return 'F';
    }
  };

  const getIconColors = (type: string) => {
    switch (type) {
      case 'Hospital': return 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400';
      case 'Extended Health Center': return 'bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400';
      case 'Health Center': return 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full overflow-hidden min-h-0">
      {/* Side Panel Header */}
      <div className="p-6 bg-emerald-600 dark:bg-emerald-900 shadow-sm z-10 shrink-0 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{selectedWilayat || 'North Al Batinah'}</h2>
          <span className="text-[10px] font-black uppercase bg-emerald-500/50 dark:bg-emerald-800/50 px-2 py-1 rounded border border-emerald-400 dark:border-emerald-700">
            {selectedWilayat ? 'Regional Hub' : 'Governorate'}
          </span>
        </div>
        <p className="text-emerald-100 dark:text-emerald-200/70 text-sm mt-1 opacity-90">
          {selectedWilayat ? 'Governorate Center' : 'Directorate Overview'}
        </p>
        <div className="flex gap-4 mt-4">
          <div>
            <div className="text-xl font-bold">{facilities.length < 10 ? `0${facilities.length}` : facilities.length}</div>
            <div className="text-[10px] uppercase opacity-70 font-bold tracking-wider">Facilities</div>
          </div>
          <div className="w-px h-8 bg-emerald-400 dark:bg-emerald-700 opacity-40"></div>
          <div>
            <div className="text-xl font-bold">12k+</div>
            <div className="text-[10px] uppercase opacity-70 font-bold tracking-wider">Capacity</div>
          </div>
        </div>
      </div>

      {/* Facility List */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-slate-50/50 dark:bg-slate-950/50 custom-scrollbar relative">
        <h4 className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-widest px-2 shrink-0">Available Facilities</h4>
        
        <AnimatePresence mode="popLayout">
          {facilities.length > 0 ? (
            facilities.map((fac, i) => {
              const isSelected = selectedFacilityName === fac.name;
              return (
              <motion.div
                key={`${fac.wilayat}-${fac.name}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                onClick={() => onSelectFacility && onSelectFacility(isSelected ? null : fac.name)}
                className={cn(
                  "bg-white dark:bg-slate-900 border p-3 rounded-xl shadow-sm shrink-0 cursor-pointer transition-all duration-300",
                  isSelected 
                    ? "border-emerald-500 dark:border-emerald-500 ring-1 ring-emerald-500 dark:ring-emerald-500 shadow-md"
                    : "border-slate-200 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("w-8 h-8 shrink-0 rounded-lg flex items-center justify-center font-bold text-xs transition-colors", 
                    isSelected ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-white" : getIconColors(fac.type)
                  )}>
                    {getIconLetter(fac.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight truncate" title={fac.name}>{fac.name}</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">Type: {fac.type.replace('Extended ', 'Ext. ')}</p>
                    <div className="flex items-center justify-between gap-2 mt-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">Open Now</span>
                      </div>
                      {!selectedWilayat && (
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 opacity-60">
                          <MapPin className="w-3 h-3" />
                          {fac.wilayat}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )})
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="h-full flex flex-col items-center justify-center text-center p-6"
            >
              <Info className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">No facilities found.</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Try adjusting your filters or search query.</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Placeholder for Scroll */}
        <div className="h-4 shrink-0"></div>
      </div>

      {/* Footer Stats in Sidebar */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <button className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          View Detailed Demographics
        </button>
      </div>
    </div>
  );
}
