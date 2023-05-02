import "./App.css";
import SearchImages, { PER_PAGE } from "./utils/PixabayHandler";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import React, { useEffect, useRef, useState } from "react";
import { Notify } from "notiflix";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";

const App = () => {
  const [querry, setQuerry] = useState("");
  const [page, setPage] = useState(1);
  const imagesRef = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const onQuerrySubmit = (e) => {
    e.preventDefault();
    const newQuerry = e.target.elements["querry-input"].value;
    if (querry === newQuerry) {
      return;
    }
    setPage(1);
    imagesRef.current = [];
    setQuerry(newQuerry);
    setIsLoading(true);
    setIsMore(false);
  };

  const loadMore = (e) => {
    setPage(page + 1);
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

  const handleQuerrySuccess = (picturesData) => {
    imagesRef.current = imagesRef.current.concat(picturesData.hits);
    setIsMore(picturesData.totalHits > page * PER_PAGE);
    setIsLoading(false);
  };

  const handleQuerryFailure = (errorMessage) => {
    Notify.failure(errorMessage);
    setIsLoading(false);
  };

  useEffect(() => {
    SearchImages(querry, page).then(
      (querryResult) => {
        if (querryResult.success) {
          handleQuerrySuccess(querryResult.picturesData);
        } else {
          handleQuerryFailure(querryResult.errorMessage);
        }
      },
      [page, querry]
    );
  });

  return (
    <>
      <Searchbar onSubmit={onQuerrySubmit}></Searchbar>
      <ImageGallery images={imagesRef.current} modalCallback={turnOnModal}></ImageGallery>
      {isMore && <Button title="Load more" callback={loadMore}></Button>}
      {isLoading && <Loader />}
      {showModal && <Modal src={modalImage} closeCallback={turnOffModalByClick}></Modal>}
    </>
  );
};

export default App;
