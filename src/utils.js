import { collection, getDocs } from "firebase/firestore";
import db from "./firebase";

async function loadTemplates() {
  const templatesCollectionRef = collection(db, "formTemplates");
  const querySnapshot = await getDocs(templatesCollectionRef);
  const templates = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return templates;
}

async function loadNames() {
  const templatesCollectionRef = collection(db, "patientData");
  const querySnapshot = await getDocs(templatesCollectionRef);
  const patientData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return patientData;
}

async function loadApiKey() {
  const apiKeyCollectionRef = collection(db, "OPENAI_API_KEY");
  const querySnapshot = await getDocs(apiKeyCollectionRef);
  const apiKey = querySnapshot.docs[0].id;
  return apiKey;
}

export { loadTemplates, loadNames, loadApiKey };
