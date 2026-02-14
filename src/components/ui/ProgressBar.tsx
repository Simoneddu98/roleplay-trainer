interface ProgressBarProps {
  value: number;
  label?: string;
  size?: 'sm' | 'md';
}

export default function ProgressBar({ value, label, size = 'md' }: ProgressBarProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const barHeight = size === 'sm' ? 'h-2' : 'h-3';

  return (
    <div className="w-full">
      {(label || true) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-sm font-medium text-slate-700">{label}</span>
          )}
          <span className="text-sm font-semibold text-indigo-600 ml-auto">
            {Math.round(clampedValue)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${barHeight}`}>
        <div
          className={`${barHeight} bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
