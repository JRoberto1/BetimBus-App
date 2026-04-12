export const ROUTES = [
  { name: "131 - Centro / Dom Bosco", value: "4dqr" },
  { name: "160A - Hospital Regional / Petrovale", value: "4dqs" },
  { name: "160B - Hospital Regional / Petrovale", value: "4dqt" },
  { name: "180A - Centro / Pimentas", value: "4dvq" },
  { name: "180B - Centro / Vianópolis", value: "4e3b" },
  { name: "191 - Centro / Charneca", value: "4e7g" },
  { name: "20 - Sítio Poções / Brasileia", value: "4788" },
  { name: "210A - Sítio Poções / Centro", value: "4eav" },
  { name: "210B - Decamão / Várzea das Flores", value: "4eq7" },
  { name: "260A - Taquaril / Fiat", value: "4eui" },
  { name: "260B - Fazenda Santa Cruz / Fiat", value: "4euj" },
  { name: "261 - Taquaril / Vila Verde", value: "4euk" },
  { name: "270 - Taquaril / Bandeirinhas", value: "4eul" },
  { name: "30 - Nossa Senhora de Fátima / Cidade Verde", value: "4dpq" },
  { name: "313 - Parque das Acácias / Hospital Regional", value: "4eum" },
  { name: "314A - Duque de Caxias II / Pingo d'Agua", value: "4eun" },
  { name: "314B - Duque de Caxias II / Distrito industrial Aroeiras - Via Pingo d'Agua", value: "6lsq" },
  { name: "315A - Bueno Franco / Cachoeira", value: "4euo" },
  { name: "315B - Bueno Franco / Icaivera", value: "4eup" },
  { name: "34 - Dom Bosco / Brasiléia", value: "4ev9" },
  { name: "40 - Jardim Perla / Residencial Lagoa", value: "4eva" },
  { name: "410 - São Caetano / Centro", value: "4euq" },
  { name: "411 - Granja Verde / Centro", value: "4eur" },
  { name: "412 - Capelinha / São Cristóvão / Centro", value: "4eus" },
  { name: "414 - Capelinha / Centro", value: "4eut" },
  { name: "415 - Granja Verde / Centro", value: "4euu" },
  { name: "450 - Alvorada / São Luiz", value: "4euv" },
  { name: "450B - Alvorada / Centro via Teresópolis", value: "7l3e" },
  { name: "50 - Granja Verde / Hospital Regional", value: "4evb" },
  { name: "53 - Capelinha / Hospital Regional", value: "4evc" },
  { name: "54 - Alvorada / Hospital Regional", value: "4evd" },
  { name: "60 - PTB / Hospital Regional", value: "4evf" },
  { name: "61 - Jardim Alterosa 2ª Seção / Cruzeiro", value: "4evg" },
  { name: "70 - Dom Bosco / Bandeirinhas", value: "4evh" },
  { name: "710A - São João / Santa Inês", value: "4ev0" },
  { name: "710B - São João / Centro - Via Jardim Petrópolis", value: "4ev1" },
  { name: "830A - Santo Afonso / Jardim Alterosa 2ª Seção", value: "4ev3" },
  { name: "830B - Santo Afonso / Jardim Alterosa 2ª Seção", value: "4ev4" },
  { name: "830C - Santo Afonso / Centro / Santo Afonso", value: "4ev5" },
  { name: "90A - Citrolândia / Nossa Senhora de Fátima", value: "4evi" },
  { name: "90B - Citrolândia / Hospital Regional", value: "4evj" },
  { name: "910A - Citrolândia / Hospital Regional Via Upa Norte", value: "4ev6" },
  { name: "910B - Citrolândia / Centro", value: "4ev7" },
  { name: "920 - Jardim Paulista / Hospital Regional", value: "4ev8" },
  { name: "PE67 - Terminal Rodoviário / Mater Dei", value: "4dpr" }
];

export function getRouteValueByShortName(shortName: string): string | null {
  const route = ROUTES.find(r => {
    const match = r.name.match(/^(\w+)/);
    return match && match[1] === shortName;
  });
  return route ? route.value : null;
}
