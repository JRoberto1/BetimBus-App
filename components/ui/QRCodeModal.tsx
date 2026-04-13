// components/ui/QRCodeModal.tsx
'use client'
import { X } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

interface QRCodeModalProps {
  open: boolean
  onClose: () => void
}

export function QRCodeModal({ open, onClose }: QRCodeModalProps) {
  if (!open) return null
  const url = 'https://betim-bus-app.vercel.app' // Atualizei para o fallback imediato ate dominar

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#121826] rounded-2xl p-8 max-w-sm w-full mx-4 border border-[rgba(255,255,255,0.1)] flex flex-col items-center gap-6 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between w-full">
          <h2 className="text-white font-semibold text-lg">
            Abra no seu celular
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-[0_0_20px_rgba(0,123,255,0.3)]">
          <QRCodeSVG
            value={url}
            size={200}
            bgColor="#ffffff"
            fgColor="#121826"
            level="M"
          />
        </div>

        <div className="text-center space-y-2">
          <p className="text-white/90 text-sm font-medium">1. Aponte a câmera do celular no código</p>
          <p className="text-white/80 text-sm">2. Toque no link que aparecer</p>
          <p className="text-white/80 text-sm">3. Clique em "Adicionar à tela inicial"</p>
        </div>

        <p className="text-zinc-500 text-xs text-center border-t border-[rgba(255,255,255,0.1)] pt-4 w-full">
          Ou digite no celular <span className="text-brand-primary">betim-bus-app.vercel.app</span>
        </p>
      </div>
    </div>
  )
}
