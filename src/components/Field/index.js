import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder, value, onChange }) => {
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          label={name}
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
      break;
      case FIELD_TYPES.TEXTAREA:
        component = (
          <textarea
            name={name}
            label={name}
            value={value}
            data-testid="field-testid"
            onChange={(e) => onChange(e.target.value)} // Call the provided onChange function here
          />
        );
      break;
    default:
      component = (
        <input
          type="text"
          label={name}
          name={name}
          value={value}
          placeholder={placeholder}
          data-testid="field-testid"
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
  return (
    <div className="inputField">
      <span>{label}</span>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
 Field.defaultProps = {
   label: "",
   placeholder: "",
   value: "",
   type: FIELD_TYPES.INPUT_TEXT,
   name: "field-name",
 }

export default Field;
