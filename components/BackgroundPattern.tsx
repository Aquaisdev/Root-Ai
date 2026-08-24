interface BackgroundPatternProps {
  variant?: "gold" | "circuit";
  className?: string;
}

/**
 * The app's signature visual motif: a traditional jali (lattice screen)
 * pattern whose intersections double as circuit-board nodes — literally
 * fusing "heritage" and "techno" into one mark. Used at low opacity as an
 * ambient background layer across every page.
 */
export default function BackgroundPattern({
  variant = "gold",
  className = "",
}: BackgroundPatternProps) {
  const lineColor = variant === "circuit" ? "#4FD1C5" : "#D4A24C";
  const nodeColor = variant === "circuit" ? "#8CF0E4" : "#F0C374";
  const patternId = `jali-circuit-${variant}`;

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          {/* diamond lattice */}
          <path
            d="M60 0 L120 60 L60 120 L0 60 Z"
            fill="none"
            stroke={lineColor}
            strokeWidth="0.6"
            opacity="0.35"
          />
          <path
            d="M60 0 L60 120 M0 60 L120 60"
            stroke={lineColor}
            strokeWidth="0.3"
            opacity="0.2"
          />
          {/* circuit nodes at intersections */}
          <circle cx="60" cy="0" r="1.6" fill={nodeColor} opacity="0.55" />
          <circle cx="60" cy="120" r="1.6" fill={nodeColor} opacity="0.55" />
          <circle cx="0" cy="60" r="1.6" fill={nodeColor} opacity="0.55" />
          <circle cx="120" cy="60" r="1.6" fill={nodeColor} opacity="0.55" />
          <circle cx="60" cy="60" r="2.2" fill={nodeColor} opacity="0.75" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
