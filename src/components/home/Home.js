import React from "react";
import Delivery from "./Delivery";
import c from "./Home.module.css"

const Home = (p) => {
  return (
    <React.Fragment>
      <div className={c.letterContainer}>
        <Delivery/>
      </div>
    </React.Fragment>
  );
};
export default Home;
