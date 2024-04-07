import React from "react";
import Delivery from "./Delivery";
import c from "./Home.module.css";

const Home = (p) => {
  return (
    <div className={c.holding}>
      <div className={c.letterContainer}>
        <div className={c.title}>
          <div className={c.line}></div>
          <h3>safety</h3>
        </div>
        <Delivery title="safety" />
      </div>
      <div className={c.letterContainer}>
        <div className={c.title}>
          <div className={c.line}></div>
          <h3>skills</h3>
        </div>
        <Delivery title="skills" />
      </div>
      <div className={c.letterContainer}>
      <div className={c.title}>
        <div className={c.line}></div>
        <h3>quality</h3>
      </div>
      <Delivery title="quality" />
    </div>
      <div className={c.letterContainer}>
        <div className={c.title}>
          <div className={c.line}></div>
          <h3>Delivery</h3>
        </div>
        <Delivery title="delivery" />
      </div>
     
      <div className={c.letterContainer}>
        <div className={c.title}>
          <div className={c.line}></div>
          <h3>inventory</h3>
        </div>
        <Delivery title="inventory" />
      </div>
      <div className={c.letterContainer}>
        <div className={c.title}>
          <div className={c.line}></div>
          <h3>productivity</h3>
        </div>
        <Delivery title="productivity" />
      </div>
      <div className={c.letterContainer}>
        <div className={c.title}>
          <div className={c.line}></div>
          <h3>kaizen</h3>
        </div>
        <Delivery title="kaizen" />
      </div>
    </div>
  );
};
export default Home;
