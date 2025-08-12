import React from "react";


const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} <span className="name">Shalini</span> | Accessibility Analyser Project
      </p>
    </footer>
  );
};

export default Footer;