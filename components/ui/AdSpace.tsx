export default function AdSpace() {
  return (
    <div className="w-[320px] h-[50px] bg-brand-surface border border-brand-border flex items-center justify-center rounded overflow-hidden relative">
      <span className="text-[10px] text-brand-muted uppercase font-bold tracking-widest opacity-50">
        Espaço Publicitário
      </span>
      {/* 
        Aqui futuramente será injetado o script do Google AdSense.
        Exemplo: <ins className="adsbygoogle" style={{ display: 'inline-block', width: 320, height: 50 }} ... />
      */}
    </div>
  );
}
