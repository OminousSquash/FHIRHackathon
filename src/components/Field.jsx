import React from "react";

function Field({ name, description, type, unit, ...otherProps }) {
  const renderInputField = () => {
    switch (type) {
      case "numeric":
        return (
          <>
            <input
              type="number"
              name={name}
              {...otherProps}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {unit && <span className="ml-2 text-gray-500">{unit}</span>}
          </>
        );

      case "text":
        return (
          <input
            type="text"
            name={name}
            {...otherProps}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        );

      case "option":
        return (
          <select
            name={name}
            {...otherProps}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Select an option</option>
            {otherProps.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      default:
        return <p className="text-red-500">Unsupported field type: {type}</p>;
    }
  };

  return (
    <div className="mb-4 border rounded-lg p-4">
      {" "}
      {/* Field Container */}
      {description && <p className="text-gray-700 mb-2">{description}</p>}
      <div className="flex items-center">
        {" "}
        {/* Input */}
        {renderInputField()}
      </div>
    </div>
  );
}

export default Field;
