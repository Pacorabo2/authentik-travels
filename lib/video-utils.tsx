/**
 * Transforme une URL de visionnage (Vimeo ou YouTube)
 * en URL d'intégration (Embed) optimisée pour un Hero Background.
 */
export const getEmbedVideoUrl = (
  url: string | null | undefined,
): string | null => {
  if (!url) return null;

  // Cas VIMEO
  if (url.includes("vimeo.com")) {
    const vimeoId = url.split("/").pop()?.split("?")[0];
    // Paramètres : background=1 (auto, mute, loop, pas de contrôles)
    return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1&badge=0&autopause=0&player_id=0&app_id=58479`;
  }

  // Cas YOUTUBE
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const ytId = url.includes("watch?v=")
      ? url.split("v=")[1].split("&")[0]
      : url.split("/").pop();
    return `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1`;
  }

  return url;
};
