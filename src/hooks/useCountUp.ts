"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end:        number;
  duration?:  number;   /* ms — default 1800 */
  start?:     number;   /* default 0 */
  decimals?:  number;   /* decimal places — default 0 */
  trigger?:   boolean;  /* start counting when true */
}

/* Ease-out cubic — decelerates into final value */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useCountUp({
  end,
  duration  = 1800,
  start     = 0,
  decimals  = 0,
  trigger   = false,
}: UseCountUpOptions) {
  const [value, setValue]       = useState(start);
  const animationRef            = useRef<number | null>(null);
  const startTimeRef            = useRef<number | null>(null);
  const hasTriggeredRef         = useRef(false);

  useEffect(() => {
    if (!trigger || hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed  = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutCubic(progress);
      const current  = start + (end - start) * eased;

      setValue(parseFloat(current.toFixed(decimals)));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [trigger, end, start, duration, decimals]);

  return value;
}
