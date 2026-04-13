'use client'
import { isMobile } from '@/lib/device'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'

export function InstallInstructions() {
  const [device, setDevice] = useState<'ios' | 'android' | 'desktop'>('desktop')

  useEffect(() => {
    if (!isMobile()) {
      setDevice('desktop')
    } else {
      const ua = navigator.userAgent
      if (/iPhone|iPad|iPod/i.test(ua)) {
        setDevice('ios')
      } else {
        setDevice('android')
      }
    }
  }, [])

  if (device === 'desktop') {
    return (
      <div className="bg-[#1C2333] p-6 rounded-2xl border border-white/10 flex flex-col items-center gap-6 mt-8">
        <h2 className="text-lg font-bold">Aponte a câmera</h2>
        <div className="bg-white p-4 rounded-xl">
          <QRCodeSVG
            value="https://betimbus.com.br"
            size={200}
            bgColor="#ffffff"
            fgColor="#121826"
            level="M"
          />
        </div>
        <p className="text-[#8A94A6] text-sm text-center">
          Leia este código com o celular para acessar o aplicativo e poder instalá-lo de forma simplificada.
        </p>
      </div>
    )
  }

  if (device === 'ios') {
    return (
      <div className="bg-[#1C2333] p-6 rounded-2xl border border-white/10 mt-8 space-y-4">
        <h2 className="text-lg font-bold text-[#00F2FF]">iPhone/iPad:</h2>
        <ol className="list-decimal pl-4 space-y-3 text-sm">
          <li>Toque no ícone de compartilhar (□↑) na barra inferior</li>
          <li>Role as opções e toque em <strong>"Adicionar à tela inicial"</strong></li>
          <li>Confirme tocando em <strong>"Adicionar"</strong> no canto superior</li>
        </ol>
      </div>
    )
  }

  return (
    <div className="bg-[#1C2333] p-6 rounded-2xl border border-white/10 mt-8 space-y-4">
      <h2 className="text-lg font-bold text-[#4CAF50]">Android:</h2>
      <ol className="list-decimal pl-4 space-y-3 text-sm">
        <li>Toque nos três pontos (⋮) no canto superior direito do navegador</li>
        <li>Selecione <strong>"Adicionar à tela inicial"</strong></li>
        <li>Confirme tocando em <strong>"Adicionar"</strong></li>
      </ol>
    </div>
  )
}
