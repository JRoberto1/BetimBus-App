'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bus, Map as MapIcon, Heart, MapPin } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Linhas', href: '/linhas', icon: Bus },
    { name: 'Pontos', href: '/pontos', icon: MapPin },
    { name: 'Mapa', href: '/mapa', icon: MapIcon },
    { name: 'Favoritos', href: '/favoritos', icon: Heart },
  ];

  return (
    <nav className="w-full bg-brand-surface border-t border-[rgba(255,255,255,0.05)] z-50 shrink-0 md:hidden">
      <div className="w-full flex justify-between px-6 py-2 pb-safe mb-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              prefetch={false}
              className={`flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[56px] transition-all
                ${isActive ? 'text-brand-primary' : 'text-brand-muted hover:text-white'}
              `}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-brand-primary drop-shadow-md' : ''} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
