'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Search, MapPin, ArrowDown, Navigation, ChevronRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { useLocation } from '@/lib/useLocation';
import { calculateDistance, formatDistance } from '@/lib/geo';
import Link from 'next/link';

interface Stop {
  id: number;
  name: string;
  lat: number;
  lon: number;
  lines: string[];
}

export default function JourneyPlannerEngine() {
  const [pontos, setPontos] = useState<Stop[]>([]);
  const location = useLocation();

  const [origemType, setOrigemType] = useState<'GPS' | 'STOP'>('GPS');
  const [origemStop, setOrigemStop] = useState<Stop | null>(null);
  
  const [destinoQuery, setDestinoQuery] = useState('');
  const [destinoStop, setDestinoStop] = useState<Stop | null>(null);
  const [showDestinoSuggestions, setShowDestinoSuggestions] = useState(false);
  const destinoRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown de sugestões de destino ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (destinoRef.current && !destinoRef.current.contains(event.target as Node)) {
        setShowDestinoSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [destinoRef]);

  // Carrega pontos.json
  useEffect(() => {
    fetch('/data/pontos.json')
      .then(res => res.json())
      .then(data => setPontos(data))
      .catch(console.error);
  }, []);

  // Auto-complete Destino
  const destinoSuggestions = useMemo(() => {
    if (destinoQuery.trim().length === 0) return [];
    const lowerQ = destinoQuery.toLowerCase();
    // Excluir a de origem (se houver) para evitar trajetos pra si mesmo
    return pontos
      .filter(p => p.name.toLowerCase().includes(lowerQ) && p.id !== origemStop?.id)
      .slice(0, 5); // Traz apenas max 5 predições
  }, [destinoQuery, pontos, origemStop]);


  // Lógica pesada de Roteamento (Interseção Direta)
  const roteamento = useMemo(() => {
    if (!destinoStop) return null;

    let linhasNaOrigem = new Set<string>();
    
    // Processamento de Origem
    if (origemType === 'GPS' && location.lat && location.lon) {
       // Buscar todos os pontos num raio de 500m pra ter margem de linhas
       const proxPontos = pontos.filter(p => calculateDistance(location.lat!, location.lon!, p.lat, p.lon) <= 500);
       proxPontos.forEach(p => {
         p.lines.forEach(l => linhasNaOrigem.add(l));
       });
    } else if (origemType === 'STOP' && origemStop) {
       origemStop.lines.forEach(l => linhasNaOrigem.add(l));
    }

    // Processar Destino (Ponto estrito escolhido)
    const linhasNoDestino = new Set(destinoStop.lines);

    // Interseção direta
    const diretas = Array.from(linhasNaOrigem).filter(i => linhasNoDestino.has(i));
    const transbordos: { linhaOrigem: string, pontoTroca: Stop, linhaDestino: string }[] = [];

    // Motor O(N) para baldeação: Encontrar ponto focal comum se direto falhar
    if (diretas.length === 0) {
      for (const stop of pontos) {
        if (origemStop && stop.id === origemStop.id) continue;
        if (stop.id === destinoStop.id) continue;
        
        const posOrigens = stop.lines.filter(l => linhasNaOrigem.has(l));
        const posDestinos = stop.lines.filter(l => linhasNoDestino.has(l));
        
        if (posOrigens.length > 0 && posDestinos.length > 0) {
           transbordos.push({
              linhaOrigem: posOrigens[0],
              pontoTroca: stop,
              linhaDestino: posDestinos[0]
           });
           
           if (transbordos.length >= 6) break; // Trava UI lag e excesso
        }
      }
    }

    return { diretas, transbordos };

  }, [origemType, origemStop, location, destinoStop, pontos]);

  const inverterDestinos = () => {
     if (origemType === 'GPS') {
        alert("Não é possível inverter uma Origem do tipo 'Meu Local'.");
        return;
     }
     const tempOrigin = origemStop;
     setOrigemStop(destinoStop);
     setDestinoStop(tempOrigin);
     if (destinoStop) setDestinoQuery(destinoStop.name);
  };

  return (
    <div className="space-y-6">
      
      {/* Container de Formulário */}
      <div className="surface-card p-4 rounded-xl space-y-4 shadow-xl relative z-20">
         
         {/* Campo ORIGEM */}
         <div>
           <label className="text-[10px] text-brand-secondary font-bold tracking-widest uppercase mb-1.5 block px-1">
             Saindo de
           </label>
           <div className="w-full bg-[#121826] border border-[rgba(255,255,255,0.05)] rounded-lg py-3 px-4 flex items-center justify-between shadow-inner">
             <div className="flex items-center gap-3 w-full">
               <Navigation className="text-brand-primary" size={18} />
               <input 
                 readOnly 
                 value={origemType === 'GPS' ? 'Meu Local Atual (GPS)' : origemStop?.name || ''}
                 className="bg-transparent border-none text-white text-[15px] outline-none w-full font-medium placeholder:text-brand-muted truncate" 
               />
             </div>
             {origemType === 'GPS' && location.loading && (
               <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shadow-[0_0_12px_rgba(0,123,255,0.8)]shrink-0"></span>
             )}
             {origemType === 'GPS' && !location.loading && location.lat && (
               <CheckCircle2 className="text-green-500 shrink-0" size={16} />
             )}
           </div>
         </div>

         {/* Intercambio */}
         <div className="relative h-2 flex justify-center items-center my-1 z-10">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 bottom-0 w-0.5 h-12 bg-[rgba(255,255,255,0.05)] -z-10 border-l border-r border-[#1C2333]"></div>
            <button 
              onClick={inverterDestinos} 
              className="bg-[#1C2333] border border-[rgba(255,255,255,0.1)] rounded-full p-1.5 hover:bg-brand-primary/20 hover:border-brand-primary shadow-sm transition-all"
            >
              <RotateCcw size={16} className="text-brand-muted" />
            </button>
         </div>

         {/* Campo DESTINO */}
         <div ref={destinoRef} className="relative">
           <label className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase mb-1.5 block px-1">
             Indo para
           </label>
           <div className="w-full bg-[#1b253b] border border-[rgba(0,242,255,0.3)] rounded-lg py-3 flex items-center pl-4 pr-12 shadow-[0_0_15px_rgba(0,242,255,0.05)] focus-within:shadow-[0_0_20px_rgba(0,242,255,0.15)] focus-within:border-brand-secondary transition-all">
             <MapPin className="absolute left-4 text-brand-secondary" size={18} />
             <input 
                 type="text"
                 placeholder="Digite um bairro ou rua..."
                 className="bg-transparent border-none text-white text-[15px] outline-none w-full pl-8 font-medium placeholder:text-brand-muted"
                 value={destinoQuery}
                 onChange={(e) => {
                    setDestinoQuery(e.target.value);
                    setShowDestinoSuggestions(true);
                    if (destinoStop && e.target.value !== destinoStop.name) {
                       setDestinoStop(null); // Reseta a parada pois mudou a string manual
                    }
                 }}
                 onFocus={() => setShowDestinoSuggestions(true)}
             />
             {destinoStop && (
               <CheckCircle2 className="absolute right-4 text-green-500" size={16} />
             )}
           </div>

           {/* Dropdown Predictive */}
           {showDestinoSuggestions && destinoSuggestions.length > 0 && (
             <div className="absolute top-full left-0 right-0 mt-2 bg-[#1C2333] border border-[rgba(255,255,255,0.1)] rounded-xl overflow-hidden shadow-2xl scale-100 origin-top">
                {destinoSuggestions.map((ponto, idx) => (
                   <button 
                     key={ponto.id} 
                     className="w-full text-left px-5 py-3 hover:bg-[rgba(255,255,255,0.05)] border-b border-[rgba(255,255,255,0.02)] last:border-0 transition-colors"
                     onClick={() => {
                       setDestinoStop(ponto);
                       setDestinoQuery(ponto.name);
                       setShowDestinoSuggestions(false);
                     }}
                   >
                     <p className="text-white text-sm font-bold truncate leading-tight">{ponto.name}</p>
                     <p className="text-[10px] text-brand-muted mt-1 uppercase tracking-widest">{ponto.lines.length} rotas operam aqui</p>
                   </button>
                ))}
             </div>
           )}
         </div>

      </div>

      {/* Resultados do Motor */}
      <div className="pt-4 space-y-4 pb-8">
        {destinoStop && roteamento && roteamento.diretas.length > 0 && (
           <div className="flex items-center gap-2 px-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
              <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">
                Trajetos Diretos Encontrados ({roteamento.diretas.length})
              </h3>
           </div>
        )}

        {destinoStop && roteamento && roteamento.diretas.length === 0 && roteamento.transbordos.length === 0 && (
           <div className="surface-card p-6 text-center rounded-xl space-y-3 border-dashed border-[rgba(255,255,255,0.1)]">
             <MapPin className="text-brand-muted mx-auto opacity-50" size={32} />
             <p className="text-brand-muted text-sm font-medium">Não encontramos rotas diretas ou de baldeação na malha para estes pontos.</p>
           </div>
        )}

        {destinoStop && roteamento && roteamento.diretas.length > 0 && (
          <div className="grid grid-cols-1 gap-3">
            {roteamento.diretas.map(linha => (
              <Link 
                href={`/linhas`} 
                key={linha} 
                className="surface-card p-4 rounded-xl flex items-center justify-between group hover:border-brand-primary transition-all duration-200"
              >
                 <div className="flex items-center gap-4">
                   <div className="bg-[rgba(0,123,255,0.1)] border border-[rgba(0,123,255,0.2)] px-4 py-2.5 rounded-xl">
                     <span className="text-xl font-black text-brand-primary">{linha}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest">Rota ideal</span>
                     <span className="text-white text-sm font-medium mt-0.5">Viagem direta</span>
                   </div>
                 </div>
                 <ChevronRight className="text-brand-muted group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
              </Link>
            ))}
          </div>
        )}

        {/* Transbordos */}
        {destinoStop && roteamento && roteamento.diretas.length === 0 && roteamento.transbordos.length > 0 && (
            <div className="space-y-4">
               <div className="flex items-center gap-2 px-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]"></span>
                  <h3 className="text-[11px] font-bold text-yellow-500 uppercase tracking-widest">
                    Transbordos Precisos ({roteamento.transbordos.length})
                  </h3>
               </div>
               
               <div className="grid grid-cols-1 gap-3">
                 {roteamento.transbordos.map((t, idx) => (
                    <div key={idx} className="surface-card p-4 rounded-xl flex flex-col gap-3 group border border-yellow-500/10 hover:border-yellow-500/30 transition-all">
                       <div className="flex items-center justify-between px-2">
                         <div className="bg-[rgba(234,179,8,0.1)] border border-[rgba(234,179,8,0.2)] px-3 py-1.5 rounded-lg text-center flex-1">
                           <span className="text-xs uppercase text-brand-muted block mb-0.5 font-bold tracking-widest">Embarque</span>
                           <span className="text-lg font-black text-yellow-500">{t.linhaOrigem}</span>
                         </div>
                         <div className="px-3 flex flex-col items-center">
                           <ArrowDown className="text-zinc-500" size={16} />
                         </div>
                         <div className="bg-[rgba(0,242,255,0.1)] border border-[rgba(0,242,255,0.2)] px-3 py-1.5 rounded-lg text-center flex-1">
                           <span className="text-xs uppercase text-brand-muted block mb-0.5 font-bold tracking-widest">Conecte-se</span>
                           <span className="text-lg font-black text-brand-secondary">{t.linhaDestino}</span>
                         </div>
                       </div>
                       
                       <div className="border-t border-[rgba(255,255,255,0.05)] pt-3 mt-1 text-xs text-brand-muted flex flex-col gap-1.5 items-start">
                          <span className="font-semibold text-white">Desça para a troca neste exato ponto:</span>
                          <span className="w-full block bg-black/30 p-2.5 rounded-lg font-mono text-[11px] text-zinc-300 leading-snug">{t.pontoTroca.name}</span>
                       </div>
                    </div>
                 ))}
               </div>
            </div>
        )}

      </div>

    </div>
  );
}
