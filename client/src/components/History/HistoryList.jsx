import HistoryItem from './HistoryItem';

export default function HistoryList({ items, type, onDelete, onSelect }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">{type === 'screening' ? '📋' : '✉️'}</p>
        <p className="text-sm">No {type === 'screening' ? 'screenings' : 'cover letters'} yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <HistoryItem
          key={item._id}
          item={item}
          type={type}
          onDelete={onDelete}
          onClick={() => onSelect(item)}
        />
      ))}
    </div>
  );
}