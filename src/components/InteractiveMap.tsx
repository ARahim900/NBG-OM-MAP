import { useEffect, useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Map as MapIcon, Satellite } from 'lucide-react';
import { Facility } from '../types';

interface InteractiveMapProps {
  facilities: Facility[];
  selectedWilayat: string | null;
  onSelectWilayat: (id: string | null) => void;
  selectedFacilityName?: string | null;
  onSelectFacility?: (name: string | null) => void;
  isEditMode?: boolean;
  onUpdateFacilityLocation?: (name: string, lat: number, lng: number) => void;
}

// Component to handle zooming and panning based on selection
function MapController({ selectedWilayat, selectedFacilityName, facilities }: { selectedWilayat: string | null, selectedFacilityName: string | null | undefined, facilities: Facility[] }) {
  const map = useMap();

  useEffect(() => {
    if (selectedFacilityName) {
      const facility = facilities.find(f => f.name === selectedFacilityName);
      if (facility) {
        map.flyTo([facility.lat, facility.lng], 15, { duration: 1.5 });
      }
    } else if (selectedWilayat) {
      // Find facilities in this wilayat
      const wilayatFacs = facilities.filter(f => f.wilayat === selectedWilayat);
      if (wilayatFacs.length > 0) {
        const bounds = L.latLngBounds(wilayatFacs.map(f => [f.lat, f.lng]));
        map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
      }
    } else {
      // Reset view to all points
      if (facilities.length > 0) {
         const bounds = L.latLngBounds(facilities.map(f => [f.lat, f.lng]));
         map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
      }
    }
  }, [selectedWilayat, selectedFacilityName, map, facilities]);

  return null;
}

export function InteractiveMap({ facilities, selectedWilayat, onSelectWilayat, selectedFacilityName, onSelectFacility, isEditMode, onUpdateFacilityLocation }: InteractiveMapProps) {
  const [mounted, setMounted] = useState(false);
  const [mapStyle, setMapStyle] = useState<'standard' | 'satellite'>('satellite');
  const [pendingMoves, setPendingMoves] = useState<Record<string, {lat: number, lng: number}>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isEditMode) {
      setPendingMoves({});
    }
  }, [isEditMode]);

  if (!mounted) return <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400">Loading Map...</div>;

  const createCustomIcon = (type: string, isSelected: boolean, isDimmed: boolean, isDraggable: boolean = false) => {
    let colorClass = "bg-slate-400 border-slate-500 text-white";
    if (type === 'Hospital') colorClass = "bg-emerald-500 border-emerald-700 text-white";
    else if (type === 'Extended Health Center') colorClass = "bg-sky-500 border-sky-700 text-white";
    else if (type === 'Health Center') colorClass = "bg-amber-500 border-amber-700 text-white";

    const opacityClass = isDimmed ? "opacity-40 grayscale saturate-50" : "opacity-100 shadow-md";
    const scaleClass = isSelected ? "scale-150 z-50 shadow-lg ring-2 ring-white ring-offset-2" : "scale-100";
    const animClass = isDraggable ? "animate-pulse ring-4 ring-amber-500" : "";

    const htmlString = `
      <div class="w-4 h-4 rounded-full border-2 ${colorClass} ${opacityClass} ${scaleClass} ${animClass} transform transition-all duration-300"></div>
    `;

    return L.divIcon({
      className: 'bg-transparent border-0',
      html: htmlString,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  return (
    <div className="absolute inset-0 z-0 bg-slate-50 dark:bg-slate-950 flex flex-col p-0 m-0 w-full h-full relative">
      {isEditMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-amber-100 text-amber-800 dark:bg-amber-900/90 dark:text-amber-200 px-4 py-2 rounded-full font-bold text-sm shadow-md border border-amber-200 dark:border-amber-700 pointer-events-none flex items-center gap-2">
           <MapIcon className="w-4 h-4" /> Edit Mode Active: Drag markers to relocate
        </div>
      )}
      <MapContainer 
        center={[24.1, 56.9]} 
        zoom={9} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', backgroundColor: 'transparent' }}
        zoomControl={true}
      >
        {mapStyle === 'standard' ? (
          <TileLayer
            key="standard"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
        ) : (
          <TileLayer
            key="satellite"
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}
        
        <MapController selectedWilayat={selectedWilayat} selectedFacilityName={selectedFacilityName} facilities={facilities} />

        {facilities.map((fac) => {
          const isSelectedFacility = selectedFacilityName === fac.name;
          const isSelectedWilayat = selectedWilayat === fac.wilayat;
          const isDimmed = (selectedFacilityName ? !isSelectedFacility : (selectedWilayat !== null && !isSelectedWilayat));

          const pendingMove = pendingMoves[fac.name];
          const lat = pendingMove ? pendingMove.lat : fac.lat;
          const lng = pendingMove ? pendingMove.lng : fac.lng;

          return (
            <Marker 
              key={fac.name} 
              position={[lat, lng]} 
              icon={createCustomIcon(fac.type, isSelectedFacility || (isSelectedWilayat && !selectedFacilityName), isDimmed, isEditMode)}
              draggable={isEditMode}
              eventHandlers={{
                click: () => {
                  if (!isEditMode) {
                    onSelectWilayat(fac.wilayat);
                    if (onSelectFacility) onSelectFacility(fac.name);
                  }
                },
                dragend: (e) => {
                  if (isEditMode) {
                    const marker = e.target;
                    const position = marker.getLatLng();
                    setPendingMoves(prev => ({ ...prev, [fac.name]: {lat: position.lat, lng: position.lng} }));
                    marker.openPopup();
                  }
                }
              }}
            >
              <Popup className="custom-popup">
                <div className="flex flex-col gap-1 w-48">
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-[13px] leading-tight">{fac.name}</span>
                  <span className="font-semibold text-slate-500 dark:text-slate-400 text-xs text-right opacity-90 mt-0.5" dir="rtl">{fac.nameAr}</span>
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {fac.type.replace('Extended ', 'Ext. ')}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-sm">
                      {fac.wilayat}
                    </span>
                  </div>
                  {isEditMode && pendingMove && (
                    <div className="mt-2 flex flex-col gap-2">
                       <button 
                         className="w-full text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white py-1.5 px-2 rounded-md transition-colors"
                         onClick={(e) => {
                           e.stopPropagation();
                           if (onUpdateFacilityLocation) onUpdateFacilityLocation(fac.name, pendingMove.lat, pendingMove.lng);
                           setPendingMoves(prev => {
                             const next = {...prev};
                             delete next[fac.name];
                             return next;
                           });
                         }}
                       >
                         Confirm New Location
                       </button>
                       <button
                         className="w-full text-[10px] font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                         onClick={(e) => {
                           e.stopPropagation();
                           setPendingMoves(prev => {
                             const next = {...prev};
                             delete next[fac.name];
                             return next;
                           });
                         }}
                       >
                         Discard change
                       </button>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Map Style Toggle */}
      <div className="absolute top-4 right-4 z-[400]">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-1 rounded-xl flex shadow-sm">
          <button 
            onClick={() => setMapStyle('standard')}
            className={`p-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-colors ${mapStyle === 'standard' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <MapIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Standard</span>
          </button>
          <button 
            onClick={() => setMapStyle('satellite')}
            className={`p-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-colors ${mapStyle === 'satellite' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <Satellite className="w-4 h-4" />
            <span className="hidden sm:inline">Satellite</span>
          </button>
        </div>
      </div>

      {/* Legend overlays */}
      <div className="absolute bottom-6 left-6 z-[400] flex flex-col gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 border border-emerald-700"></div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Hospital</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-sky-500 dark:bg-sky-400 border border-sky-700"></div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Ext. Health Center</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-amber-500 dark:bg-amber-400 border border-amber-700"></div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Health Center</span>
        </div>
      </div>
    </div>
  );
}

