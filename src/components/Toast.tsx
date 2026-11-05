import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useGameStore } from '../store/gameStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useGameStore();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[400px] px-4 pointer-events-none flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const icons = {
            success: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
            warning: <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />,
            error: <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />,
            info: <Info className="w-4 h-4 text-teal-500 shrink-0" />,
          }[toast.type || 'info'];

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              className="pointer-events-auto bg-slate-900/95 backdrop-blur-md text-white text-xs font-medium py-2.5 px-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-2.5 border border-white/10"
            >
              <div className="flex items-center gap-2">
                {icons}
                <span>{toast.message}</span>
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
