'use client';

import { useCountdown } from '@/hooks/useCountdown';
import { CountdownEvent, URGENCY_LEVELS } from '@/types';
import { motion } from 'framer-motion';
import { Trash2, Edit3, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CountdownCardProps {
    event: CountdownEvent;
    onEdit: (event: CountdownEvent) => void;
    onDelete: (id: string) => void;
}

export function CountdownCard({ event, onEdit, onDelete }: CountdownCardProps) {
    const { timeRemaining, urgencyLevel, progress } = useCountdown(event.targetDate, event.createdAt);

    const getUrgencyStyles = () => {
        if (timeRemaining.isOver) return 'border-white/10 shadow-none grayscale-[0.5]';
        switch (urgencyLevel) {
            case URGENCY_LEVELS.DANGER:
                return 'border-danger/30 shadow-[0_0_20px_rgba(239,68,68,0.1)] animate-pulse-danger';
            case URGENCY_LEVELS.WARNING:
                return 'border-warning/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]';
            default:
                return 'border-calm/30 shadow-[0_0_20px_rgba(16,185,129,0.1)] animate-breathing';
        }
    };

    const getUrgencyColor = () => {
        if (timeRemaining.isOver) return 'text-white/20';
        switch (urgencyLevel) {
            case URGENCY_LEVELS.DANGER: return 'text-danger';
            case URGENCY_LEVELS.WARNING: return 'text-warning';
            default: return 'text-calm';
        }
    };

    const radius = 45;
    const circumference = 2 * Math.PI * radius;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -5 }}
            className={cn(
                'glass group relative flex flex-col p-6 rounded-3xl transition-all duration-500 overflow-hidden',
                getUrgencyStyles()
            )}
        >
            <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                    <h3 className="text-xl font-semibold tracking-tight text-white group-hover:text-white/90">
                        {event.name}
                    </h3>
                    {event.description && (
                        <p className="text-sm text-white/50 line-clamp-1">{event.description}</p>
                    )}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(event)}
                        className="p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                    >
                        <Edit3 size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(event.id)}
                        className="p-2 rounded-full hover:bg-danger/20 text-white/40 hover:text-danger transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center py-4 relative">
                {/* Circular Progress Ring */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90 transform">
                        <circle
                            cx="64"
                            cy="64"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-white/5"
                        />
                        {!timeRemaining.isOver && (
                            <motion.circle
                                cx="64"
                                cy="64"
                                r={radius}
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                strokeDasharray={circumference}
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset: circumference * (1 - progress) }}
                                transition={{ duration: 1, ease: "linear" }}
                                className={getUrgencyColor()}
                            />
                        )}
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {timeRemaining.isOver ? (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center"
                            >
                                <CheckCircle2 size={32} className="text-white/40 mb-1" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Passed</span>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <span className={cn('text-3xl font-bold font-mono tracking-tighter', getUrgencyColor())}>
                                    {timeRemaining.days > 0 ? timeRemaining.days : timeRemaining.hours}
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-white/30 font-medium">
                                    {timeRemaining.days > 0 ? 'Days' : 'Hours'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {!timeRemaining.isOver ? (
                <div className="grid grid-cols-4 gap-2 mt-6 mb-2">
                    {[
                        { label: 'D', value: timeRemaining.days },
                        { label: 'H', value: timeRemaining.hours },
                        { label: 'M', value: timeRemaining.minutes },
                        { label: 'S', value: timeRemaining.seconds },
                    ].map((unit) => (
                        <div key={unit.label} className="flex flex-col items-center glass py-2 rounded-xl border-white/5">
                            <span className={cn('text-lg font-bold font-mono tracking-tighter', getUrgencyColor())}>
                                {unit.value.toString().padStart(2, '0')}
                            </span>
                            <span className="text-[8px] uppercase tracking-widest text-white/20 font-medium">
                                {unit.label}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-8 mb-4 py-3 px-4 glass rounded-2xl flex items-center justify-center border-white/5">
                    <span className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px]">Event Archive</span>
                </div>
            )}

            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40 font-medium">
                <div className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {new Date(event.targetDate).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </div>
                <div className="flex items-center gap-1.5 uppercase tracking-wider">
                    <Clock size={12} />
                    {new Date(event.targetDate).toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </div>
            </div>
        </motion.div>
    );
}
