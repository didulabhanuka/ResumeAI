const recommendationColors = {
  STRONG_YES: 'bg-green-100 text-green-700',
  INTERVIEW: 'bg-blue-100 text-blue-700',
  MAYBE: 'bg-amber-100 text-amber-700',
  REJECT: 'bg-red-100 text-red-700',
};

export default function HistoryItem({ item, type, onDelete, onClick }) {
  const isScreening = type === 'screening';

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
    >
      {/* Left */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {item.jobTitle}
          </h3>
          {isScreening && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${recommendationColors[item.recommendation]}`}>
              {item.recommendation.replace('_', ' ')}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>{item.companyName}</span>
          <span>·</span>
          <span>{formatDate(item.createdAt)}</span>
          {isScreening && (
            <>
              <span>·</span>
              <span className="font-medium text-gray-600">{item.matchScore}% match</span>
            </>
          )}
          {!isScreening && (
            <>
              <span>·</span>
              <span>{item.wordCount} words</span>
              <span>·</span>
              <span className="capitalize">{item.tone}</span>
            </>
          )}
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item._id);
        }}
        className="ml-4 text-gray-300 hover:text-red-500 transition-colors text-lg shrink-0"
      >
        ✕
      </button>
    </div>
  );
}