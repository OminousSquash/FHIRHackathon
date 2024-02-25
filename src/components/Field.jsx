import React from "react";

function Field({ name, description, type, unit, ...otherProps }) {
  const renderInputField = () => {
    switch (type) {
      case "numeric":
        return (
          <>
            <input type="number" name={name} {...otherProps} />
            {unit && <span> ({unit})</span>}
          </>
        );
      case "textual":
        return <input type="text" name={name} {...otherProps} />;
      default:
        return <p>Unsupported field type: {type}</p>;
    }
  };

  return (
    <div className="field-container">
      {description && <p className="field-description">{description}</p>}
      {renderInputField()}
    </div>
  );
}

export default Field;
