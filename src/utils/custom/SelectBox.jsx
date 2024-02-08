/** @format */

import PropTypes from 'prop-types';
// import { selectThemeColors } from "utils/utolity";
import Select from 'react-select';
import { cn, selectThemeColors } from '../utility';
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
    classNames,
    ...rest
  } = props;
  return (
    <>
      <div>
        {label && <label className="text-sm font-bold mb-2">{label}</label>}
        <Select
          classNames={{
            control: (state) =>
              state.isFocused
                ? 'border border-primary'
                : invalid
                ? ' border-red-600 '
                : ' ',
            menu: () => 'text-primary font-bold',
            // menuList: () => 'bg-red-600',

            // control: () => (invalid ? ' border-red-600 ' : ''),
          }}
          className={cn(classNames)}
          //  classNamePrefix="react-select"
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
  classNames: '',
  value: null,
  //   label: "Button",
};

// ** PropTypes
SelectBox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  invalidMassage: PropTypes.string,
  label: PropTypes.string,
  classNames: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.any,
  invalid: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
