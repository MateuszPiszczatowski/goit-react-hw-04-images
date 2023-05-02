import PropTypes from "prop-types";
import css from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ imageData, modalCallback }) {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={imageData.webformatURL}
        alt=""
        data-src={imageData.largeImageURL}
        className={css.ImageGalleryItemImage}
        onClick={modalCallback}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  imageData: PropTypes.object.isRequired,
  modalCallback: PropTypes.func,
};

export default ImageGalleryItem;
