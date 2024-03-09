import React from "react";
import { loadNames } from "../utils"; 
import { doc, getDoc, collection, getDocs } from "@firebase/firestore";
import { useState, useEffect } from "react";
import db from "./firebase";

function SelectPatient(){
    const [names, setNames] = useState([])

    useEffect(() => {
        const fetchNames = async () => {
            try{
                const loadedNames = await loadNames()
                console.log(loadedNames)
                setNames(loadedNames)
            } catch (error){
                console.log("Error")
                console.log(error)
            }
        }
        fetchNames()
    }, []);

    return (
        <div>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4">
                <option value=""> Choose a patient </option>
                {names.map((name) => (
                    <option key={name.id} value={name.id}>
                        {name.id}
                    </option>
                ))}
            </select>
        </div>
    ); 
}


export default SelectPatient; 