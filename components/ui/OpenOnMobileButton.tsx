// components/ui/OpenOnMobileButton.tsx
'use client'
import { useState, useEffect } from 'react'
import { Smartphone } from 'lucide-react'
import { QRCodeModal } from './QRCodeModal'
import { isMobile } from '@/lib/device'

export function OpenOnMobileButton() {
  const [open, setOpen] = useState(false)
  const [isMob, setIsMob] = useState(true)

  useEffect(() => {
    setIsMob(isMobile())
  }, [])

  if (isMob) return null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-primary/80 transition-colors shadow-lg"
      >
        <Smartphone size={16} />
        Usar no Celular
      </button>
      <QRCodeModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
