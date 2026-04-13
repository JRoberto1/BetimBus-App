// components/ui/AdSpace.tsx
'use client';
import { useEffect, useRef } from 'react';

interface AdSpaceProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
}

export function AdSpace({ slot, format = 'auto', className }: AdSpaceProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (adRef.current && !adRef.current.classList.contains('ads-filled')) {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        adRef.current.classList.add('ads-filled');
      }
    } catch (e: any) {
      console.warn('AdSense:', e.message);
    }
  }, []);

  return (
    <div className={`ad-container w-full overflow-hidden flex justify-center py-4 bg-brand-surface/20 border border-brand-border/30 rounded-xl min-h-[90px] relative items-center ${className || ''}`}>
      <span className="absolute text-[10px] text-brand-muted/40 uppercase tracking-widest pointer-events-none z-0">
        Espaço Publicitário
      </span>
      <ins
        ref={adRef}
        className="adsbygoogle z-10 w-full"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-0000000000000000"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
