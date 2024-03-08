import React from "react";
import db from "../firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TemplateCard from "../components/TemplateCard";
import { loadTemplates } from "../utils";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// TODO: editor page should look like this
//       - A button to delete an existing template

function TemplateEditor() {
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch templates when the component mounts
  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      try {
        const loadedTemplates = await loadTemplates();
        setTemplates(loadedTemplates);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchTemplates();
  }, []);

  const handleNewForm = () => {
    setIsEditing(true);
  };

  const handleEditTemplate = (templateId) => {
    // Find the template in the 'templates' array
    const templateToEdit = templates.find(
      (template) => template.id === templateId
    );

    // Set the form state with the template's data
    setFormName(templateToEdit.name);
    setFields(templateToEdit.fields);
    setIsEditing(true);
  };

  const handleDeleteTemplate = async (templateId) => {
    if (
      window.confirm(
        `Are you sure you want to delete the template with the ID ${templateId}?`
      )
    ) {
      try {
        const docRef = doc(db, "formTemplates", templateId);
        await deleteDoc(docRef);
      } catch (error) {
        console.error("Error deleting template:", error);
      }
    }

    // Reload the templates
    const loadedTemplates = await loadTemplates();
    setTemplates(loadedTemplates);

    setIsEditing(false);
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
    // first check if it already exists
    const patientNameField = fields.find(
      (field) => field.name === "patient-name"
    );
    if (!patientNameField) {
      fields.unshift({
        name: "patient-name",
        description: "Enter patient name",
        type: "text",
        unit: "",
      });
    }

    // Check if a template with the same name exists
    const querySnapshot = await getDocs(
      query(collectionRef, where("name", "==", formName))
    );

    let matchingTemplateDoc = null;
    querySnapshot.forEach((doc) => (matchingTemplateDoc = doc)); // There should be at most one matching template
    console.log("matchingTemplateDoc", matchingTemplateDoc);
    if (matchingTemplateDoc) {
      // Update the existing template
      await updateDoc(matchingTemplateDoc.ref, {
        fields: fields,
      });
    } else {
      // Add a new template
      await addDoc(collectionRef, {
        name: formName,
        fields: fields,
      });
    }
    setIsEditing(false); // Close the form
    // Reload the templates
    const loadedTemplates = await loadTemplates();
    setTemplates(loadedTemplates);
  };

  const handleCancelForm = () => {
    setIsEditing(false); // Close the form
    setFormName(""); // Clear the form name
    setFields([]); // Clear the fields
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold">Form Templates</h1>
      <div className="flex items-center mb-6">
        {" "}
        {/* Add a container div for the button */}
        {isEditing ? (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto"
            onClick={handleCancelForm}
          >
            Close Form
          </button>
        ) : (
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto"
          >
            Go Back
          </Link>
        )}
      </div>

      {/* Form Cards */}
      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {" "}
          {/* Grid for cards */}
          {/* Create New Form Card */}
          {/* "Add Form" Card */}
          <div
            className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 cursor-pointer"
            onClick={handleNewForm}
          >
            <div className="flex items-center justify-center h-full">
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {/* Replace with an appropriate 'add' icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="ml-2 font-medium">Create New Form</span>
            </div>
          </div>
          {/* Template Cards */}
          {isLoading && <p>Loading templates...</p>}
          {error && <p>Error loading templates: {error.message}</p>}
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onEdit={() => handleEditTemplate(template.id)}
              onDelete={handleDeleteTemplate}
            />
          ))}
        </div>
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
