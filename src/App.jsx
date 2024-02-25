import React from "react";
import FormGenerator from "./components/FormGenerator";
import "./App.css";

// TODO: make use or router for navigation

// TODO: first, just have a form that loads the form templates given a drag and drop
//       the drag and drop will have the first option as "Create a new form" and all the remaining as pre-existing forms
//       the viewed form will have a description, and an input. However, the form metadata will have description,
//       type, expected value, and a unique name id.

function App() {
  return (
    <div className="app">
      <h1>Form Generator</h1>
      <FormGenerator />
    </div>
  );
}

export default App;
