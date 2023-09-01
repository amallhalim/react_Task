import React, { useEffect, useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {v4} from "uuid"
import { storage } from "../Apis/fireBaseConfigs";
import  img from "../assets/No-Image-Placeholder.svg.png";
// ===============================
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [apearprogressBar, setapearprogressBar] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);


  // Create the file metadata
  const metadata = {
    contentType: "image/jpeg",
  };


  const upload = e => {
    e.preventDefault();

    if (file) {
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, `images/${file?.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      setapearprogressBar(true)
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        snapshot => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
       setProgress(
         ((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          );

          if (progress == 100) {
            setapearprogressBar(false);
            console.log("done")

  }
          console.log("progress", progress);
          // eslint-disable-next-line default-case
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        error => {
          alert(error.code)
          // eslint-disable-next-line default-case
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;
            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            // console.log(" done File available at", downloadURL);
          });
        }
      );
    }
  };
  // Handles input change event and updates state
  function handleChange(event) {
    setFile(event.target.files[0]);
    setImgPreview(URL.createObjectURL(event.target.files[0]));

  }
  return (
    <>
      <form>
        <img
          src={file && imgPreview ? imgPreview : img}
          // src={img}
          alt={file?.name}
          width={"400px"}
          height={"200px"}
          style={{ border: "2px solid black" }}
          className="bg-primary"
        />
        
        {/* <div className="form-group preview " width={"400px"} height={"400px"}>
          <img
            src={imgPreview}
            alt={file?.name}
            width={"400px"}
            className="bg-primary"
          />
        </div> */}
        <div className="form-group">
          <input type="file" className="form-control" onChange={handleChange} />
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={upload}
        >
          Upload
        </button>
       {file && imgPreview ? 
       ( <div className="progress mt-2 ">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated "
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="10"
            aria-valuemax="100"
            style={{ width: `${progress}%` }}
          >
            {progress==100? ("done") : progress}
          </div>
        </div>):null}
        <div id="alert_wrapper"></div>
      </form>
    </>
  );
};

export default FileUpload;
