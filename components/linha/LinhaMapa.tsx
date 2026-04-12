'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import polyline from '@mapbox/polyline';
import L from 'leaflet';

// Fix p/ ícones sumindo no SSR
const stopIcon = L.divIcon({
  className: 'custom-stop-marker',
  html: `<div style="background-color: #1C2333; border: 2px solid #8A94A6; border-radius: 50%; width: 12px; height: 12px;"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

// Componente para centralizar o mapa no polyline
function MapFitter({ bounds }: { bounds: L.LatLngBounds | null }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) map.fitBounds(bounds, { padding: [30, 30] });
  }, [bounds, map]);
  return null;
}

export default function LinhaMapa({ stops, shape }: { stops: any[], shape: string }) {
  const [pathPositions, setPathPositions] = useState<[number, number][]>([]);
  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null);

  useEffect(() => {
    if (shape) {
       try {
         const decoded = polyline.decode(shape);
         setPathPositions(decoded);
         // @ts-ignore
         const b = L.latLngBounds(decoded);
         setBounds(b);
       } catch (e) {
         console.warn("Erro ao decodificar shape");
       }
    }
  }, [shape]);

  // Se demorar muito ou falhar, fallback de Betim Central
  const center: [number, number] = [-19.9678, -44.1983];

  return (
    <MapContainer 
      center={center} 
      zoom={13} 
      style={{ height: '100%', width: '100%', zIndex: 10 }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <MapFitter bounds={bounds} />

      {pathPositions.length > 0 && (
        <Polyline positions={pathPositions} color="#007BFF" weight={4} opacity={0.8} />
      )}

      {stops && stops.filter(s => s.lat != null && s.lon != null).map((s: any) => (
        <Marker key={s.stopId} position={[s.lat, s.lon]} icon={stopIcon}>
          <Popup className="bus-popup">
            <strong>{s.stopName}</strong><br/>
            Ref: {s.reference === 1 ? 'Sim' : 'Não'}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
