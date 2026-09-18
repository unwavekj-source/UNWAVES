import markAsset from "@/assets/unwaves-mark.png.asset.json";
import { BRAND } from "@/data/site";

type BrandLogoProps = {
  className?: string;
};

/** The UNWAVES wave mark, straight from the brand sheet. */
export function BrandMark({ className = "h-8 w-8" }: BrandLogoProps) {
  return (
    <img
      src={markAsset.url}
      alt=""
      aria-hidden
      loading="eager"
      decoding="async"
      className={`${className} object-contain wave-glow`}
    />
  );
}

/** UNWAVES wordmark: "UN" in white, "WAVES" carrying the brand gradient. */
export function BrandWordmark({ className = "text-sm" }: BrandLogoProps) {
  const name = BRAND.name;
  const head = name.slice(0, 2);
  const tail = name.slice(2);

  return (
    <span
      className={`brand-wordmark tracking-[0.14em] ${className}`}
    >
      <span className="text-white">{head}</span>
      <span className="text-gradient">{tail}</span>
    </span>
  );
}
