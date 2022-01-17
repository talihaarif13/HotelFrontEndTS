import react from "react";
import Login from "./components/login";
import Home from './components/home';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./components/main";
import Hotel from "./components/hotel";
import Room from "./components/room";
import Reservation from "./components/reservations";
import AdminHome from "./adminComponents/home";
import Dashbord from "./adminComponents/dashbord";
import AdminHotel from "./adminComponents/adminHotels";
import AdminReservation from "./adminComponents/adminReservations";
import AdminLogin from "./adminComponents/adminLogin";
import RequireAdminAuth from "./adminComponents/requireAuth";
import AdminRoom from "./adminComponents/adminRoom";

function App() {
  return(
    <div>
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Admin/Login" element={<AdminLogin/>}/>

        <Route path= "/admin" element={<AdminHome/>}>
          
          <Route path="Dashbord" element={ <Dashbord/>}/>
            <Route path="Hotel" element={<AdminHotel/>}/>
              {/* <Route path="Login" element={<Login/>}/> */}
              <Route path="/admin/room/:id" element={<AdminRoom/>}/>
            <Route path="Reservations" element={<AdminReservation/>}/>
          </Route>

          <Route path= "/" element={<Home/>}>
            <Route path="Hotel" element={<Hotel/>}/>
            <Route path="room/:id" element={<Room/>}/>
            <Route path="Reservations" element={<Reservation/>}/>
          </Route>

        </Routes>
    </div>
  )
}

export default App;



