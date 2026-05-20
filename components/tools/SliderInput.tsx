"use client";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  display: string;
  minLabel: string;
  maxLabel: string;
  hint?: string;
}

export function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  display,
  minLabel,
  maxLabel,
  hint,
}: SliderInputProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium" style={{ color: "#374151" }}>
          {label}
        </label>
        <div
          className="px-3 py-1.5 rounded-lg font-heading font-bold text-sm"
          style={{ backgroundColor: "#EEF2F8", color: "#1B3A6B" }}
        >
          {display}
        </div>
      </div>

      {hint && (
        <p className="text-xs mb-2" style={{ color: "#9CA3AF" }}>
          {hint}
        </p>
      )}

      {/* Slider — track filled via inline linear-gradient (Chrome/Edge/Safari)
          Firefox filled portion handled by ::-moz-range-progress in globals.css */}
      <input
        type="range"
        className="ram-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, #1B3A6B ${pct}%, #E5E7EB ${pct}%)`,
        }}
      />

      <div className="flex justify-between text-xs mt-1.5" style={{ color: "#9CA3AF" }}>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
