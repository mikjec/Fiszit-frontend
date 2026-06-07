import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 shadow-xl text-emerald-800 text-sm font-medium animate-[slideIn_0.25s_ease-out]">
      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-1 text-emerald-400 hover:text-emerald-600 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
