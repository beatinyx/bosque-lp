/**
 * Lockup do Viver Essencial.
 *
 * No Figma ele é um grupo de 323x83: o desenho de "ESSENCIAL" com a moldura em
 * canto (um SVG, aqui em /images/viver-essencial/logo-essencial.svg) e duas
 * linhas de texto em Poppins por cima — "VIVER" encostado no alto à esquerda e
 * "CONDOMÍNIO CLUBE" na base, começando a 48% da largura, dentro da moldura.
 *
 * As duas linhas ficam como texto (e não dentro do SVG) porque assim o nome do
 * produto continua legível para leitor de tela e busca — na ordem, o lockup lê
 * "VIVER ESSENCIAL CONDOMÍNIO CLUBE". As medidas são percentuais e o corpo do
 * texto vai em `cqw` para o lockup escalar inteiro com a própria largura, daí
 * o `@container` no elemento de fora.
 */
export function ProductLogo({ className }: { className?: string }) {
  return (
    <div className={`@container relative aspect-[323/83] text-white ${className ?? ""}`}>
      <span className="absolute top-0 left-[3.4%] text-[3.45cqw] leading-[1.5] font-medium">
        VIVER
      </span>

      <img
        src="/images/viver-essencial/logo-essencial.svg"
        alt="Essencial"
        className="absolute top-[6%] left-[3.4%] w-[93.2%]"
      />

      <span className="absolute top-[78%] left-[47.7%] text-[3.45cqw] leading-[1.5] font-medium">
        CONDOMÍNIO CLUBE
      </span>
    </div>
  );
}
