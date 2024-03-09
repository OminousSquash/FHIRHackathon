import React from "react";
import { useState, useEffect } from "react";
import db from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import OpenAI from "openai";

async function getAPIKey() {
  const response = await fetch("../api_key.txt");
  const text = await response.text();
  return text;
}

const API_KEY = await getAPIKey();

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});

function organizeData(data) {
  let fieldNames = Object.keys(data);
  let organizedData = fieldNames.join(", ") + "\n";
  let fieldValues = Object.values(data);
  let numEntries = fieldValues[0].length;
  for (let i = 0; i < numEntries; i++) {
    let line = "";
    for (let j = 0; j < fieldNames.length; j++) {
      line += fieldValues[j][i] + ", ";
    }
    organizedData += line + "\n";
  }
  return organizedData;
}

function Summary() {
  const [patientName, setPatientName] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let patientData = collection(db, "patientData");
    const patientDataDoc = doc(patientData, patientName);
    const patientDataSnapshot = await getDoc(patientDataDoc);
    patientData = organizeData(patientDataSnapshot.data());

    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a patient data summarizer" },
        { role: "user", content: patientData },
        {
          role: "system",
          content: "What is the summary of this patient's data?",
        },
      ],
      model: "gpt-3.5-turbo",
    });
    setSummary(response.choices[0].message.content);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Patient Name:
          <input
            type="text"
            value={patientName}
            onChange={(event) => setPatientName(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>{summary}</div>
    </div>
  );
}

export default Summary;
