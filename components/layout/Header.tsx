'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Bell } from 'lucide-react'
import { OpenOnMobileButton } from '@/components/ui/OpenOnMobileButton'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className="bg-brand-bg flex justify-between items-center w-full px-6 py-4 h-16 sticky top-0 z-50">
      <Link href="/" className="text-xl font-black text-white tracking-tighter uppercase">Betim Bus</Link>
      
      <div className="flex items-center gap-4">
        {/* Desktop items */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/linhas" className="text-sm font-medium text-[#8A94A6] hover:text-white transition-colors">
            Linhas
          </Link>
          <Link href="/pontos" className="text-sm font-medium text-[#8A94A6] hover:text-white transition-colors">
            Pontos
          </Link>
          <Link href="/mapa" className="text-sm font-medium text-[#8A94A6] hover:text-white transition-colors">
            Mapa
          </Link>
          <Link href="/noticias" className="text-sm font-medium text-[#8A94A6] hover:text-white transition-colors">
            Notícias
          </Link>
          
          <div 
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm text-[#8A94A6] hover:text-white transition-colors">
              Mais <ChevronDown size={14} />
            </button>
            
            {dropdownOpen && (
              <div className="absolute top-full right-0 pt-2 w-40">
                <div className="bg-[#121826] border border-white/10 rounded-lg shadow-xl overflow-hidden flex flex-col">
                  <Link href="/sobre" className="px-4 py-2 text-sm text-white hover:bg-[#007BFF] transition-colors">Sobre</Link>
                  <Link href="/privacidade" className="px-4 py-2 text-sm text-white hover:bg-[#007BFF] transition-colors border-t border-white/10">Privacidade</Link>
                  <Link href="/contato" className="px-4 py-2 text-sm text-white hover:bg-[#007BFF] transition-colors border-t border-white/10">Contato</Link>
                </div>
              </div>
            )}
          </div>
          <OpenOnMobileButton />
        </div>
        
        {/* Extra icons common for everyone */}
        <Bell className="text-[#8A94A6] hover:text-white transition-colors" size={20} />

        {/* Mobile items */}
        <button 
          className="md:hidden text-[#8A94A6] hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#121826]">
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <span className="text-xl font-black text-white uppercase">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-[#8A94A6] hover:text-white">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col p-6 gap-6">
            <Link href="/noticias" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg font-medium flex items-center gap-3">
              📰 Notícias
            </Link>
            <Link href="/sobre" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg font-medium flex items-center gap-3">
              ℹ️ Sobre
            </Link>
            <Link href="/privacidade" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg font-medium flex items-center gap-3">
              🔒 Privacidade
            </Link>
            <Link href="/contato" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg font-medium flex items-center gap-3">
              ✉️ Contato
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
