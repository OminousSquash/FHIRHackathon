import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import TemplateEditor from "./pages/TemplateEditor";
import SelectPatient from "./pages/SelectPatient";

// TODO: first, just have a form that loads the form templates given a drag and drop
//       the drag and drop will have the first option as "Create a new form" and all the remaining as pre-existing forms
//       the viewed form will have a description, and an input. However, the form metadata will have description,
//       type, expected value, and a unique name id.

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fill-form" element={<Form />} />
        <Route path="/create-form" element={<TemplateEditor />} />
        <Route path="/get-patient-details" element={<SelectPatient />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
