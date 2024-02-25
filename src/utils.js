// This file will try to fetch the templates from the firebase
async function loadTemplates() {
  // TODO: Load templates from the server

  // placeholder data for testing
  return [
    {
      id: "1",
      name: "covid form",
      fields: [
        {
          name: "blood-pressure",
          unit: "mmHg",
          description: "Enter patient blood pressure",
          type: "numeric",
          expected: 128,
        },
        {
          name: "temperature",
          unit: "degrees Celsius",
          description: "Enter patient temperature",
          type: "numeric",
          expected: 37,
        },
        {
          name: "urine-color",
          description: "Enter patient urine color",
          type: "textual",
          expected: "light yellow",
        },
      ],
    },
    {
      id: "2",
      name: "vitals form",
      fields: [
        {
          name: "blood-pressure",
          unit: "mmHg",
          description: "Enter patient blood pressure",
          type: "numeric",
          expected: 128,
        },
        {
          name: "temperature",
          unit: "degrees Celsius",
          description: "Enter patient temperature",
          type: "numeric",
          expected: 37,
        },
      ],
    },
  ];
}

export { loadTemplates };
