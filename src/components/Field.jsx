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
      case "text":
        return <input type="text" name={name} {...otherProps} />;
      default:
        return <p>Unsupported field type: {type}</p>;
    }
  };

  return (
    <div className="field-container">
      {name && <p className="field-description">{name}</p>}
      {renderInputField()}
    </div>
  );
}

export default Field;
