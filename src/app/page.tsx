'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CountdownEvent } from '@/types';
import { CountdownCard } from '@/components/CountdownCard';
import { EventForm } from '@/components/EventForm';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { ToastContainer, ToastMessage } from '@/components/Toast';
import { Plus, Timer, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const [events, setEvents, isLoaded] = useLocalStorage<CountdownEvent[]>('events-collection', []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CountdownEvent | null>(null);

  // Delete Confirmation State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<CountdownEvent | null>(null);

  // Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 11);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddEvent = (data: Omit<CountdownEvent, 'id' | 'createdAt'>) => {
    const newEvent: CountdownEvent = {
      ...data,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
    };
    setEvents([...events, newEvent]);
    addToast(`"${data.name}" added to your collection!`);
  };

  const handleUpdateEvent = (data: Omit<CountdownEvent, 'id' | 'createdAt'>) => {
    if (!editingEvent) return;
    const updatedEvents = events.map((event) =>
      event.id === editingEvent.id ? { ...event, ...data } : event
    );
    setEvents(updatedEvents);
    setEditingEvent(null);
    addToast(`Changes to "${data.name}" saved.`);
  };

  const handleDeleteClick = (id: string) => {
    const event = events.find((e) => e.id === id);
    if (event) {
      setEventToDelete(event);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = () => {
    if (eventToDelete) {
      setEvents(events.filter((event) => event.id !== eventToDelete.id));
      addToast(`"${eventToDelete.name}" removed.`, 'info');
      setEventToDelete(null);
      setIsDeleteModalOpen(false); // Close modal after deletion
    }
  };

  const handleEditClick = (event: CountdownEvent) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const sortedEvents = [...events].sort((a, b) =>
    new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
  );

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white/20 border-r-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <main className="p-6 md:p-12 lg:p-24 max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-white/40 mb-2">
              <Timer size={20} className="text-calm" />
              <span className="text-xs font-bold uppercase tracking-[0.3em]">Momentum</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
              Your Time. <span className="text-white/30 italic">Curated.</span>
            </h1>
          </div>

          <button
            onClick={() => {
              setEditingEvent(null);
              setIsFormOpen(true);
            }}
            className="glass group relative flex items-center gap-3 px-8 py-4 rounded-2xl hover:bg-white/10 transition-all overflow-hidden"
          >
            <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-calm via-warning to-danger transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            <span className="font-bold tracking-tight">Add New Countdown</span>
          </button>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {sortedEvents.map((event) => (
              <CountdownCard
                key={event.id}
                event={event}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-20 flex flex-col items-center text-center space-y-6 max-w-md mx-auto"
          >
            <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-4">
              <Sparkles size={40} className="text-white/20 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">No countdowns yet</h2>
              <p className="text-white/40 leading-relaxed">
                Every second matters. Start tracking your important moments, deadlines, or life goals.
              </p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="text-calm font-bold border-b-2 border-calm/20 hover:border-calm transition-all pb-1 mt-4"
            >
              Create your first event
            </button>
          </motion.div>
        )}

        {/* Form Modal */}
        <EventForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingEvent(null);
          }}
          onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent}
          initialData={editingEvent}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setEventToDelete(null);
          }}
          onConfirm={confirmDelete}
          eventName={eventToDelete?.name || ''}
        />

        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} onClose={removeToast} />

        <footer className="mt-24 pt-12 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs font-medium uppercase tracking-[0.2em]">
            Countdown to what matters most &copy; 2026.
          </p>
        </footer>
      </main>
    </div>
  );
}
