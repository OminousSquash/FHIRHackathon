import React from "react";
import { useState, useEffect } from "react";
import db from "../firebase";
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

// you enter a patient's name, and from it we will get all the data associated with that patient, and based on that data
// we pass it to gpt3.5 which will generate a summary of the data
// we will then display the summary on the page

function Summary() {
  const [patientName, setPatientName] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(API_KEY);
    // for debugging, let's say patient data is just a string
    const patientData = "Patient has a fever and a cough";
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
