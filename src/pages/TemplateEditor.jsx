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
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          onClick={handleNewForm}
        >
          Add Form
        </button>
      )}

      {isEditing && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Form Name"
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
            onClick={handleAddField}
          >
            Add Field
          </button>

          {fields.map((field, index) => (
            <div className="field" key={index}>
              <input
                type="text"
                value={field.name}
                onChange={(e) =>
                  handleFieldChange(index, "name", e.target.value)
                }
                placeholder="Field Name"
              />
              <textarea
                value={field.description}
                onChange={(e) =>
                  handleFieldChange(index, "description", e.target.value)
                }
                placeholder="Description"
              />
              <select
                value={field.type}
                onChange={(e) =>
                  handleFieldChange(index, "type", e.target.value)
                }
              >
                <option value="text">Text</option>
                <option value="numeric">Numeric</option>
              </select>
              {field.type === "numeric" && (
                <input
                  type="text"
                  value={field.unit}
                  onChange={(e) =>
                    handleFieldChange(index, "unit", e.target.value)
                  }
                  placeholder="Unit"
                />
              )}
              <button onClick={() => handleDeleteField(index)}>Delete</button>
            </div>
          ))}
          <button onClick={handleSaveForm}>Save</button>
          <button onClick={handleCancelForm}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default TemplateEditor;
