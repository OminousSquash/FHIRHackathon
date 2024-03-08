import React from "react";

function TemplateCard({ template, onEdit, onDelete }) {
  const fieldSummary = template.fields.slice(1, 3).map((field) => (
    <p key={field.name} className="text-sm text-gray-700">
      {field.description}
    </p>
  ));

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer border border-gray-200 max-w-sm"
      onClick={onEdit}
    >
      <h3 className="text-lg font-bold mb-2 text-center">{template.name}</h3>
      <div className="text-gray-600 m-4">{fieldSummary}</div>
      <div className="mt-4 flex justify-center">
        {" "}
        {/* Container for centering the button */}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-full focus:outline-none focus:shadow-outline text-sm"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(template.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TemplateCard;
