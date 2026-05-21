"use client";

import { useRef, useCallback, useEffect, useState } from "react";

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
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const pct = ((value - min) / (max - min)) * 100;

  // Snap value to step
  const snapToStep = useCallback(
    (raw: number) => {
      const clamped = Math.min(max, Math.max(min, raw));
      return Math.round(clamped / step) * step;
    },
    [min, max, step]
  );

  // Get value from cursor position
  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return value;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      return snapToStep(min + ratio * (max - min));
    },
    [min, max, value, snapToStep]
  );

  // Mouse/Touch handlers
  const handleStart = useCallback(
    (clientX: number) => {
      setIsDragging(true);
      onChange(getValueFromPosition(clientX));
    },
    [onChange, getValueFromPosition]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      onChange(getValueFromPosition(clientX));
    };

    const handleEnd = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMove, { passive: false });
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, onChange, getValueFromPosition]);

  // Keyboard support
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let newVal = value;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") newVal = value + step;
      else if (e.key === "ArrowLeft" || e.key === "ArrowDown") newVal = value - step;
      else return;
      e.preventDefault();
      onChange(snapToStep(newVal));
    },
    [value, step, onChange, snapToStep]
  );

  return (
    <div>
      {/* Label + value badge */}
      <div className="flex items-center justify-between mb-2">
        <label
          className="text-sm font-semibold"
          style={{ color: "#1B3A6B" }}
        >
          {label}
        </label>
        <div
          className="px-4 py-2 rounded-xl font-heading font-bold text-sm"
          style={{
            backgroundColor: "#1B3A6B",
            color: "#C9A84C",
            minWidth: "80px",
            textAlign: "center",
          }}
        >
          {display}
        </div>
      </div>

      {hint && (
        <p className="text-xs mb-2" style={{ color: "#9CA3AF" }}>
          {hint}
        </p>
      )}

      {/* Custom slider track */}
      <div
        ref={trackRef}
        className="relative select-none"
        style={{
          height: "44px",
          cursor: isDragging ? "grabbing" : "pointer",
          touchAction: "none",
        }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      >
        {/* Track background (unfilled) */}
        <div
          className="absolute rounded-full"
          style={{
            top: "50%",
            left: 0,
            right: 0,
            height: "8px",
            transform: "translateY(-50%)",
            backgroundColor: "#E2E8F0",
          }}
        />

        {/* Track filled portion */}
        <div
          className="absolute rounded-full"
          style={{
            top: "50%",
            left: 0,
            width: `${pct}%`,
            height: "8px",
            transform: "translateY(-50%)",
            background: "linear-gradient(90deg, #1B3A6B 0%, #2A5298 100%)",
            transition: isDragging ? "none" : "width 0.15s ease",
          }}
        />

        {/* Thumb */}
        <div
          role="slider"
          tabIndex={0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={label}
          onKeyDown={handleKeyDown}
          className="absolute"
          style={{
            top: "50%",
            left: `${pct}%`,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "#FFFFFF",
            border: "3px solid #C9A84C",
            boxShadow: isDragging
              ? "0 0 0 6px rgba(201,168,76,0.2), 0 4px 12px rgba(0,0,0,0.2)"
              : "0 2px 8px rgba(0,0,0,0.18)",
            transform: "translate(-50%, -50%)",
            cursor: isDragging ? "grabbing" : "grab",
            transition: isDragging ? "box-shadow 0.15s ease" : "left 0.15s ease, box-shadow 0.15s ease",
            zIndex: 2,
            outline: "none",
          }}
        />
      </div>

      {/* Min / Max labels */}
      <div
        className="flex justify-between text-xs font-medium"
        style={{ color: "#94A3B8", marginTop: "-4px" }}
      >
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
