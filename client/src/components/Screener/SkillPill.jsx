export default function SkillPill({ text, variant = 'default' }) {
  const styles = {
    strength: 'bg-green-50 text-green-700 border border-green-200',
    gap: 'bg-amber-50 text-amber-700 border border-amber-200',
    flag: 'bg-red-50 text-red-700 border border-red-200',
    default: 'bg-gray-100 text-gray-600 border border-gray-200',
  };

  return (
    <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${styles[variant]}`}>
      {text}
    </span>
  );
}