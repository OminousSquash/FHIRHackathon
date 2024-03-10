import React from "react";
import FormGenerator from "../components/FormGenerator";
import { Link } from "react-router-dom";

function Form() {
  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 max-w-md sm:max-w-lg md:max-w-xl mx-auto">
        <span className="flex gap-4 justify-between">
          <h1 className="text-3xl font-bold">Fill in Form</h1>
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
          >
            Back
          </Link>
        </span>
        <FormGenerator />
      </div>
    </div>
  );
}

export default Form;
