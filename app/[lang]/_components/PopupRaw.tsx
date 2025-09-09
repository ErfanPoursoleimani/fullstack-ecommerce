// components/Popup.tsx
'use client'
import React from 'react';
import { X } from 'lucide-react';
import { usePopup, useConfirmationPopup, useAlertPopup } from '@/app/hooks/usePopup';
import useDataStore from '@/app/stores/dataStore';

interface PopupProps {
  children: React.ReactNode;
  popup: ReturnType<typeof usePopup>;
  className: string
}

const Popup: React.FC<PopupProps> = ({ children, popup, className }) => {
  const { isRTL } = useDataStore()
  
  if (!popup.isOpen) return null;

  return (
    <div
      className={`${className} fixed w-full h-full top-0 flex justify-center items-center bg-[#000000b2]`}
      onClick={popup.handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={popup.config.title ? 'popup-title' : undefined}
    >
      <div
        ref={popup.popupRef}
        className={`
          relative w-full md:max-w-150 h-[100vh] md:max-h-max overflow-y-auto scrollbar- scroll-smooth
          bg-white md:rounded-lg shadow-xl border-2 ${popup.variantClasses}
          focus:outline-none focus:ring-2 focus:ring-offset-2
        `}
        tabIndex={-1}
        onKeyDown={popup.handleKeyDown}
      >
        {/* Header */}
        {(popup.config.title || popup.config.showCloseButton) && (
          <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""} p-4 border-b border-gray-200`}>
            {popup.config.title && (
              <h2
                id="popup-title"
                className={`md:text-[1rem] text-[0.9rem] ${popup.titleColorClasses}`}
              >
                {popup.config.title}
              </h2>
            )}
            {popup.config.showCloseButton && (
              <button
                onClick={popup.closePopup}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none"
                aria-label="Close popup"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;

// Confirmation Dialog Component
export const ConfirmationDialog: React.FC<{
  popup: ReturnType<typeof useConfirmationPopup>;
  message: string;
  confirmText?: string;
  cancelText?: string;
}> = ({ 
  popup, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel' 
}) => (
  <Popup popup={popup} className=''>
    <div className="space-y-4">
      <p className="text-gray-700">{message}</p>
      <div className="flex gap-2 justify-end">
        <button
          onClick={popup.handleCancel}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {cancelText}
        </button>
        <button
          onClick={popup.handleConfirm}
          className={`px-4 py-2 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            popup.config.variant === 'danger'
              ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
              : popup.config.variant === 'warning'
              ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500'
              : popup.config.variant === 'success'
              ? 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'
          }`}
        >
          {confirmText}
        </button>
      </div>
    </div>
  </Popup>
);

// Alert Dialog Component
export const AlertDialog: React.FC<{
  popup: ReturnType<typeof useAlertPopup>;
  message: string;
  buttonText?: string;
}> = ({ popup, message, buttonText = 'OK' }) => (
  <Popup popup={popup} className=''>
    <div className="space-y-4">
      <p className="text-gray-700">{message}</p>
      <div className="flex justify-end">
        <button
          onClick={popup.closePopup}
          className={`px-4 py-2 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            popup.config.variant === 'danger'
              ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
              : popup.config.variant === 'warning'
              ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500'
              : popup.config.variant === 'success'
              ? 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  </Popup>
);