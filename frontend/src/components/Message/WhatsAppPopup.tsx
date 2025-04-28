import React, { useState } from "react";

const WhatsAppPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const phoneNumber: string = "94763991356"; // Your WhatsApp number without '+'
  const message: string = "Hello! I need help with your products."; // Pre-filled message

  const whatsappURL: string = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div>
      {isOpen && (
        <div className="bg-white shadow-xl border rounded-lg p-4 mb-2 w-64 max-w-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-800">Need help?</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-500 focus:outline-none"
              aria-label="Close chat window"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            Chat with us on WhatsApp and we’ll get back to you as soon as we can.
          </p>
          <a
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300"
            aria-label="Chat on WhatsApp"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
              alt="WhatsApp"
              className="w-5 h-5 mr-2"
            />
            Chat on WhatsApp
          </a>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-lg transition duration-300 focus:outline-none"
        aria-label={isOpen ? "Close chat window" : "Open chat window"}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
          className="w-6 h-6" // small icon
        />
      </button>
    </div>
  );
};

export default WhatsAppPopup;
