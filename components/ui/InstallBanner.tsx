'use client'
import { useState, useEffect } from 'react'
import { X, Download } from 'lucide-react'
import { isMobile, isInstalled } from '@/lib/device'

export function InstallBanner() {
  const [show, setShow] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    if (!isMobile() || isInstalled()) return

    const dismissed = localStorage.getItem('install-banner-dismissed')
    if (dismissed) {
      const dismissedAt = parseInt(dismissed)
      const sevenDays = 7 * 24 * 60 * 60 * 1000
      if (Date.now() - dismissedAt < sevenDays) return
    }

    const timer = setTimeout(() => setShow(true), 30000) // 30 segundos

    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    })

    return () => clearTimeout(timer)
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') setShow(false)
    }
  }

  const handleDismiss = () => {
    localStorage.setItem('install-banner-dismissed', Date.now().toString())
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 bg-[#1C2333] border border-[#007BFF]/30 rounded-xl p-4 flex items-center gap-3 shadow-xl md:hidden">
      <div className="flex-1">
        <p className="text-white text-sm font-medium">
          Adicione o Betim Bus à sua tela inicial
        </p>
        <p className="text-[#8A94A6] text-xs mt-0.5">
          Acesse sem internet e mais rápido
        </p>
      </div>
      <button
        onClick={handleInstall}
        className="flex items-center gap-1.5 px-3 py-2 bg-[#007BFF] text-white text-xs font-medium rounded-lg shrink-0"
      >
        <Download size={14} />
        Instalar
      </button>
      <button onClick={handleDismiss} className="text-[#8A94A6] hover:text-white shrink-0">
        <X size={18} />
      </button>
    </div>
  )
}
