'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    eventName: string;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, eventName }: DeleteConfirmModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="glass relative w-full max-w-md p-8 rounded-4xl shadow-2xl border-danger/20"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-danger/10 flex items-center justify-center text-danger">
                                <AlertTriangle size={24} />
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-2 mb-8">
                            <h2 className="text-2xl font-bold tracking-tight text-white">Delete Event?</h2>
                            <p className="text-white/50 leading-relaxed">
                                Are you sure you want to delete <span className="text-white font-semibold">"{eventName}"</span>? This action cannot be undone.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 px-6 py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className="flex-1 px-6 py-4 rounded-2xl bg-danger text-white font-bold hover:bg-danger/80 active:scale-[0.98] transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
