import { Metadata } from 'next'
import { InstallInstructions } from './InstallInstructions'

export const metadata: Metadata = {
  title: 'Instalar o Betim Bus no seu celular | Betim Bus',
  description: 'Veja como instalar o Betim Bus na tela inicial do seu celular em 3 passos. Gratuito, sem precisar da loja de apps.',
}

export default function InstalarPage() {
  return (
    <div className="max-w-md mx-auto space-y-6 my-8 px-5 pb-24 text-white">
      <h1 className="text-2xl font-black text-[#007BFF]">Instale o Betim Bus no seu celular</h1>
      <p className="text-[#8A94A6] text-sm">
        O Betim Bus aparecerá na sua tela inicial como um app normal e funciona sem internet após o primeiro acesso.
      </p>

      <InstallInstructions />
    </div>
  )
}
