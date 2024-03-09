import { collection, getDocs } from "firebase/firestore";
import db from "./firebase";

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

  return templates;
}

export { loadTemplates };
