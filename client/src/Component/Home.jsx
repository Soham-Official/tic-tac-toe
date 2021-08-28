import React from "react";
import "./Styles/home.css";
import "bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "./Footer";
const Home = () => {
  return (
    <>
      <div className="home">
        <div className="homepage">
          <div className="outer">
            <div className="gameName">Tic Tac Toe</div>
            <div className="tagName">Let's Play!! </div>
            <div className="element">
              <div className="Tic-tac-toe">
                <div>
                  <span id="x1">0</span>
                  <span id="x2">-</span>
                  <span id="x3">X</span>
                </div>
                <div>
                  <span id="x4">-</span>
                  <span id="x5">0</span>
                  <span id="x6">X</span>
                </div>
                <div>
                  <span id="x7">X</span>
                  <span id="x8">0</span>
                  <span id="x9">X</span>
                </div>
              </div>
              <div className="win">
                <span></span>
              </div>
            </div>
            <div
              className="buttons"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              {" "}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/singlePlayer" className="link">
                  <motion.button
                    className="button button--nanuk button--text-thick button--text-upper button--size-s button--border-thick"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.7 }}
                  >
                    <span>V</span>
                    <span>s</span>
                    <span style={{ marginLeft: "6px" }}>C</span>
                    <span> o</span>
                    <span>m</span>
                    <span>p</span>
                    <span>u</span>
                    <span>t</span>
                    <span>e</span>
                    <span>r</span>
                  </motion.button>
                </Link>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/join" className="link">
                  {" "}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.7 }}
                    className="button smallbtn button--nanuk button--text-thick button--text-upper button--size-s button--border-thick"
                  >
                    <span>V</span>
                    <span>s</span>
                    <span style={{ marginLeft: "6px" }}>F</span>
                    <span> r</span>
                    <span>i</span>
                    <span>e</span>
                    <span>n</span>
                    <span>d</span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
