import PropTypes from "prop-types";
import css from "./ImageGallery.module.css";
import { nanoid } from "nanoid";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

function ImageGallery({ images, modalCallback }) {
  return (
    <ul className={css.ImageGallery}>
      {images.map((imageData) => {
        return (
          <ImageGalleryItem
            key={nanoid()}
            imageData={imageData}
            modalCallback={modalCallback}></ImageGalleryItem>
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  modalCallback: PropTypes.func,
};

export default ImageGallery;
