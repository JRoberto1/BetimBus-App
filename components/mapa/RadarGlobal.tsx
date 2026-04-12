'use client';

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocation } from '@/lib/useLocation';
import { MapPin, Navigation } from 'lucide-react';
import Link from 'next/link';

interface Stop {
  id: number;
  name: string;
  lat: number;
  lon: number;
  lines: string[];
}

// Cria um ícone visual clean para os Pontos
const stopIcon = L.divIcon({
  className: 'custom-stop-icon',
  html: `<div style="width: 12px; height: 12px; background-color: #007BFF; border: 2px solid #fff; border-radius: 50%; box-shadow: 0 0 8px rgba(0, 123, 255, 0.8);"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

// Ícone para sinalização Meu Local (GPS)
const gpsIcon = L.divIcon({
  className: 'custom-gps-icon',
  html: `<div style="width: 16px; height: 16px; background-color: #10B981; border: 3px solid #fff; border-radius: 50%; box-shadow: 0 0 12px rgba(16, 185, 129, 0.9);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

// Componente utilitário para mover o mapa programaticamente para a localização do usuário
function LocationTracker({ triggerRefocus }: { triggerRefocus: number }) {
   const map = useMap();
   const { lat, lon } = useLocation();

   useEffect(() => {
     if (triggerRefocus > 0 && lat && lon) {
        map.flyTo([lat, lon], 16, { animate: true, duration: 1.5 });
     }
   }, [triggerRefocus, lat, lon, map]);

   return null;
}

export default function RadarGlobal() {
  const [pontos, setPontos] = useState<Stop[]>([]);
  const { lat: userLat, lon: userLon, loading: locationLoading } = useLocation();
  const [refocusClock, setRefocusClock] = useState(0);

  // Inicial Centro padrao: Betim MG
  const center: [number, number] = [-19.9682, -44.1986];

  useEffect(() => {
    fetch('/data/pontos.json')
      .then(res => res.json())
      .then(data => setPontos(data))
      .catch(console.error);
  }, []);

  return (
    <div className="w-full h-full relative" style={{ isolation: 'isolate' }}>
      
      {/* Container Leaflet - Z-index rebaixado via globals se precisasse, mas relative basta */}
      <MapContainer 
         center={center} 
         zoom={13} 
         zoomControl={false}
         className="w-full h-full !bg-[#0f141e]"
         style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        {/* TileLayer - Carto DB Dark Matter */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Utilitário injetado lendo o context do mapa */}
        <LocationTracker triggerRefocus={refocusClock} />

        {/* Plotagem do GPS Real */}
        {userLat && userLon && (
           <Marker position={[userLat, userLon]} icon={gpsIcon}>
              <Popup className="custom-dark-popup">
                <div className="text-center">
                  <p className="font-bold text-white text-sm">Meu Local</p>
                  <p className="text-xs text-brand-muted">Via GPS do Dispositivo</p>
                </div>
              </Popup>
           </Marker>
        )}

        {/* Plotagem dos Pontos da Cidade */}
        {pontos.map(p => (
          <Marker 
             key={p.id} 
             position={[p.lat, p.lon]}
             icon={stopIcon}
          >
             <Popup className="custom-dark-popup" closeButton={false}>
                 <div className="flex flex-col gap-2 p-1 min-w-[140px]">
                   <div className="flex items-start gap-2">
                     <MapPin className="text-brand-secondary shrink-0 mt-0.5" size={16} />
                     <p className="text-sm font-bold text-white leading-tight">{p.name}</p>
                   </div>
                   <div className="mt-2 bg-[#1C2333] p-2 rounded-lg border border-[rgba(255,255,255,0.05)]">
                     <p className="text-[10px] text-brand-muted font-bold tracking-widest uppercase mb-1">Linhas que passam</p>
                     <p className="text-brand-primary font-black text-sm">{p.lines.join(' • ')}</p>
                   </div>
                   <Link 
                     href={`/pontos/${p.id}`}
                     className="mt-2 bg-brand-primary/10 text-brand-primary text-xs font-bold w-full text-center py-2 rounded-lg hover:bg-brand-primary/20 transition-colors"
                   >
                     Ver Perfil do Ponto
                   </Link>
                 </div>
             </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-6 right-5 z-[400] flex flex-col gap-3">
         <button 
           onClick={() => setRefocusClock(c => c + 1)}
           disabled={locationLoading}
           className="w-12 h-12 bg-brand-surface border border-[rgba(255,255,255,0.1)] shadow-xl rounded-full flex items-center justify-center text-white hover:bg-[#1C2333] transition-colors focus:outline-none"
         >
           <Navigation size={22} className={locationLoading ? 'animate-pulse text-brand-muted' : 'text-brand-secondary'} />
         </button>
      </div>

      {/* Sombreamento no topo para o título ficar visível */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#121826]/90 to-transparent z-[100] pointer-events-none"></div>

      <style>{`
        /* Overrides do Leaflet para casar com o Dark Mode Betim Neo */
        .leaflet-popup-content-wrapper {
          background: #121826;
          border: 1px solid rgba(0, 242, 255, 0.2);
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.8);
        }
        .leaflet-popup-tip {
          background: #121826;
          border-right: 1px solid rgba(0, 242, 255, 0.2);
          border-bottom: 1px solid rgba(0, 242, 255, 0.2);
        }
        .leaflet-popup-content {
          margin: 12px;
        }
      `}</style>
    </div>
  );
}
