import { useState } from 'react';
import ProgressRing from '../Shared/ProgressRing';
import SkillPill from './SkillPill';

const recommendationConfig = {
  STRONG_YES: { label: 'Strong Yes', style: 'bg-green-600 text-white' },
  INTERVIEW: { label: 'Interview', style: 'bg-blue-600 text-white' },
  MAYBE: { label: 'Maybe', style: 'bg-amber-500 text-white' },
  REJECT: { label: 'Reject', style: 'bg-red-600 text-white' },
};

const Section = ({ title, items, variant, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  if (!items || items.length === 0) return null;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-gray-700">{title}</span>
        <span className="text-gray-400 text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-4 py-3 flex flex-wrap gap-2">
          {items.map((item, i) => (
            <SkillPill key={i} text={item} variant={variant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function ScoreCard({ result }) {
  const rec = recommendationConfig[result.recommendation] || recommendationConfig.MAYBE;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">

      {/* Top — score + meta */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <ProgressRing score={result.matchScore} />
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start mb-2">
            <h2 className="text-lg font-bold text-gray-900">
              {result.jobTitle}
            </h2>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${rec.style}`}>
              {rec.label}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">{result.companyName}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{result.summary}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        <Section
          title={`✓ Strengths (${result.strengths.length})`}
          items={result.strengths}
          variant="strength"
          defaultOpen={true}
        />
        <Section
          title={`△ Gaps (${result.gaps.length})`}
          items={result.gaps}
          variant="gap"
          defaultOpen={true}
        />
        <Section
          title={`⚠ Red Flags (${result.redFlags.length})`}
          items={result.redFlags}
          variant="flag"
          defaultOpen={true}
        />
      </div>

    </div>
  );
}