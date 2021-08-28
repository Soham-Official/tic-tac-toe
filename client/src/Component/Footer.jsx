import React from "react";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="footer-copyright text-center pt-3">
          Developed by
          <a
            className="white-text"
            target="_blank"
            href="https://soham-official.github.io/"
            rel="noreferrer"
          >
            {" "}
            Soham{" "}
          </a>
          , 2021
        </div>
      </footer>
    </div>
  );
};

export default Footer;
