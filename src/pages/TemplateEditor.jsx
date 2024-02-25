import React from 'react' 
import { onSnapshot, collection, addDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import db from "./firebase"

function TemplateEditor() {
    const handleNew = async() => {
        const name = prompt ("Enter form name")
        const field1 = prompt("Enter first field name")
        const field2 = prompt ("Enter second field name")
        const collectionsRef = collection(db, "formTemplates")
        const payload = {name, field1, field2}
        await addDoc(collectionsRef, payload);
    }

    return (
        <div className="root">
            <button className="button" onClick = {handleNew}>
                Add Form
            </button>
        </div>
    )
}

export default TemplateEditor;
