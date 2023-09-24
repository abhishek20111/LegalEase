import React from "react";
import vdo from "../assets/bchain.mp4";
import { useState, useRef } from "react";
import { Web3Storage } from "web3.storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const DocumentBlockChain = () => {
  const [uploading, setUploading] = useState(false);
  const notify1 = (info) => toast.success(info);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [files, setFiles] = useState([]); // State variable to hold the selected files
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;
    setFiles([...files, ...selectedFiles]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      // Handle error: No files selected
      return;
    }

    setUploading(true);

    // Initialize web3.storage client with your API token
    const client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI2OTczRDMyRWYyZmY4NGE3OTM2OEY1ZDNjMjYyMTA1NDcyMDc0MkEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTUwNTM0NTcwMTMsIm5hbWUiOiJMZWdhbEVhc2UifQ.yxyT0xNKe5CydFJZ1ZDMibe6NYrOb18AkofKGLBcgiA",
    });

    // Initialize an array to store uploaded files' information
    const uploadedFilesInfo = [];

    for (const file of files) {
      // Use the put() method to upload each file one by one
      try {
        const cid = await client.put([file], {
          onStoredChunk: (chunkSize) => {
            // Update upload progress here if needed
            const progress = Math.ceil((chunkSize / file.size) * 100);
            setUploadProgress(progress);
          },
        });

        // Store the uploaded file's CID and name in the array
        uploadedFilesInfo.push({ hash:cid, name: file.name });

        // Handle successful upload
        console.log("File uploaded. CID:", cid);
        setUploading(false)
      } catch (error) {
        // Handle upload error for this file
        console.error("Upload failed for", file.name, ":", error);
      }
    }
    handleUploadToBackend(uploadedFilesInfo);

    // Update the uploadedFiles state with the array of uploaded files' information
    setUploadedFiles(uploadedFilesInfo);
    console.log("Uploaded files:", uploadedFilesInfo);

    // Reset the selectedFiles array
    setFiles([]);
    setUploading(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const droppedFiles = Array.from(event.dataTransfer.files);
      setFiles([...files, ...droppedFiles]);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const removeFile = (fileName, idx) => {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles(newArr);
  };

  const openFileExplorer = () => {
    inputRef.current.value = "";
    inputRef.current.click();
  };

  


    const axiosConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

    const handleUploadToBackend = async (uploadedFilesInfo) => {
        try {
            console.log(uploadedFilesInfo);
            const response = await axios.put(`http://localhost:8080/addDocument`,uploadedFilesInfo , axiosConfig);

            console.log('Document added:', response.data);
            notify1("Document Uploaded Successfully");
            localStorage.clear();
            navigate("/signin");
        } catch (error) {
            console.log('Error adding document:', error);
        }
    };


  return (
    <div className="w-full flex flex-col justify-center bg-black">
      <div className="w-full flex flex-col sm:flex-row min-h-screen">
        <div className="w-full bg-gradient-to-br from-[#1A1525] via-[#1A1525] to-[#0F1424] my-[98px] sm:w-[50%]">
          <p className="text-6xl text-white font-thin">Decentralized Storage</p>
        </div>
        <div className="w-full bg-black sm:w-[50%] flex justify-center items-center">
          <video src={vdo} autoPlay loop className="bg-[#1A1525]"></video>
        </div>
      </div>
      <div className="w-full justify-around flex flex-col sm:flex-row min-h-screen">
        <div className="">
          <form
            className={`${
              dragActive ? "bg-blue-400" : "bg-blue-100"
            }  p-4 rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center`}
            onDragEnter={handleDragEnter}
            onSubmit={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
          >
            {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
            <input
              placeholder="fileInput"
              className="hidden"
              ref={inputRef}
              type="file"
              multiple={true}
              onChange={handleFileSelect}
              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
            />

            <p>
              Drag & Drop files or{" "}
              <span
                className="font-bold text-blue-600 cursor-pointer"
                onClick={openFileExplorer}
              >
                <u>Select files</u>
              </span>{" "}
              to upload
            </p>

            <div className="flex flex-col items-center p-3">
              {files.map((file, idx) => (
                <div key={idx} className="flex flex-row space-x-5">
                  <span>{file.name}</span>
                  <span
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeFile(file.name, idx)}
                  >
                    remove
                  </span>
                </div>
              ))}
            </div>

            <button
              className="bg-black rounded-lg p-2 mt-3 w-auto"
              onClick={handleUpload}
              disabled={files.length === 0 || uploading}
            >
              <span className="p-2 text-white">Submit</span>
            </button>
          </form>

          {uploading && <div>Uploading... {uploadProgress}% complete</div>}

          {uploadedFiles.length > 0 && (
            <div>
              <h2>Uploaded Files:</h2>
              <ul>
                {uploadedFiles.map((file, idx) => (
                  <li key={idx}>
                    <p>
                      {file.name} : {file.cid}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentBlockChain;
