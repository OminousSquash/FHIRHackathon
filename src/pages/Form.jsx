import React from "react";
import FormGenerator from "../components/FormGenerator";

function Form() {
  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 max-w-md sm:max-w-lg md:max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Fill in Form</h1>
        <FormGenerator />
      </div>
    </div>
  );
}

export default Form;
