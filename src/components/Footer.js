import React from 'react';

function Footer() {
  return (
    <footer className="footer bg-light text-center text-white">
      <div className="container p-4">
      <section className="mb-4">
          {/* Facebook */}
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#3b5998" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-facebook-f" />
          </a>
          {/* Twitter */}
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#55acee" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter" />
          </a>
          {/* Google */}
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#dd4b39" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-google" />
          </a>
          {/* Instagram */}
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#ac2bac" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-instagram" />
          </a>
          {/* Linkedin */}
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#0082ca" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-linkedin-in" />
          </a>
          {/* Github */}
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#333333" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-github" />
          </a>
        </section>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)",color:"#000" }}>
       <b> © 2024 Copyright:</b>
        <a  style={{ color:"#000",marginLeft:"5px"}}><b>Abhishek Gouda</b></a>
      </div>
    </footer>
  );
}

export default Footer;
