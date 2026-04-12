'use client';
import { useState, useEffect } from 'react';

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<string[]>([]);

  useEffect(() => {
    const stor = localStorage.getItem('btbus_favs');
    if (stor) {
      try { setFavoritos(JSON.parse(stor)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const updateFavs = () => {
      const stor = localStorage.getItem('btbus_favs');
      if (stor) {
        try { setFavoritos(JSON.parse(stor)); } catch (e) {}
      } else {
        setFavoritos([]);
      }
    };
    window.addEventListener('storage', updateFavs);
    window.addEventListener('favoritosUpdated', updateFavs);
    
    return () => {
      window.removeEventListener('storage', updateFavs);
      window.removeEventListener('favoritosUpdated', updateFavs);
    };
  }, []);

  const toggleFavorito = (id: string) => {
    let novos;
    if (favoritos.includes(id)) {
      novos = favoritos.filter(f => f !== id);
    } else {
      novos = [id, ...favoritos]; // Adiciona no início
    }
    setFavoritos(novos);
    localStorage.setItem('btbus_favs', JSON.stringify(novos));
    window.dispatchEvent(new Event('favoritosUpdated'));
  };

  const isFavorito = (id: string) => favoritos.includes(id);

  return { favoritos, toggleFavorito, isFavorito };
}
