import { useEffect, useRef, useState, type ReactNode } from "react";

/*
 * O projeto roda com `exactOptionalPropertyTypes`, então os opcionais declaram
 * `| undefined` de propósito: assim quem chama pode repassar um valor que já
 * vem opcional (`label={label}`) sem precisar montar o objeto condicionalmente.
 */
type ImgProps = {
  src: string;
  alt: string;
  className?: string | undefined;
  /** Texto exibido no placeholder listrado enquanto o arquivo real não existe. */
  label?: string | undefined;
  /**
   * Substituto renderizado em vez do placeholder listrado quando o arquivo não
   * existe. Usado no lockup tipográfico do logo do produto, que precisa ficar
   * apresentável enquanto o PNG oficial não chega.
   */
  fallback?: ReactNode | undefined;
  loading?: "lazy" | "eager" | undefined;
  fetchPriority?: "high" | "low" | "auto" | undefined;
};

/**
 * Imagem com fallback: enquanto o arquivo real não existe em /public/images,
 * mostra um placeholder listrado com o nome esperado do arquivo (ou o nó
 * passado em `fallback`). Basta soltar a imagem com o mesmo caminho em `src`
 * para ela aparecer.
 */
export function Img({
  src,
  alt,
  className,
  label,
  fallback,
  loading = "lazy",
  fetchPriority,
}: ImgProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // Com SSR a imagem pode falhar antes da hidratação, e nesse caso o onError
  // nunca dispara. Conferimos o estado real do elemento ao montar.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed || !src) {
    if (fallback) return <>{fallback}</>;

    return (
      <div className={`img-placeholder ${className ?? ""}`} role="img" aria-label={alt}>
        {label ?? alt}
      </div>
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
    />
  );
}
