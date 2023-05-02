import "./App.css";
import SearchImages, { PER_PAGE } from "./utils/PixabayHandler";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import React from "react";
import { Notify } from "notiflix";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";

class App extends React.Component {
  state = {
    page: 1,
    totalHits: 0,
    images: [],
    querry: "",
    isLoading: false,
    isMore: false,
    showModal: false,
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onQuerrySubmit}></Searchbar>
        <ImageGallery images={this.state.images} modalCallback={this.turnOnModal}></ImageGallery>
        {this.state.isMore && <Button title="Load more" callback={this.loadMore}></Button>}
        {this.state.isLoading && <Loader />}
        {this.state.showModal && (
          <Modal src={this.state.modalImage} closeCallback={this.turnOffModalByClick}></Modal>
        )}
      </>
    );
  }

  async componentDidUpdate(prevProps, prevState) {
    const { page, images, querry } = this.state;
    if ((prevState.page === page && prevState.querry === querry) || querry === "") {
      return;
    }
    const querryResult = await SearchImages(querry, page);
    if (querryResult.success) {
      const totalHits = querryResult.picturesData.totalHits;
      const newImages = images.concat(querryResult.picturesData.hits);
      const isMore = totalHits > page * PER_PAGE;
      this.setState({ totalHits, images: newImages, isMore, isLoading: false });
    } else {
      Notify.failure(querryResult.errorMessage);
      this.setState({ isLoading: false });
    }
  }

  onQuerrySubmit = (e) => {
    e.preventDefault();
    const newQuerry = e.target.elements["querry-input"].value;
    if (this.state.querry === newQuerry) {
      return;
    }
    this.setState({
      page: 1,
      totalHits: 0,
      images: [],
      querry: newQuerry,
      isLoading: true,
      isMore: false,
    });
  };

  loadMore = (e) => {
    this.setState({ page: this.state.page + 1, isLoading: true });
  };

  turnOnModal = (e) => {
    const modalImage = e.target.dataset.src;
    this.setState({ modalImage, showModal: true });
    document.addEventListener("keydown", this.turnOffModalByKey);
  };

  turnOffModal = () => {
    document.removeEventListener("keydown", this.turnOffModalByKey);
    this.setState({ showModal: false });
  };

  turnOffModalByClick = (e) => {
    if (e.currentTarget === e.target) {
      this.turnOffModal();
    }
  };

  turnOffModalByKey = (e) => {
    if (e.key === "Escape") {
      this.turnOffModal();
    }
  };
}

export default App;
