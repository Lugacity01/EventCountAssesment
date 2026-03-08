import { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, parseISO, isBefore } from 'date-fns';
import { TimeRemaining, UrgencyLevel, URGENCY_LEVELS } from '../types';

export const useCountdown = (targetDateString: string, createdAtString: string) => {
    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isOver: false,
    });
    const [progress, setProgress] = useState(1); 
    useEffect(() => {
        const calculateTime = () => {
            const targetDate = parseISO(targetDateString);
            const createdAt = parseISO(createdAtString);
            const now = new Date();

            if (isBefore(targetDate, now)) {
                setTimeRemaining({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    isOver: true,
                });
                setProgress(0);
                return;
            }

            const totalDuration = targetDate.getTime() - createdAt.getTime();
            const remainingDuration = targetDate.getTime() - now.getTime();
            const newProgress = Math.max(0, Math.min(1, remainingDuration / totalDuration));
            setProgress(parseFloat(newProgress.toFixed(4)));

            const days = differenceInDays(targetDate, now);
            const hours = differenceInHours(targetDate, now) % 24;
            const minutes = differenceInMinutes(targetDate, now) % 60;
            const seconds = differenceInSeconds(targetDate, now) % 60;

            setTimeRemaining({
                days,
                hours,
                minutes,
                seconds,
                isOver: false,
            });
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000);

        return () => clearInterval(interval);
    }, [targetDateString]);

    const getUrgencyLevel = (): UrgencyLevel => {
        const targetDate = parseISO(targetDateString);
        const now = new Date();
        const diffInHours = differenceInHours(targetDate, now);

        if (diffInHours < 24) return URGENCY_LEVELS.DANGER;
        if (diffInHours < 24 * 7) return URGENCY_LEVELS.WARNING;
        return URGENCY_LEVELS.CALM;
    };

    return { timeRemaining, urgencyLevel: getUrgencyLevel(), progress };
};
