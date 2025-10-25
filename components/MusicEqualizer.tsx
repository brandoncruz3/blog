export default function MusicEqualizer() {
  return (
    <div className="flex h-3 w-4 items-center gap-0.75">
      <span className="bg-spotify-green motion-safe:animate-shrink h-3 w-0.75 rounded-sm" />
      <span className="bg-spotify-green motion-safe:animate-expand h-1.5 w-0.75 rounded-sm" />
      <span className="bg-spotify-green motion-safe:animate-shrink h-3 w-0.75 rounded-sm" />
    </div>
  )
}
