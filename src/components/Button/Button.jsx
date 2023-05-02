import PropTypes from "prop-types";
import css from "./Button.module.css";

function Button({ title, callback }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "1rem 0" }}>
      <button className={css.Button} type="button" onClick={callback}>
        {title}
      </button>
    </div>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default Button;
