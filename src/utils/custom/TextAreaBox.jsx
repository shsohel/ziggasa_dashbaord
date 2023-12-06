import PropTypes from "prop-types";
import { cn } from "../utility";
const TextArea = (props) => {
  const {
    id,
    name,
    value,
    type,
    onChange,
    invalid,
    disabled,
    hidden,
    classNames,
    invalidMassage,
    label,
    labelClass,
    ...restProps
  } = props;
  return (
    <>
      <div className={` ${labelClass}`}>
        {label && <label className={`text-sm mb-2`}>{label}</label>}
      </div>

      <textarea
        id={id}
        hidden={hidden}
        type={type}
        name={name}
        disabled={disabled}
        autoComplete={name}
        value={value}
        onChange={onChange}
        className={cn("block  w-full border-gray-300 rounded-md", classNames, {
          "border-rose-500": invalid,
        })}
        {...restProps}
      />
      {invalidMassage && invalid && (
        <span className="text-xs">{invalidMassage}</span>
      )}
    </>
  );
};

export default TextArea;
// ** Default Props
TextArea.defaultProps = {
  id: "input-felid",
  hidden: false,
  invalidMassage: null,
  type: "text",
  name: "input",
  value: "",
  disabled: false,
  classNames: "",
  //   label: "Button",
};

// ** PropTypes
TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  invalid: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  classNames: PropTypes.string,
  invalidMassage: PropTypes.string,
};
