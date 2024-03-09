import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { doc, getDoc } from 'firebase/firestore';
import db from "../firebase"

function HealthDataGraphs({ id }) {

  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "patientData", id); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const docData = docSnap.data();
          console.log('Fetched data:', docData); // Log the fetched data

          if (!docData.time || !Array.isArray(docData.time)) {
            throw new Error('Time data is missing or not an array');
          }

          const timeStamps = docData.time.map(t => {
            const [hours, minutes, seconds] = t.split(':');
            const date = new Date();
            date.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10));
            return date;
          });

          const numericFields = Object.keys(docData)
            .filter(key => Array.isArray(docData[key]) && docData[key].every(item => typeof item === 'number'));

          const newPlotData = numericFields.map(field => ({
            type: 'scatter',
            mode: 'lines+markers',
            name: field.replace(/_/g, ' '), // Replace underscores with spaces for the title
            x: timeStamps,
            y: docData[field],
            marker: { size: 8 }
          }));

          setPlotData(newPlotData);
        } else {
          console.error('Document does not exist');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {plotData.map((data, index) => (
        <Plot
          key={index}
          data={[data]}
          layout={{
            width: 720,
            height: 440,
            title: `${data.name} Over Time`,
            xaxis: {
              title: 'Time',
              type: 'date',
            },
            yaxis: {
              title: data.name,
            }
          }}
        />
      ))}
    </div>
  );
};

export default HealthDataGraphs;