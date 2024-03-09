import React from "react";
import { loadNames } from "../utils";
import { useState, useEffect } from "react";
import  HealthDataGraphs from "./HealthDataGraphs"


function SelectPatient() {
  const [names, setNames] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const loadedNames = await loadNames();
        setNames(loadedNames);
        console.log(names)
      } catch (error) {
        console.log("Error");
        console.log(error);
      }
    };
    fetchNames();
  }, []);

  useEffect(() => {
    console.log('HealthDataGraphs will update with ID:', selectedTemplate); 
  }, [selectedTemplate]);

  const handleTemplateSelect = (templateId) => {
    console.log("template ID " +  templateId)
    setSelectedTemplate(
      templateId
    );
  };

  return (
    <div>
      <select 
        onChange={(e) => handleTemplateSelect(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
      >
        <option value=""> Choose a patient </option>
        {names.map((name) => (
          <option key={name.id} value={name.id}>
            {name.id}
          </option>
        ))}
      </select>
      {selectedTemplate && <HealthDataGraphs id={selectedTemplate} />}
    </div>
  );
}

export default SelectPatient;
