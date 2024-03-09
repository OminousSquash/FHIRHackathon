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

async function loadNames() {
  const templatesCollectionRef = collection(db, "patientData");
  const querySnapshot = await getDocs(templatesCollectionRef) 
  const patientData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  return patientData;
}

export { loadTemplates, loadNames };
