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
  const querySnapshot = await getDocs(templatesCollectionRef) 
  const patientData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  return patientData;
}

export { loadTemplates, loadNames };
