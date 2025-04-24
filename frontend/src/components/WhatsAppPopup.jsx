import React from "react";

const WhatsAppPopup = () => {
  const phoneNumber = "94763991356";
  const message = "Hello! we want to buy any Materials.";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "flex",
        gap: "10px",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <a
        href={whatsappURL}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 rounded-full shadow-lg transition duration-300"
        aria-label="Chat with us on WhatsApp"
        style={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Chat with us
      </a>

      <a
        href={whatsappURL}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 p-2 rounded-full shadow-lg transition duration-300"
        aria-label="Open WhatsApp"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp icon"
          style={{ width: "35px", height: "35px" }}
        />
      </a>
    </div>
  );
};

export default WhatsAppPopup;
