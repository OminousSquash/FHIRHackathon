import React, { useState, useEffect } from "react";
import { loadTemplates } from "../utils.js";
import Field from "./Field";
import { collection, setDoc, doc, arrayUnion } from "@firebase/firestore";
import db from "../firebase.js";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const collectionRef = collection(db, "patientData");
    const form = {};
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var timeString = hours + ":" + minutes + ":" + seconds;
    var patientName = "";
    form["time"] = timeString;
    for (let [key, value] of formData.entries()) {
      // TODO: find a less hacky way to handle numeric fields
      const field = selectedTemplate.fields.find((field) => field.name === key);
      if (field.type === "numeric") {
        form[key] = parseFloat(value);
      } else {
        if (key === "patient-name") {
          patientName = value;
        } else {
          form[key] = value;
        }
      }
    }
    var updateObject = {};
    const docRef = doc(db, "patientData", patientName);
    console.log(docRef);
    for (const [key, value] of Object.entries(form)) {
      updateObject[key] = arrayUnion(value);
    }

    await setDoc(docRef, updateObject, { merge: true });
    event.target.reset(); // behaviour could be changed here
  };

  return (
    <>
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
    </>
  );
}

export default FormGenerator;
