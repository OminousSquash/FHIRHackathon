// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { onSnapshot, collection, addDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import db from "./firebase"

const Dot = ({ colour }) => {
    const style = {
        height: 25,
        width: 25,
        margin: "0px 10px",
        backgroundColor: colour,
        borderRadius: "50%",
        display: "inline-block",
    };
    return <span style = {style}></span>;
}


export default function App(){
    const [colours, setColours] = useState([]);

    useEffect(() => 
        onSnapshot(collection(db, "colours"), (snapshot) =>
            setColours(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
        ),
        []
    );

    const handleNew = async () => {
        const name = prompt("Enter Colour Name");
        const value = prompt("Enter Colour Value");
        const collectionRef = collection(db, "colours");
        const payload = {name, value};
        await addDoc(collectionRef, payload);
    };

    return (
        <div className="root">
            <button className="button" onClick={handleNew}>
                New
            </button>
            <ul>
                {colours.map((colour) => (
                    <li key={colour.id}>
                        <a href="#">edit</a>
                        <Dot colour={colour.value}></Dot> {colour.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
