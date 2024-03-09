import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mx-auto mt-12 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold mb-4">
        Fill in or Create Discharge Form
      </h1>

      <div className="grid grid-cols-2 gap-8 sm:max-w-xl md:max-w-3xl">
        <Link
          to="/fill-form"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded-md shadow-md"
        >
          <h1 className="text-xl text-center">Fill in a Form</h1>
          <p className="text-gray-200">
            Select a template and start entering data.
          </p>
        </Link>

        <Link
          to="/create-form"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-6 px-8 rounded-md shadow-md"
        >
          <h1 className="text-xl text-center">Create a New Template</h1>
          <p className="text-gray-200">
            Design a custom form template for future use.
          </p>
        </Link>
        <Link
          to="/summary"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-8 rounded-md shadow-md"
        >
          <h1 className="text-xl text-center">Summary</h1>
          <p className="text-gray-200">Generate a summary of patient data.</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
