import { useState } from 'react';
import { useHistory } from '../hooks/useHistory';
import HistoryList from '../components/History/HistoryList';
import ScoreCard from '../components/Screener/ScoreCard';
import { getScreeningById, getCoverLetterById } from '../api/history.api';

export default function HistoryPage() {
  const { screenings, coverLetters, loading, error, removeScreening, removeCoverLetter } = useHistory();
  const [activeTab, setActiveTab] = useState('screenings');
  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const handleSelectScreening = async (item) => {
    setDetailLoading(true);
    try {
      const res = await getScreeningById(item._id);
      setSelected({ type: 'screening', data: res.data.data });
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSelectCoverLetter = async (item) => {
    setDetailLoading(true);
    try {
      const res = await getCoverLetterById(item._id);
      setSelected({ type: 'coverLetter', data: res.data.data });
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">History</h1>
        <p className="text-gray-500 text-sm mt-1">
          Your past screenings and cover letters.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl border border-gray-200 overflow-hidden w-fit">
        <button
          onClick={() => { setActiveTab('screenings'); setSelected(null); }}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            activeTab === 'screenings'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-500 hover:text-gray-700'
          }`}
        >
          Screenings
        </button>
        <button
          onClick={() => { setActiveTab('coverLetters'); setSelected(null); }}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            activeTab === 'coverLetters'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-500 hover:text-gray-700'
          }`}
        >
          Cover Letters
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-center py-16 text-gray-400 text-sm">Loading...</div>
      ) : (
        <>
          {/* List */}
          {activeTab === 'screenings' && (
            <HistoryList
              items={screenings}
              type="screening"
              onDelete={removeScreening}
              onSelect={handleSelectScreening}
            />
          )}
          {activeTab === 'coverLetters' && (
            <HistoryList
              items={coverLetters}
              type="coverLetter"
              onDelete={removeCoverLetter}
              onSelect={handleSelectCoverLetter}
            />
          )}
        </>
      )}

      {/* Detail view */}
      {detailLoading && (
        <div className="text-center py-8 text-gray-400 text-sm">Loading detail...</div>
      )}

      {selected && !detailLoading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Detail View</h2>
            <button
              onClick={() => setSelected(null)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              ✕ Close
            </button>
          </div>

          {/* Screening detail */}
          {selected.type === 'screening' && (
            <ScoreCard result={selected.data} />
          )}

          {/* Cover letter detail */}
          {selected.type === 'coverLetter' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{selected.data.jobTitle}</h3>
                  <p className="text-xs text-gray-400">{selected.data.companyName}</p>
                </div>
                <span className="text-xs text-gray-400 capitalize">
                  {selected.data.tone} · {selected.data.length} · {selected.data.wordCount} words
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-serif">
                {selected.data.generatedLetter}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}