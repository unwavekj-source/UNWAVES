import { useQuery } from "@tanstack/react-query";
import { signedUrlQuery } from "@/lib/festival-api";
import { FileText, Music, Image as ImageIcon, Film } from "lucide-react";

export function MediaThumb({
  path,
  kind,
  className = "",
}: {
  path: string | null;
  kind: string;
  className?: string;
}) {
  const { data: url } = useQuery(signedUrlQuery(path));

  if (!path || !url) {
    const Icon = kind === "video" ? Film : kind === "audio" ? Music : kind === "text" ? FileText : ImageIcon;
    return (
      <div className={`grid place-items-center bg-secondary/50 ${className}`}>
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  if (kind === "video") {
    return <video src={url} controls playsInline className={`bg-black object-cover ${className}`} />;
  }
  if (kind === "audio") {
    return (
      <div className={`grid place-items-center bg-secondary/50 p-4 ${className}`}>
        <audio src={url} controls className="w-full" />
      </div>
    );
  }
  if (kind === "file" || kind === "text") {
    return (
      <a href={url} target="_blank" rel="noreferrer" className={`grid place-items-center bg-secondary/50 ${className}`}>
        <FileText className="h-8 w-8 text-festival-gold" />
      </a>
    );
  }
  return <img src={url} alt="" loading="lazy" className={`object-cover ${className}`} />;
}
