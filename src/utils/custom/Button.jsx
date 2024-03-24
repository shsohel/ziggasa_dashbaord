import PropTypes from "prop-types";
import { cn } from "../utility";
export const Button = (props) => {
  const {
    id = "inputBoxId",
    label = null,
    icon = null,
    onClick,
    className,
    ...restProps
  } = props;
  return (
    <button
      className={cn(
        "border bg-primary px-2 py-1 text-nowrap text-light font-semibold hover:bg-secondary rounded",
        className,
      )}
      onClick={onClick}
      {...restProps}
    >
      <span>{icon ? icon : label}</span>
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
};
