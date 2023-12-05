/** @format */

import PropTypes from 'prop-types';
// import { selectThemeColors } from "utils/utolity";
import Select from 'react-select';
const SelectBox = (props) => {
  const {
    id,
    name,
    value,
    onChange,
    invalid,
    invalidMassage,
    options,
    label,
    ...rest
  } = props;
  return (
    <>
      <div>
        {label && <label className="text-sm mb-2">{label}</label>}
        <Select
          classNames={{
            control: (state) =>
              state.isFocused
                ? 'border border-primary'
                : invalid
                ? ' border-red-600 '
                : ' ',
            // control: () => (invalid ? ' border-red-600 ' : ''),
          }}
          // className="react-select-container"
          // classNamePrefix="react-select"
          // theme={selectThemeColors}
          menuPlacement="auto"
          menuPosition="fixed"
          menuPortalTarget={document.body}
          id={id}
          instanceId={id}
          isClearable
          name={name}
          value={value}
          options={options}
          onChange={onChange}
          {...rest}
        />
        {invalidMassage && invalid && (
          <span className="text-xs">{invalidMassage}</span>
        )}
      </div>
    </>
  );
};

export default SelectBox;
// ** Default Props
SelectBox.defaultProps = {
  id: 'input-selet',
  invalid: false,
  invalidMassage: null,
  name: 'select',
  value: null,
  //   label: "Button",
};

// ** PropTypes
SelectBox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  invalidMassage: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.any,
  invalid: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
