import PropTypes from "prop-types";
import { cn } from "../utility";
const InputBox = (props) => {
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
        {label && <label className={`text-sm font-bold mb-2`}>{label}</label>}
      </div>
      <input
        id={id}
        hidden={hidden}
        type={type}
        name={name}
        disabled={disabled}
        autoComplete={name}
        value={value}
        onChange={onChange}
        // className={`${
        //   invalid ? " border-rose-500" : " border-gray-300"
        // } block w-full rounded-md  border text-secondary shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${classNames}`}
        className={cn(
          "block w-full border-gray-300 rounded-md  border text-secondary shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
          classNames,
          {
            "border-rose-500": invalid,
            "bg-mute": disabled,
          },
        )}
        {...restProps}
      />
      {invalidMassage && invalid && (
        <span className="text-xs">{invalidMassage}</span>
      )}
    </>
  );
};

export default InputBox;
// ** Default Props
InputBox.defaultProps = {
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
InputBox.propTypes = {
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
