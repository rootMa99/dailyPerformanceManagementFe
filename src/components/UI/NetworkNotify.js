import c from "./NetworkNotify.module.css";

const NetworkNotify = (p) => {

  return (
    <div
      className={c.notification}
      style={
       p.success
          ? { backgroundColor: "#006B63" }
          : { backgroundColor: "#B70404" }
      }
    >
      <p>
        {p.message}
      </p>
    </div>
  );
};
export default NetworkNotify;
