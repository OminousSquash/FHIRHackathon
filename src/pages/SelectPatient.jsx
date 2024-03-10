import React from "react";
import { loadNames } from "../utils";
import { useState, useEffect } from "react";
import HealthDataGraphs from "./HealthDataGraphs";

function SelectPatient() {
  const [names, setNames] = useState([]);
  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const loadedNames = await loadNames();
        setNames(loadedNames);
      } catch (error) {
        console.log("Error");
        console.log(error);
      }
    };
    fetchNames();
  }, []);

  const handlePatientSelect = (id) => {
    setPatientId(id);
  };

  return (
    <div>
      <select
        onChange={(e) => handlePatientSelect(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
      >
        <option value=""> Choose a patient </option>
        {names.map((name) => (
          <option key={name.id} value={name.id}>
            {name.id}
          </option>
        ))}
      </select>
      {patientId && <HealthDataGraphs patientId={patientId} />}
    </div>
  );
}

export default SelectPatient;
