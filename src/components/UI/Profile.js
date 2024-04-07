import c from "./Profile.module.css";
import edit from "../../assets/edit.png";
import React, { useEffect, useState } from "react";
import BackDrop from "../UI/BackDrop";
import api from "../../service/api";
const Profile = (p) => {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    setData({
      owner: p.name,
      coOwner: p.coName,
      file: p.urlI,
    });
  }, [p.name, p.coName, p.urlI]);
  const close = (e) => {
    setShowForm(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(p.kpiOwn)
    if (typeof data.file === "object") {
      const formData = new FormData();
      formData.append("file", data.file);
      fetch(
        `${api}/kpio?kpiOwn=${p.kpiOwn}&name=${data.owner}&coName=${data.coOwner}`,
        {
          method: "POST",
          body: formData,
        }
      ).catch((error) => {
        console.error("Error uploading file:", error);
      });
    } else {
      fetch(
        `${api}/kpio/owner?kpiOwn=${p.kpiOwn}&name=${data.owner}&coName=${data.coOwner}`,
        {
          method: "POST",
        }
      ).catch((error) => {
        console.error("Error uploading file:", error);
      });
    }

    close();
  };

  const fileChangeHandler = (e) => {
    setData((p) => ({ ...p, file: e.target.files[0] }));
  };

  return (
    <React.Fragment>
      <div className={c.card}>
        <img
          src={p.urlI}
          className={c.profileImage}
          alt="aptiv"
          draggable="false"
        />

        <div className={c.textContainer}>
          <p className={c.name}>{p.name}</p>
          <p className={c.profile}>{p.coName}</p>
        </div>
        {p.path === "/admin" && (
          <img
            src={edit}
            className={c.edit}
            alt="aptiv"
            draggable="false"
            onClick={(e) => setShowForm(true)}
          />
        )}
      </div>

      {showForm && (
        <React.Fragment>
          <BackDrop click={close} />
          <div className={c["form-container"]}>
            <h1>{p.kpiOwn}</h1>
            <form className={c.form} onSubmit={submitHandler}>
              <div className={c["form-group"]}>
                <div className={c.inputC}>
                  <h3>owner name:</h3>
                  <input
                    type="text"
                    placeholder="Enter owner name"
                    value={data.owner}
                    onChange={(e) =>
                      setData((p) => ({ ...p, owner: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className={c.inputC}>
                  <h3>co-owner name:</h3>
                  <input
                    type="text"
                    placeholder="Enter co-owner name"
                    value={data.coOwner}
                    onChange={(e) =>
                      setData((p) => ({ ...p, coOwner: e.target.value }))
                    }
                    required
                  />
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                className={c.inputFile}
                onChange={fileChangeHandler}
              />
              <button className={c["form-submit-btn"]} type="submit">
                submit
              </button>
            </form>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default Profile;
