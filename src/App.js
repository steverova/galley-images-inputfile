import React, { useState } from "react";
import "./index.css";
import data from "./images";

let files = null;

function App() {
  const [selectedImage, setSelectedImage] = useState("");
  const [modalState, setModalState] = useState(true);
  const [modalData, setModalData] = useState("");

  const onFileChange = (e) => {
    files = e.target.files;
    if (files.length !== 0) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      fileReader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
    }
  };

  const showModal = (data) => {
    setModalState(false);
    setModalData(data);
    console.log(modalData);
  };

  const closeModal = () => {
    setModalState(true);
  };

  const onSubmit = () => {
    const formData = { image: selectedImage };
    console.log(formData);

    files = null;
  };

  return (
    <>
      <div className="App container-fluid">
        <div className="col-sm-12 col-md-12 col-lg-10 col-xl-8 mx-auto mt-5">
          <div className="chooser_container">
            <input type="file" onChange={onFileChange} />
            <button className="btn" onClick={onSubmit}>
              {" "}
              <i class="fa-solid fa-file-arrow-up"></i>
            </button>
          </div>

          <div className="gallery">
            {data.map((item, index) => {
              return (
                <div key={index} class="card">
                  <img src={item.image} alt="gallery" />
                  <div className="button-menu">
                    <button class="right-aligned-button btn-card">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <button
                      onClick={() => showModal(item.image)}
                      class="right-aligned-button btn-card"
                    >
                      <i class="fa-solid fa-expand"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div hidden={modalState} className="gallery_modal">
        <button className="btn-card m-3" onClick={() => closeModal()}>
          <i class="fa-solid fa-compress"></i>
        </button>

        <div className=" col-md-7 mx-auto">
          <div className="modal_image_container">
            <img src={modalData} alt="gallery" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
