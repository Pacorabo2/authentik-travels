'use client';

export default function HeroVideo({ videoUrl }: { videoUrl: string }) {
  return (
    <div className="absolute inset-0 h-full w-full bg-black">
      <video
        key={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
        style={{ opacity: 0.7 }}
      >
        <source src={videoUrl} type="video/mp4" />
        {/* Si la vidéo échoue, on verra le fond noir */}
      </video>
    </div>
  );
}