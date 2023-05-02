import PropTypes from "prop-types";
import css from "./Modal.module.css";

function Modal({ src, closeCallback }) {
  return (
    <div className={css.Overlay} onClick={closeCallback}>
      <div className={css.Modal}>
        <img src={src} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  src: PropTypes.string,
  closeCallback: PropTypes.func,
  closeByKeyCallback: PropTypes.func,
};

export default Modal;
