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
    <div>
      {isLoading && <p>Loading templates...</p>}
      {error && <p>Error loading templates: {error.message}</p>}

      {!isLoading && !error && (
        <>
          <h3>Select a template</h3>
          <select onChange={(e) => handleTemplateSelect(e.target.value)}>
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
                <Field key={field.name} {...field} />
              ))}
              <button type="submit">Submit</button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default FormGenerator;
