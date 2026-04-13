import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-6 px-4 mt-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[#8A94A6] text-xs">
          © 2026 Betim Bus — FlowIQ. Todos os direitos reservados.
        </p>
        <nav className="flex items-center gap-4 flex-wrap justify-center">
          <Link href="/noticias" className="text-[#8A94A6] hover:text-white text-xs transition-colors">
            Notícias
          </Link>
          <Link href="/sobre" className="text-[#8A94A6] hover:text-white text-xs transition-colors">
            Sobre
          </Link>
          <Link href="/privacidade" className="text-[#8A94A6] hover:text-white text-xs transition-colors">
            Privacidade
          </Link>
          <Link href="/contato" className="text-[#8A94A6] hover:text-white text-xs transition-colors">
            Contato
          </Link>
        </nav>
      </div>
    </footer>
  )
}
