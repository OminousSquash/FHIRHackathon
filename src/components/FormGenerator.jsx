import React, { useState, useEffect } from "react";
import { loadTemplates } from "../utils.js";
import Field from "./Field";

function FormGenerator() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      try {
        const loadedTemplates = await loadTemplates();
        setTemplates(loadedTemplates);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(
      templates.find((template) => template.id === templateId)
    );
  };

  const handleSubmit = (formData) => {
    console.log("Form data", formData);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      {isLoading && <p>Loading templates...</p>}
      {error && <p>Error loading templates: {error.message}</p>}

      {!isLoading && !error && (
        <>
          <h3 className="text-xl font-semibold mb-4">Select a template</h3>
          <select
            onChange={(e) => handleTemplateSelect(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          >
            <option value="">Choose a template</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>

          {selectedTemplate && (
            <form onSubmit={handleSubmit}>
              {selectedTemplate.fields.map((field) => (
                <Field key={field.name} {...field} className="mb-4" />
              ))}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default FormGenerator;
