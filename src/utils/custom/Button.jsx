import PropTypes from "prop-types";

export const Button = (props) => {
  const {
    id,
    name,
    onClick,
    bgColor,
    hoverText,
    hoverBg,
    borderClass,
    textColor,
    mainClasses,
    disabled,
    ...rest
  } = props;
  return (
    <button
      onClick={onClick}
      id={id}
      disabled={disabled}
      className={`${mainClasses} ${borderClass} hover:${hoverText} hover:${hoverBg}   ${
        disabled ? "bg-mute" : bgColor
      } ${textColor}`}
      {...rest}
    >
      {name}
    </button>
  );
};

// ** Default Props
Button.defaultProps = {
  id: "btn-default-id",
  bgColor: "bg-primary",
  color: "bg-primary",
  textColor: "text-dark",
  hoverText: "text-light",
  hoverBg: "bg-secondary",
  borderClass: "border",
  mainClasses:
    "py-1 px-3 rounded text-sm font-semibold transition-all duration-500",
};

// ** PropTypes
Button.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  mainClasses: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  hoverText: PropTypes.string,
  hoverBg: PropTypes.string,
  borderClass: PropTypes.string,
};
