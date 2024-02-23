import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      {/* Use container-fluid for full width and padding adjustments on different screens */}
      <div
        className="container-fluid text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        {/* Responsive text size and spacing can be adjusted here */}
        <p className="mb-0">© {new Date().getFullYear()} My Tesla Health:</p>
        <a className="text-dark" href="https://mohamedgad.onrender.com/">
          https://mohamedgad.onrender.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
