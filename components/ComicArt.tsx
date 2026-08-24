interface ComicArtProps {
  artKey: string;
  className?: string;
}

// Hand-built flat-illustration SVG scenes, one per story beat. Keeping art
// in code (rather than photos) fits a "comic panel" better and means the
// story page never depends on an external image loading.
export default function ComicArt({ artKey, className = "" }: ComicArtProps) {
  const common = "h-full w-full";

  switch (artKey) {
    case "hampi-hero":
    case "founding":
      return (
        <svg viewBox="0 0 400 260" className={`${common} ${className}`}>
          <defs>
            <linearGradient id="sky-founding" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3A2410" />
              <stop offset="100%" stopColor="#12100A" />
            </linearGradient>
          </defs>
          <rect width="400" height="260" fill="url(#sky-founding)" />
          <circle cx="320" cy="60" r="34" fill="#F0C374" opacity="0.85" />
          {[60, 130, 200, 270].map((x, i) => (
            <g key={x}>
              <rect x={x} y={140 - i * 6} width="26" height={110 + i * 6} fill="#7E3A22" opacity="0.9" />
              <polygon
                points={`${x - 6},140 ${x + 13},100 ${x + 32},140`}
                fill="#B5502F"
              />
            </g>
          ))}
          <rect x="0" y="248" width="400" height="12" fill="#0F0B08" />
        </svg>
      );
    case "myth":
      return (
        <svg viewBox="0 0 400 260" className={`${common} ${className}`}>
          <defs>
            <radialGradient id="myth-glow" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#2C7A72" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0F0B08" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="260" fill="#12100A" />
          <rect width="400" height="260" fill="url(#myth-glow)" />
          <circle cx="200" cy="70" r="30" fill="#F3E9DA" opacity="0.9" />
          {[
            [40, 210, 46],
            [110, 230, 60],
            [190, 220, 50],
            [270, 235, 66],
            [340, 215, 44],
          ].map(([cx, cy, r], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r * 0.55} fill="#4A3A29" />
          ))}
          <path
            d="M0 200 Q 200 170 400 205 L400 260 L0 260 Z"
            fill="#1A130E"
          />
        </svg>
      );
    case "golden-age":
      return (
        <svg viewBox="0 0 400 260" className={`${common} ${className}`}>
          <rect width="400" height="260" fill="#1A130E" />
          <circle cx="200" cy="150" r="70" fill="#D4A24C" opacity="0.15" />
          <g transform="translate(120,60)">
            <rect x="60" y="60" width="40" height="120" fill="#9C7530" />
            <polygon points="50,60 80,10 110,60" fill="#F0C374" />
            <rect x="30" y="150" width="100" height="14" fill="#7E3A22" />
          </g>
          {[70, 300].map((x) => (
            <g key={x}>
              <rect x={x} y="120" width="18" height="70" fill="#7E3A22" />
              <polygon points={`${x - 4},120 ${x + 13},95 ${x + 30},120`} fill="#B5502F" />
            </g>
          ))}
          <g fill="#8CF0E4" opacity="0.8">
            <circle cx="90" cy="200" r="3" />
            <circle cx="310" cy="205" r="3" />
            <circle cx="200" cy="230" r="3" />
          </g>
        </svg>
      );
    case "trade":
      return (
        <svg viewBox="0 0 400 260" className={`${common} ${className}`}>
          <rect width="400" height="260" fill="#171009" />
          <g transform="translate(140,110)">
            <circle cx="0" cy="70" r="30" fill="none" stroke="#D4A24C" strokeWidth="6" />
            <circle cx="120" cy="70" r="30" fill="none" stroke="#D4A24C" strokeWidth="6" />
            <rect x="-10" y="20" width="140" height="30" fill="#9C7530" />
            <rect x="30" y="-30" width="60" height="55" fill="#B5502F" />
            <polygon points="30,-30 60,-55 90,-30" fill="#F0C374" />
          </g>
          <path
            d="M20 230 Q 200 210 380 232"
            stroke="#4FD1C5"
            strokeWidth="2"
            strokeDasharray="6 6"
            fill="none"
            opacity="0.6"
          />
        </svg>
      );
    case "fall":
      return (
        <svg viewBox="0 0 400 260" className={`${common} ${className}`}>
          <defs>
            <linearGradient id="fall-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A1B0E" />
              <stop offset="100%" stopColor="#0F0B08" />
            </linearGradient>
          </defs>
          <rect width="400" height="260" fill="url(#fall-sky)" />
          <g opacity="0.85">
            <rect x="80" y="140" width="24" height="90" fill="#3A241A" />
            <rect x="150" y="120" width="24" height="110" fill="#2A1A12" />
            <rect x="230" y="150" width="24" height="80" fill="#3A241A" />
            <rect x="300" y="130" width="24" height="100" fill="#2A1A12" />
          </g>
          <circle cx="200" cy="60" r="26" fill="#B5502F" opacity="0.5" />
          <path d="M0 230 L400 230 L400 260 L0 260 Z" fill="#0F0B08" />
        </svg>
      );
    case "rediscovery":
      return (
        <svg viewBox="0 0 400 260" className={`${common} ${className}`}>
          <defs>
            <linearGradient id="redis-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1F3B2E" />
              <stop offset="100%" stopColor="#0F0B08" />
            </linearGradient>
          </defs>
          <rect width="400" height="260" fill="url(#redis-sky)" />
          <circle cx="200" cy="70" r="30" fill="#F0C374" />
          <rect x="150" y="150" width="24" height="80" fill="#4A3A29" />
          <rect x="220" y="160" width="24" height="70" fill="#4A3A29" />
          <path
            d="M100 230 Q 130 190 160 230"
            stroke="#4FD1C5"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M260 230 Q 290 180 320 230"
            stroke="#4FD1C5"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 400 260" className={`${common} ${className}`}>
          <rect width="400" height="260" fill="#1A130E" />
        </svg>
      );
  }
}
