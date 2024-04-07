import React from "react";
import Delivery from "./Delivery";
import c from "./Home.module.css";

const Home = (p) => {
  return (
    <React.Fragment>
      <div className={c.letterContainer}>
        <div className={c.title}>
          <div className={c.line}></div>
          <h3>Delivery</h3>
        </div>
        <Delivery title="delivery" />
      </div>
    </React.Fragment>
  );
};
export default Home;
