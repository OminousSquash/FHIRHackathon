import React from "react";
import { collection, addDoc } from "@firebase/firestore";
import { useState } from "react";
import db from "./firebase";

// TODO: editor page should look like this
//       - A button to edit an existing template
//       - A button to create a new template
//       - A button to delete an existing template
//       - A list of all templates

function TemplateEditor() {
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleNewForm = () => {
    setIsEditing(true);
  };

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        name: "",
        description: "",
        type: "text", // Default type
        unit: "", // Default unit
      },
    ]);
  };

  const handleFieldChange = (index, property, value) => {
    setFields([
      ...fields.slice(0, index),
      { ...fields[index], [property]: value },
      ...fields.slice(index + 1),
    ]);
  };

  const handleDeleteField = (index) => {
    setFields([...fields.slice(0, index), ...fields.slice(index + 1)]);
  };

  const handleSaveForm = async () => {
    const collectionRef = collection(db, "formTemplates");
    // add the patient name at the start by default
    fields.unshift({
      name: "patient-name",
      description: "Enter patient name",
      type: "text",
      unit: "",
    });

    await addDoc(collectionRef, {
      name: formName,
      fields: fields,
    });
    setIsEditing(false); // Close the form
  };

  const handleCancelForm = () => {
    setIsEditing(false); // Close the form
  };

  return (
    <div className="container mx-auto p-6">
      {!isEditing && (
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleNewForm}
        >
          Add Form
        </button>
      )}

      {isEditing && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 max-w-md sm:max-w-lg md:max-w-xl mx-auto">
          {/* Form Name Input */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="formName"
          >
            Form Name
          </label>
          <input
            type="text"
            id="formName"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Form Name"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />

          {/* Fields */}
          {fields.map((field, index) => (
            <div className="field border rounded-lg p-4 mt-4" key={index}>
              {" "}
              {/* Field container */}
              <div className="mb-2">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor={`fieldName-${index}`}
                >
                  Field Name
                </label>
                <input
                  type="text"
                  id={`fieldName-${index}`}
                  value={field.name}
                  onChange={(e) =>
                    handleFieldChange(index, "name", e.target.value)
                  }
                  placeholder="Field Name"
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <textarea
                id={`fieldDescription-${index}`}
                value={field.description}
                onChange={(e) =>
                  handleFieldChange(index, "description", e.target.value)
                }
                placeholder="Description"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <select
                id={`fieldType-${index}`}
                value={field.type}
                onChange={(e) =>
                  handleFieldChange(index, "type", e.target.value)
                }
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2 mb-2"
              >
                <option value="text">Text</option>
                <option value="numeric">Numeric</option>
              </select>
              {field.type === "numeric" && (
                <input
                  id={`fieldUnit-${index}`}
                  type="text"
                  value={field.unit}
                  onChange={(e) =>
                    handleFieldChange(index, "unit", e.target.value)
                  }
                  placeholder="Unit"
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                />
              )}
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleDeleteField(index)}
              >
                Delete
              </button>
            </div>
          ))}

          {/* Add Field Button (Positioned) */}
          <div className="flex justify-center mt-6">
            {" "}
            {/* Centering container */}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleAddField}
            >
              Add Field
            </button>
          </div>

          {/* Save / Cancel Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSaveForm}
            >
              Save
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCancelForm}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplateEditor;
