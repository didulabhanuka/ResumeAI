export default function LoadingDots({ text = 'Analysing' }) {
  return (
    <div className="flex items-center gap-2 text-gray-500 text-sm">
      <span>{text}</span>
      <span className="flex gap-1">
        <span
          className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: '300ms' }}
        />
      </span>
    </div>
  );
}