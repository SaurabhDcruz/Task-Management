import React from 'react';

function Modal({ title, description, confirmLabel, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="card w-full max-w-md p-6 space-y-6">
        <div>
          <h2 id="modal-title" className="section-title">
            {title}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">{description}</p>
        </div>
        <div className="flex items-center justify-end gap-3">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn-danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
