'use client'
import { X, Smartphone } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

interface Props {
  open: boolean
  onClose: () => void
}

export function QRCodeModal({ open, onClose }: Props) {
  if (!open) return null
  const url = 'https://betimbus.com.br'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1C2333] rounded-2xl p-8 max-w-sm w-full mx-4 border border-white/10 flex flex-col items-center gap-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Smartphone size={20} className="text-[#007BFF]" />
            <h2 className="text-white font-semibold text-lg">
              Abra no seu celular
            </h2>
          </div>
          <button onClick={onClose} className="text-[#8A94A6] hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl">
          <QRCodeSVG
            value={url}
            size={200}
            bgColor="#ffffff"
            fgColor="#121826"
            level="M"
          />
        </div>

        <div className="text-center space-y-2 w-full">
          <p className="text-white text-sm font-medium">Como instalar:</p>
          <p className="text-[#8A94A6] text-sm">1. Aponte a câmera do celular para o QR Code</p>
          <p className="text-[#8A94A6] text-sm">2. Toque no link que aparecer</p>
          <p className="text-[#8A94A6] text-sm">3. Clique em "Adicionar à tela inicial"</p>
        </div>

        <p className="text-[#8A94A6] text-xs text-center">
          ou acesse{' '}
          <span className="text-[#00F2FF]">betimbus.com.br</span>
          {' '}no navegador do celular
        </p>
      </div>
    </div>
  )
}
