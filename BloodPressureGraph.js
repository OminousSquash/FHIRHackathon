import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the path based on your file structure

const HealthDataGraphs = () => {
  const [bloodPressurePlotData, setBloodPressurePlotData] = useState({});
  const [temperaturePlotData, setTemperaturePlotData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "patientData", "Amir");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data();
        console.log('Document data:', docData);
        // Create Date objects for timestamps, assuming they are stored in the format "HH:MM:SS"
        const timeStamps = docData.time.map(t => {
          const [hours, minutes, seconds] = t.split(':');
          // Create a new Date object for today's date at the specified time
          const date = new Date();
          date.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10));
          return date;
        });

        // Prepare blood pressure data for plotting
        const bloodPressureData = {
          type: 'scatter',
          mode: 'lines+markers',
          x: timeStamps,
          y: docData['blood pressure'],//.map(value => parseFloat(value)),
          marker: { color: 'red' },
        };

        // Prepare temperature data for plotting
        const temperatureData = {
          type: 'scatter',
          mode: 'lines+markers',
          x: timeStamps,
          y: docData.temperature,
          marker: { color: 'blue' },
        };

        setBloodPressurePlotData(bloodPressureData);
        setTemperaturePlotData(temperatureData);
      } else {
        console.error('Document not found or data is in an unexpected format.');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Plot
        data={[bloodPressurePlotData]}
        layout={{
          width: 720,
          height: 440,
          title: 'Blood Pressure Over Time',
          xaxis: {
            title: 'Time',
            type: 'date',
          },
          yaxis: {
            title: 'Blood Pressure (mmHg)',
            //range: [80, 180],
          }
        }}
      />
      <Plot
        data={[temperaturePlotData]}
        layout={{
          width: 720,
          height: 440,
          title: 'Temperature Over Time',
          xaxis: {
            title: 'Time',
            type: 'date',
          },
          yaxis: {
            title: 'Temperature (°C)',
          }
        }}
      />
    </div>
  );
};

export default HealthDataGraphs;
