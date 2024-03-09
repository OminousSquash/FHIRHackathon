import React from "react";
import { useState } from "react";
import db from "../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import OpenAI from "openai";
import { Link } from "react-router-dom";

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
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsGenerating(true);

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
          content: `
This is data taken from one patient at different times. Generate a clinical discharge summary for this data. Highlight any unusual findings and provide a plan for follow-up.
Conform to just regular text, no bullet points or anything fancy.
Make it in a similar format to this. 
Professor x self-presented to ED with shortness of breath, fevers and a productive cough. On examination, she was tachycardic (HR 120) and tachypnoeic (RR 32) with right basal crackles on auscultation. A chest X-ray demonstrated right lower zone consolidation. Inflammatory markers were raised (CRP 100, WCC 23). She was treated for a community-acquired pneumonia with IV co-amoxiclav and clarithromycin. Antihypertensive medication was held, as her blood pressure was consistently ~100/80. Following rapid improvement, antibiotics have now been converted to oral. Inflammatory markers have improved (CRP 40, WCC 13). Professor McGonagall is medically optimised for discharge to complete the 5 day antibiotic course.
`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    setSummary(response.choices[0].message.content);
    setIsGenerating(false);
  };

  return (
    <div className="container mx-auto mt-12 flex flex-col items-center gap-8">
      <span className="flex gap-4">
        <h1 className="text-3xl font-bold">Patient Summary</h1>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
        >
          Back
        </Link>
      </span>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg text-center px-8"
      >
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
        >
          Generate Summary
        </button>
      </form>
      <h2 className="text-2xl font-bold">Summary</h2>
      {isGenerating && (
        <p className="text-center text-gray-500">Summarising...</p>
      )}
      {summary && (
        <div
          className="w-full max-w-3xl
       border border-gray-300 rounded-md px-3 py-2 mb-4"
        >
          {summary}
        </div>
      )}
    </div>
  );
}

export default Summary;
