'use client';
import { useState, useEffect } from 'react';

export interface LocationState {
  lat: number | null;
  lon: number | null;
  loading: boolean;
  error: string | null;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationState>({
    lat: null,
    lon: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      setLocation(prev => ({ ...prev, loading: false, error: 'Geolocalização não suportada' }));
      return;
    }

    const timeoutId = setTimeout(() => {
      setLocation(prev => ({
        ...prev,
        loading: false,
        error: 'Tempo excedido. Localização indisponível.'
      }));
    }, 6000);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          loading: false,
          error: null,
        });
      },
      (error) => {
        clearTimeout(timeoutId);
        setLocation({
          lat: null,
          lon: null,
          loading: false,
          error: error.message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => clearTimeout(timeoutId);
  }, []);

  return location;
}
