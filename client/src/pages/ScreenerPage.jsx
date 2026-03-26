import { useState } from 'react';
import ScreenerForm from '../components/Screener/ScreenerForm';
import ScoreCard from '../components/Screener/ScoreCard';
import { useScreener } from '../hooks/useScreener';

export default function ScreenerPage() {
  const { result, loading, error, screen } = useScreener();

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Resume Screener</h1>
        <p className="text-gray-500 text-sm mt-1">
          Paste a job description and your resume to get an AI-powered match analysis.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <ScreenerForm onSubmit={screen} loading={loading} />
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Result */}
      {result && <ScoreCard result={result} />}

    </div>
  );
}