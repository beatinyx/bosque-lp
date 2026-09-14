import { IconPin } from "./Icons";

const ADDRESS = "Av. Cel. Matos Dourado, 1281, Pici";
/** Endereço completo, do embed do próprio Figma Sites. */
const MAPS_QUERY = encodeURIComponent(
  "R. Cel. Matos Dourado, 1281 - Padre Andrade, Fortaleza - CE, 60511-745",
);
const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&z=14&hl=pt-BR&output=embed`;

/** Pontos do entorno, na ordem da lista do Figma. */
const NEARBY = [
  {
    strong: "Em frente",
    rest: "ao Pátio Solares: Academia, Supermercado, Lotérica, dentre outros",
  },
  { strong: "1 min", rest: "do Cuca Pici" },
  { strong: "2 min", rest: "de escolas" },
  { strong: "3 min", rest: "do Vapt Vupt Antônio Bezerra" },
  { strong: "3 min", rest: "do Terminal Antônio Bezerra" },
  { strong: "7 min", rest: "do Campus do Pici" },
  { strong: "7 min", rest: "da UPA 24h do Autran Nunes" },
];

/**
 * DOBRA 5 — Localização.
 *
 * O card azul com o canto superior esquerdo e o inferior direito arredondados
 * em 60px (o `60 0 60 0` do Figma) fica sobre o degradê da página. A pastilha
 * do endereço e os marcadores da lista são imagem no arquivo; aqui viraram
 * markup, com o "V" da Victa como bullet.
 */
export function LocationSection() {
  return (
    <section id="localizacao" className="py-12 md:py-14">
      <div className="lp-container">
        <div className="rounded-[60px_0_60px_0] bg-brand px-6 py-10 text-white md:px-12 md:py-12">
          <h2 className="text-center text-[clamp(1.5rem,4.6vw,2rem)] leading-[1.4] font-light">
            Morar bem é estar <strong className="font-bold">perto de tudo</strong>
          </h2>

          {/*
            A grade é mais estreita que o card e centralizada: com duas colunas
            de metade cada, a lista e o mapa iam encostar nas duas bordas e o
            conjunto parecia jogado para fora. O mapa tem teto de largura para
            a coluna do texto não encolher junto.
          */}
          <div className="mt-8 grid items-start gap-8 lg:mx-auto lg:max-w-[920px] lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-12">
            <div>
              <p className="inline-flex items-center gap-3 rounded-full border border-white px-5 py-2.5 text-[clamp(0.875rem,3.4vw,1rem)] font-bold">
                <IconPin className="size-5 shrink-0 text-brand-aqua" aria-hidden="true" />
                {ADDRESS}
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {NEARBY.map(({ strong, rest }) => (
                  <li key={`${strong} ${rest}`} className="flex items-start gap-3">
                    <img
                      src="/images/viver-essencial/marcador.png"
                      alt=""
                      aria-hidden="true"
                      className="mt-1 h-auto w-[22px] shrink-0 select-none"
                    />
                    <span className="text-[0.95rem] leading-[1.4]">
                      <strong className="font-bold">{strong}</strong> {rest}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <iframe
              title={`Mapa de localização do Viver Essencial — ${ADDRESS}`}
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[288px] w-full border-0 lg:h-[388px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
