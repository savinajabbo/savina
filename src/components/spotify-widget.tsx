const SPOTIFY_EMBED_URL =
  "https://open.spotify.com/embed/playlist/37i9dQZF1EpliuwgH22Z4b?utm_source=generator&theme=0";

export function SpotifyWidget() {
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[340px] overflow-hidden rounded-2xl border border-foreground/10 bg-white/95 shadow-xl backdrop-blur sm:w-[380px]">
      <iframe
        title="Spotify playlist"
        src={SPOTIFY_EMBED_URL}
        width="100%"
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-2xl"
      />
    </div>
  );
}
