import React, { useRef, useState } from "react";
import c from "./UploadDataForm.module.css";
import api from "../../service/api";

const UploadDataForm = (p) => {
  const dropContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const [showButton, setShowbutton] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    dropContainerRef.current.classList.add("drag-active");
  };

  const handleDragLeave = () => {
    dropContainerRef.current.classList.remove("drag-active");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dropContainerRef.current.classList.remove("drag-active");
    fileInputRef.current.files = e.dataTransfer.files;
    setFile(e.dataTransfer.files[0]);
    setShowbutton(true);
  };

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
    setShowbutton(true);
  };

  const handleButtonClick = async () => {
    setShowbutton(false);
    const formData = new FormData();
    formData.append("excel", file);

    try {
      const response = await fetch(`${api}/logistics`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      setShowbutton(true);
      console.error("Error:", error);
    }
  };

  return (
    <React.Fragment>
      <div className={c.uploadH}>
        <div className={c.wrap}>
          <label
            htmlFor="images"
            className={c["drop-container"]}
            ref={dropContainerRef}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            id="dropcontainer"
          >
            <React.Fragment>
              <span className={c["drop-title"]}>Drop excel file here</span>
              or
              <div className={c["input-div"]}>
                <input
                  className={c.input}
                  name="file"
                  type="file"
                  accept=".xlsx"
                  ref={fileInputRef}
                  onChange={fileChangeHandler}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className={c.icon}
                >
                  <polyline points="16 16 12 12 8 16" />
                  <line y2="21" x2="12" y1="12" x1="12" />
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  <polyline points="16 16 12 12 8 16" />
                </svg>
              </div>
            </React.Fragment>
          </label>
         
        </div>
        {showButton && (
            <button className={c.button} onClick={handleButtonClick}>
              Upload File
            </button>
          )}
      </div>
    </React.Fragment>
  );
};

export default UploadDataForm;
