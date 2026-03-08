'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
    id: string;
    type: ToastType;
    message: string;
}

interface ToastProps {
    toast: ToastMessage;
    onClose: (id: string) => void;
}

export function Toast({ toast, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(toast.id);
        }, 5000);
        return () => clearTimeout(timer);
    }, [toast.id, onClose]);

    const icons = {
        success: <CheckCircle2 size={20} className="text-calm" />,
        error: <AlertCircle size={20} className="text-danger" />,
        info: <Info size={20} className="text-warning" />,
    };

    const borders = {
        success: 'border-calm/20',
        error: 'border-danger/20',
        info: 'border-warning/20',
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`glass flex items-center gap-4 p-4 rounded-2xl border ${borders[toast.type]} shadow-2xl min-w-[300px] pointer-events-auto`}
        >
            <div className="shrink-0">{icons[toast.type]}</div>
            <p className="text-sm font-medium text-white/90 grow">{toast.message}</p>
            <button
                onClick={() => onClose(toast.id)}
                className="p-1 rounded-full hover:bg-white/10 text-white/30 hover:text-white transition-colors"
            >
                <X size={16} />
            </button>
        </motion.div>
    );
}

interface ToastContainerProps {
    toasts: ToastMessage[];
    onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-100 flex flex-col gap-3 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <Toast key={toast.id} toast={toast} onClose={onClose} />
                ))}
            </AnimatePresence>
        </div>
    );
}
