import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminDashboard from "./components/AdminPage/AdminDashboard";
import Appointments from "./components/AdminPage/Appointments";
import AddMedicalRecords from "./components/AdminPage/AddMedicalRecords";
import AddPrescription from "./components/AdminPage/AddPrescription";
import DoctorsDashboard from "./components/Doctor/DoctorsDashboard";
import DoctorAppointments from "./components/Doctor/DoctorAppointments";
import DoctorPrescriptions from "./components/Doctor/DoctorPrescriptions";
import MedicalRecords from "./components/Doctor/MedicalRecords";
import DoctorsList from "./components/Doctor/DoctorsList";
import PatientDashboard from "./components/Patient/PatientDashboard";
import PatientList from "./components/Patient/PatientList";
import PatientDetails from "./components/Patient/PatientDetails";
import Service from "./components/Home/Service";
import Contact from "./components/Home/Contact";
import Help from "./components/Home/Help";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import Home from "./components/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoutes allowedRole="admin" />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/doctors" element={<DoctorsList />} />
          <Route path="/admin/patients" element={<PatientList />} />
          <Route path="/admin/patients/:id" element={<PatientDetails />} />
          <Route path="/admin/records" element={<MedicalRecords />} />
          <Route path="/admin/appointments" element={<Appointments />} />
          <Route path="/admin/addMedicalRecord" element={<AddMedicalRecords />} />
          <Route path="/admin/addPrescription" element={<AddPrescription />} />
          <Route path="/admin/doctorAppointments" element={<DoctorAppointments />} />
          <Route path="/admin/doctorPrescriptions" element={<DoctorPrescriptions />} />
        </Route>

        {/* Patient Protected Routes */}
        <Route element={<ProtectedRoutes allowedRole="patient" />}>
          <Route path="/patientDashboard" element={<PatientDashboard />} />
        </Route>

        {/* Doctor Protected Routes */}
        <Route element={<ProtectedRoutes allowedRole="doctor" />}>
          <Route path="/doctorDashboard" element={<DoctorsDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
