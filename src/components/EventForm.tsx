'use client';

import { useState, useEffect } from 'react';
import { CountdownEvent } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Calendar, Type, AlignLeft } from 'lucide-react';

interface EventFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (event: Omit<CountdownEvent, 'id' | 'createdAt'>) => void;
    initialData?: CountdownEvent | null;
}

export function EventForm({ isOpen, onClose, onSubmit, initialData }: EventFormProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setDescription(initialData.description || '');
            setTargetDate(initialData.targetDate.slice(0, 16)); // Format for datetime-local
        } else {
            setName('');
            setDescription('');
            setTargetDate('');
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !targetDate) return;

        onSubmit({
            name,
            description,
            targetDate: new Date(targetDate).toISOString(),
        });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="glass relative w-full max-w-lg p-8 rounded-4xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                                <Plus className="text-calm" size={24} />
                                {initialData ? 'Edit Event' : 'New Event'}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-1">
                                    Event Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-calm transition-colors">
                                        <Type size={18} />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Birthday Party"
                                        className="w-full bg-white/5 border border-white/10 focus:border-calm/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-1">
                                    Date & Time
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-calm transition-colors">
                                        <Calendar size={18} />
                                    </div>
                                    <input
                                        required
                                        type="datetime-local"
                                        value={targetDate}
                                        onChange={(e) => setTargetDate(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 focus:border-calm/50 rounded-2xl py-4 pl-12 pr-4 text-white outline-none transition-all scheme-dark"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-1">
                                    Description (Optional)
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-4 text-white/30 group-focus-within:text-calm transition-colors">
                                        <AlignLeft size={18} />
                                    </div>
                                    <textarea
                                        rows={3}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Short description..."
                                        className="w-full bg-white/5 border border-white/10 focus:border-calm/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-neutral-200 active:scale-[0.98] transition-all mt-4"
                            >
                                {initialData ? 'Update Event' : 'Create Event'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
