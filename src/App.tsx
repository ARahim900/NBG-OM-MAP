import { useState, useMemo, useEffect } from 'react';
import { facilitiesList } from './data';
import { Facility, FacilityType } from './types';
import { KPICards } from './components/KPICards';
import { InteractiveMap } from './components/InteractiveMap';
import { SidePanel } from './components/SidePanel';
import { Search, Filter, Moon, Sun, Map as MapIcon, Menu, Download, Edit3 } from 'lucide-react';
import { cn } from './lib/utils';
import { motion } from 'motion/react';

export default function App() {
  const [selectedWilayat, setSelectedWilayat] = useState<string | null>(null);
  const [selectedFacilityName, setSelectedFacilityName] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FacilityType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Edit Mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [facilities, setFacilities] = useState<Facility[]>(facilitiesList);

  // Initialize dark mode based on system preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleUpdateFacilityLocation = (name: string, lat: number, lng: number) => {
    setFacilities(prev => prev.map(f => f.name === name ? { ...f, lat, lng } : f));
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(facilities, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "facilities_updated.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Derived state
  const filteredFacilities = useMemo(() => {
    return facilities.filter(fac => {
      const matchWilayat = selectedWilayat ? fac.wilayat === selectedWilayat : true;
      const matchType = filterType === 'All' ? true : fac.type === filterType;
      const matchSearch = fac.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchWilayat && matchType && matchSearch;
    });
  }, [facilities, selectedWilayat, filterType, searchQuery]);

  const kpis = useMemo(() => {
    // KPIs always reflect the current Wilayat selection (and ignore search/type filters to show true totals)
    const baseList = selectedWilayat 
      ? facilities.filter(f => f.wilayat === selectedWilayat) 
      : facilities;
      
    return {
      total: baseList.length,
      hospitals: baseList.filter(f => f.type === 'Hospital').length,
      extended: baseList.filter(f => f.type === 'Extended Health Center').length,
      healthCenters: baseList.filter(f => f.type === 'Health Center').length,
    };
  }, [facilities, selectedWilayat]);


  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 flex flex-col overflow-hidden">
      {/* Navbar */}
      <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20">
              <MapIcon className="w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold leading-none tracking-tight">North Al Batinah Health</h1>
              <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Directorate General of Health Services</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isEditMode && (
              <button
                onClick={handleExportData}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 dark:text-emerald-400 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 rounded-lg transition-colors"
                title="Export updated locations JSON"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            )}
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={cn(
                "p-2 rounded-full transition-colors",
                isEditMode 
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800"
              )}
              title={isEditMode ? "Exit Edit Mode" : "Edit Mode"}
            >
              <Edit3 className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400 text-xs font-bold">JD</div>
            </div>
            <button 
              className="lg:hidden p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden p-4 sm:p-6 gap-6 w-full max-w-[1600px] mx-auto flex-col lg:flex-row">
        
        {/* Left Column: Map & Filters & KPIs */}
        <div className="flex flex-col flex-1 gap-6 overflow-x-hidden overflow-y-auto lg:overflow-hidden custom-scrollbar pb-6 lg:pb-0">
          
          {/* KPI Section */}
          <section className="shrink-0 flex flex-col gap-2 relative">
            {selectedWilayat && (
              <div className="absolute right-0 -top-8 lg:top-0 lg:-translate-y-full pb-2">
                <button 
                  onClick={() => {
                    setSelectedWilayat(null);
                    setSelectedFacilityName(null);
                  }}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 uppercase tracking-wide"
                >
                  Clear Selection
                </button>
              </div>
            )}
            <KPICards {...kpis} />
          </section>

          {/* Map Container */}
          <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative min-h-[400px]">
            {/* Interactive Map */}
            <div className="flex-1 min-h-0 relative">
              <InteractiveMap 
                facilities={facilities}
                selectedWilayat={selectedWilayat} 
                onSelectWilayat={(w) => {
                  setSelectedWilayat(w);
                  setSelectedFacilityName(null);
                }} 
                selectedFacilityName={selectedFacilityName}
                onSelectFacility={setSelectedFacilityName}
                isEditMode={isEditMode}
                onUpdateFacilityLocation={handleUpdateFacilityLocation}
              />
            </div>

            {/* Filters Toolbar */}
            <div className="h-auto sm:h-14 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center px-4 py-2 sm:py-0 gap-4 bg-white dark:bg-slate-900 shrink-0">
              <div className="relative flex-1 w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search facilities..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 sm:py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500/20 focus:outline-none placeholder-slate-400 dark:text-white transition-all"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide ml-auto">
                {['All', 'Hospital', 'Extended Health Center', 'Health Center'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type as any)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border border-slate-200 dark:border-slate-700 focus:outline-none",
                      filterType === type 
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    )}
                  >
                    {type === 'All' ? 'All Types' : type.replace('Extended ', 'Ext. ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Data Panel */}
        <aside className={cn(
          "w-full lg:w-80 flex-col gap-6 shrink-0 h-[500px] lg:h-auto",
          isMobileMenuOpen ? "flex" : "hidden lg:flex"
        )}>
          <SidePanel 
            selectedWilayat={selectedWilayat} 
            facilities={filteredFacilities} 
            selectedFacilityName={selectedFacilityName}
            onSelectFacility={setSelectedFacilityName}
          />
        </aside>

      </main>
    </div>
  );
}
