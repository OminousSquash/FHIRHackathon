import React from 'react' 
import { onSnapshot, collection, addDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import db from "./firebase"

function TemplateEditor() {
    const handleNew = async() => {
        var formName = prompt("Enter form name")
        var numberInputs = prompt("How many fields");
        var inputs = []
        var count = parseInt(numberInputs, 10);
        if (!isNaN(count)){
            for (var i = 0; i < count; i++){
                var fieldName = prompt("Enter field name: ");
                inputs.push(fieldName);
            }
        }
        var payload = {}
        payload["name"] = formName
        for (var i = 0; i < inputs.length; i++){
            payload["field" + (i + 1)] = inputs[i]
        }
        const collectionRef = collection(db, "formTemplates");
        await addDoc(collectionRef, payload)
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
