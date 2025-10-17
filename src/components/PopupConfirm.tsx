import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  heading: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
};

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  heading,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[9999]">
      <div 
        className="bg-[var(--background)] rounded-xl shadow-2xl w-[400px] p-6 relative animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text)] hover:text-[var(--text-head)] transition-colors"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 
          id="confirm-modal-title"
          className="text-lg font-semibold text-[var(--text-head)] text-center"
        >
          {heading}
        </h2>

        {/* Description */}
        <p 
          id="confirm-modal-description"
          className="text-sm text-[var(--text)] text-center mt-2"
        >
          {description}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={onClose}
            variant="border"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant="brand"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );

  // Render modal using portal to ensure it's at the document root
  return createPortal(modalContent, document.body);
}
