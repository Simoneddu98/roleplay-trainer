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
            <span className="text-sm font-medium text-slate-400">{label}</span>
          )}
          <span className="text-sm font-semibold text-violet-400 ml-auto">
            {Math.round(clampedValue)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-white/[0.06] rounded-full overflow-hidden ${barHeight}`}>
        <div
          className={`${barHeight} bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
