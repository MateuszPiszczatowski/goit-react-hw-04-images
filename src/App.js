import "./App.css";
import SearchImages, { PER_PAGE } from "./utils/PixabayHandler";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import React, { useEffect, useState } from "react";
import { Notify } from "notiflix";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";

const App = () => {
  const [querryInfo, setQuerryInfo] = useState({ page: 1, querry: "" });
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const onQuerrySubmit = (e) => {
    e.preventDefault();
    const newQuerry = e.target.elements["querry-input"].value;
    if (querryInfo.querry === newQuerry) {
      return;
    }
    const newQuerryInfo = { page: 1, querry: newQuerry };
    setImages([]);
    setQuerryInfo(newQuerryInfo);
    setIsLoading(true);
    setIsMore(false);
  };

  const loadMore = (e) => {
    setQuerryInfo({ ...querryInfo, page: querryInfo.page + 1 });
    setIsLoading(true);
  };

  const turnOnModal = (e) => {
    const modalImage = e.target.dataset.src;
    document.addEventListener("keydown", turnOffModalByKey);
    setModalImage(modalImage);
    setShowModal(true);
  };

  const turnOffModal = () => {
    document.removeEventListener("keydown", turnOffModalByKey);
    setShowModal(false);
  };

  const turnOffModalByClick = (e) => {
    if (e.currentTarget === e.target) {
      turnOffModal();
    }
  };

  const turnOffModalByKey = (e) => {
    if (e.key === "Escape") {
      turnOffModal();
    }
  };

  useEffect(() => {
    const { querry, page } = querryInfo;
    if (querry !== "") {
      SearchImages(querry, page).then((querryResult) => {
        if (querryResult.success) {
          const picturesData = querryResult.picturesData;
          setImages((i) => i.concat(picturesData.hits));
          setIsMore(picturesData.totalHits > page * PER_PAGE);
        } else {
          Notify.failure(querryResult.errorMessage);
        }
      });
    }
    setIsLoading(false);
  }, [querryInfo]);

  return (
    <>
      <Searchbar onSubmit={onQuerrySubmit}></Searchbar>
      <ImageGallery images={images} modalCallback={turnOnModal}></ImageGallery>
      {isMore && <Button title="Load more" callback={loadMore}></Button>}
      {isLoading && <Loader />}
      {showModal && <Modal src={modalImage} closeCallback={turnOffModalByClick}></Modal>}
    </>
  );
};

export default App;
