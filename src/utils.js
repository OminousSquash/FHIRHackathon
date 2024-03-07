//   // placeholder data for testing
//   return [
//     {
//       id: "1",
//       name: "covid form",
//       fields: [
//         {
//           name: "blood-pressure",
//           unit: "mmHg",
//           description: "Enter patient blood pressure",
//           type: "numeric",
//           expected: 128,
//         },
//         {
//           name: "temperature",
//           unit: "degrees Celsius",
//           description: "Enter patient temperature",
//           type: "numeric",
//           expected: 37,
//         },
//         {
//           name: "urine-color",
//           description: "Enter patient urine color",
//           type: "textual",
//           expected: "light yellow",
//         },
//       ],
//     },
//     {
//       id: "2",
//       name: "vitals form",
//       fields: [
//         {
//           name: "blood-pressure",
//           unit: "mmHg",
//           description: "Enter patient blood pressure",
//           type: "numeric",
//           expected: 128,
//         },
//         {
//           name: "temperature",
//           unit: "degrees Celsius",
//           description: "Enter patient temperature",
//           type: "numeric",
//           expected: 37,
//         },
//       ],
//     },
//   ];
// }

import { collection, getDocs } from "firebase/firestore";
import db from "./pages/firebase";

async function loadTemplates() {
  console.log("Loading templates...");
  const templatesCollectionRef = collection(db, "formTemplates");
  console.log("Templates collection ref");
  const querySnapshot = await getDocs(templatesCollectionRef);
  console.log("Query snapshot");

  const templates = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("Templates brooo", templates);
  return templates;
}

export { loadTemplates };
