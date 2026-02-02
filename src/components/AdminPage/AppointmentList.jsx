// AppointmentsList.jsx
import { useEffect, useState } from "react";
import api from "../API/Api";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const patientName = user?.role === "patient" ? user.name : null;

  useEffect(() => {
    api.get("/appointments").then(res => {
      const data = patientName ? res.data.filter(a => a.patient?.toLowerCase() === patientName.toLowerCase()) : res.data;
      setAppointments(data);
    }).catch(err => console.log(err));
  }, [patientName]);

  const getReminder = (date) => {
    if (!date) return null;
    const today = new Date();
    const apptDate = new Date(date);
    today.setHours(0,0,0,0); apptDate.setHours(0,0,0,0);
    const diff = (apptDate - today)/(1000*60*60*24);
    if (diff===0) return "today"; if (diff===1) return "tomorrow"; return null;
  };

  return (
    <div>
      <h2>Appointments</h2>
      {appointments.length === 0 && <p>No appointments found</p>}
      {appointments.map(a => {
        const reminder = patientName ? getReminder(a.date) : null;
        return (
          <div key={a.id} style={{border:"1px solid #ccc", padding:10, marginBottom:10}}>
            {reminder && <p style={{color: reminder==="today"?"red":"orange"}}>You have an appointment {reminder} with Dr. {a.doctor}</p>}
            <p><b>Patient:</b> {a.patient}</p>
            <p><b>Doctor:</b> {a.doctor}</p>
            <p><b>Date:</b> {a.date}</p>
            <p><b>Time:</b> {a.time || "N/A"}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentsList;
