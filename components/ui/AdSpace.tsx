// components/ui/AdSpace.tsx
'use client'

interface AdSpaceProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal'
  className?: string
}

export function AdSpace({ slot, format = 'auto', className }: AdSpaceProps) {
  return (
    <div className={`ad-container w-full overflow-hidden flex justify-center py-4 ${className || ''}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
