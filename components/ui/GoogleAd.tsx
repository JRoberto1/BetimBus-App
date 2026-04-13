'use client';

import { useEffect, useRef } from 'react';

interface GoogleAdProps {
  adSlot: string; // The specific slot ID from Google AdSense
  adFormat?: 'auto' | 'fluid' | 'rectangle';
  fullWidthResponsive?: boolean;
}

export default function GoogleAd({ adSlot, adFormat = 'auto', fullWidthResponsive = true }: GoogleAdProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Only push the ad if this exact element hasn't been filled yet.
    // Next.js SPA navigation can cause double pushing errors if not handled.
    try {
      if (adRef.current && !adRef.current.classList.contains('adsbygoogle-filled')) {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        // Adding a basic marker class
        adRef.current.classList.add('adsbygoogle-filled');
      }
    } catch (e: any) {
      console.error('AdSense exception:', e.message);
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-4 overflow-hidden rounded-xl bg-brand-surface/30 min-h-[100px] items-center border border-dashed border-brand-border/30 relative">
      <span className="absolute text-[10px] text-brand-muted/40 uppercase tracking-widest pointer-events-none z-0">
        Espaço Publicitário
      </span>
      <ins
        ref={adRef}
        className="adsbygoogle z-10 w-full"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-0000000000000000" // Replace with actal Publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}
