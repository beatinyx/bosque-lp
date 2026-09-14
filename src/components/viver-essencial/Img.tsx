import { useEffect, useRef, useState } from "react";

type ImgProps = {
  src: string;
  alt: string;
  className?: string;
  /** Texto exibido no placeholder enquanto o arquivo real não existe. */
  label?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

/**
 * Imagem com fallback: enquanto o arquivo real não existe em /public/images,
 * mostra um placeholder listrado com o nome esperado do arquivo.
 * Basta soltar a imagem com o mesmo caminho em `src` para ela aparecer.
 */
export function Img({ src, alt, className, label, loading = "lazy", fetchPriority }: ImgProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // Com SSR a imagem pode falhar antes da hidratação, e nesse caso o onError
  // nunca dispara. Conferimos o estado real do elemento ao montar.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed || !src) {
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
