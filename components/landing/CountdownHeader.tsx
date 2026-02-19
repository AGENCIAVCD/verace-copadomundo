'use client';

import { Clock3 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type CountdownHeaderProps = {
  promoEndDate: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function calculateTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const distance = target - now;

      if (distance <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
      }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    expired: false,
  };
}

function pad(value: number) {
  return value.toString().padStart(2, '0');
}

export function CountdownHeader({ promoEndDate }: CountdownHeaderProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(promoEndDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(promoEndDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [promoEndDate]);

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'America/Sao_Paulo',
    }).format(new Date(promoEndDate));
  }, [promoEndDate]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#A3853F]/20 bg-[#140C0F]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2.5 sm:px-6 sm:py-3">
        <Clock3 className="h-4 w-4 shrink-0 text-[#D8B768]" />
        <p className="truncate text-sm text-[#E6D9C5]">
          Final da Copa: {formattedDate} • {timeLeft.expired ? 'Promoção encerrada' : `${pad(timeLeft.days)}d ${pad(timeLeft.hours)}h ${pad(timeLeft.minutes)}m`}
        </p>
      </div>
    </header>
  );
}
