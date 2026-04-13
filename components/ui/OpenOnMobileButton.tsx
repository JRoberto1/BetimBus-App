'use client'
import { useState } from 'react'
import { Smartphone } from 'lucide-react'
import { QRCodeModal } from './QRCodeModal'
import { isMobile } from '@/lib/device'

export function OpenOnMobileButton() {
  const [open, setOpen] = useState(false)

  // Não renderiza no mobile — só no desktop
  if (typeof navigator !== 'undefined' && isMobile()) return null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg
                   bg-[#007BFF] text-white text-sm font-medium
                   hover:bg-[#007BFF]/90 transition-colors"
      >
        <Smartphone size={16} />
        Abrir no celular
      </button>
      <QRCodeModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
