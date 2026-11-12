/**
 * Faixa de ondas entre o lazer e as condições.
 *
 * É o grafismo "B · Ondas chapadas" do KV v2 (quadro "KV v2 · 02 · Grafismos",
 * página "Draft · Apresentação · Novo KV"): sol em mel, duas ondas e um fio
 * creme, em cor chapada sobre o claro da página. No KV as ondas são marinho;
 * aqui foram para os verdes-água da cartela: teal (#2a8582) atrás e petróleo
 * (#0f4446) na frente.
 *
 * As três ondas do Figma são periódicas, e cada uma virou um ladrilho
 * (`onda-mare.svg` 280px, `onda-noite.svg` 340px, `onda-linha.svg` 240px) que
 * se repete na largura toda. A animação desloca cada camada exatamente um
 * período, então o loop não tem emenda; as três andam em velocidades e
 * sentidos diferentes, e o sol sobe e desce bem devagar. Ver `.vibe-wave` em
 * styles.css. Decorativa: fora da árvore de acessibilidade.
 */
export function WaveBand() {
  return (
    <div
      aria-hidden="true"
      data-reveal
      data-motion
      className="relative mb-[clamp(4.5rem,10vw,8.5rem)] h-[clamp(220px,24vw,320px)] overflow-hidden"
    >
      <span className="vibe-sun absolute right-[16%] bottom-[53%] aspect-square w-[clamp(72px,8vw,120px)] rounded-full bg-[#d9a65a]" />

      <div
        className="vibe-wave vibe-wave-mare absolute top-[calc(47%-20px)] bottom-0 left-0"
        style={{ backgroundImage: "url(/images/vibe-cumbuco/onda-mare.svg)" }}
      />
      <div
        className="vibe-wave vibe-wave-noite absolute top-[calc(70%-20px)] bottom-0 left-0"
        style={{ backgroundImage: "url(/images/vibe-cumbuco/onda-noite.svg)" }}
      />
      <div
        className="vibe-wave vibe-wave-linha absolute top-[calc(88%-10px)] left-0 h-5"
        style={{ backgroundImage: "url(/images/vibe-cumbuco/onda-linha.svg)" }}
      />
    </div>
  );
}
