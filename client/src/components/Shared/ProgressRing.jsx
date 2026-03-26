export default function ProgressRing({ score }) {
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;

  const color =
    score >= 70 ? '#065F46' : score >= 40 ? '#B45309' : '#991B1B';

  const bgColor =
    score >= 70 ? '#D1FAE5' : score >= 40 ? '#FEF3C7' : '#FEE2E2';

  const label =
    score >= 70 ? 'Strong Match' : score >= 40 ? 'Partial Match' : 'Weak Match';

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="140" height="140">
        {/* Background circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill={bgColor}
          stroke="#E2E8F0"
          strokeWidth="12"
        />
        {/* Progress circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        {/* Score text */}
        <text
          x="70"
          y="68"
          textAnchor="middle"
          fontSize="28"
          fontWeight="bold"
          fill={color}
        >
          {score}
        </text>
        {/* Percent sign */}
        <text
          x="70"
          y="86"
          textAnchor="middle"
          fontSize="11"
          fill={color}
          opacity="0.8"
        >
          out of 100
        </text>
      </svg>
      <span
        className="text-xs font-semibold px-3 py-1 rounded-full"
        style={{ backgroundColor: bgColor, color }}
      >
        {label}
      </span>
    </div>
  );
}