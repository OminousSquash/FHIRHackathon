import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the path based on your file structure

const BloodSampleGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "amirStuff"));
      const bloodPressureData = snapshot.docs.map(doc => {
        const docData = doc.data();
        if (docData.Time && typeof docData.Time.toDate === 'function') {
          const date = docData.Time.toDate();
          return {
            x: date,
            y: docData.BloodPressure,
          };
        } else {
          // Handle the case where 'Time' or 'BloodPressure' is undefined or not in the expected format
          console.error('Document is missing "Time" or "BloodPressure" field:', doc.id);
          return null; // Return null to filter out this document later
        }
      }).filter(Boolean) // Remove any null entries from the array
        .sort((a, b) => a.x - b.x);

      setData([
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: bloodPressureData.map(bp => bp.x),
          y: bloodPressureData.map(bp => bp.y),
          marker: {color: 'red'},
        }
      ]);
    };

    fetchData();
  }, []);

  return (
    <Plot
      data={data}
      layout={{
        width: 720, 
        height: 440, 
        title: 'Blood Pressure Over Time',
        xaxis: {
          title: 'Time',
          type: 'date',
        },
        yaxis: {
          title: 'Blood Pressure (mmHg)'
        }
      }}
    />
  );
};

export default BloodSampleGraph;