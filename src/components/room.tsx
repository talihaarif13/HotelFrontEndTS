import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Dialog, Grid, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import axiosService from "../services/axiosServices";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { RootState } from "../redux/store";


interface Room {
  id: number;
  price: number;
  status: string;
}

export default function Room() {
  const dispatch = useDispatch();
  //const [rooms, setRooms] = useState([]);
  const { id } = useParams();
  const token = useSelector((state:RootState) => state.users.user?.token ? state.users.user?.token : '');
  const rooms = useSelector((state:RootState) => state.rooms);

  useEffect(() => {
    async function fetchData() {
      console.log("hotel_id", id);
      const response_rooms = await axiosService.get("room/", token, {
        params: {
          hotel_id: id,
        },
      });
      dispatch({ type: "fetchRooms", payload: { rooms: response_rooms.data } });
      //setRooms(response_rooms.data);
    }
    fetchData();
  }, [id]);

  const [roomId, setRoomId] = useState(0);
  const [startingDate, setStartingDate] = useState<Date | null>(new Date());
  const [endingDate, setEndingDate] = useState<Date | null>(new Date());

  const BookReservation = () => {
    setOpen(false);
    console.log("room id", roomId);
    const payload = {
      starting_date: startingDate,
      ending_date: endingDate,
      room_id: roomId,
      token: token,
      hotel_id: id,
    };
    dispatch({ type: "bookReservation", payload: payload });
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = (room_id: number) => {
    setRoomId(room_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const ChangeStartingDate = (newValue:Date) => {
  //     console.log(newValue);
  //     setStartingDate(newValue);
  // };

  // const ChangeEndingDate = (newValue:Date) => {
  //     console.log(newValue);
  //     setEndingDate(newValue);
  // };

  return (
    <Grid
      style={{ marginLeft: "100px", marginRight: "50px", paddingTop: "30px" }}
    >
      <Table>
        <TableHead style={{ backgroundColor: "#1717cf" }}>
          <TableRow>
            <TableCell
              style={{ color: "#e0e0e0", fontWeight: "bold", fontSize: "20px" }}
            >
              Number
            </TableCell>
            <TableCell
              style={{ color: "#e0e0e0", fontWeight: "bold", fontSize: "20px" }}
            >
              Price
            </TableCell>
            <TableCell
              style={{ color: "#e0e0e0", fontWeight: "bold", fontSize: "20px" }}
            >
              Status
            </TableCell>
            <TableCell
              style={{ color: "#e0e0e0", fontWeight: "bold", fontSize: "20px" }}
            >
              Reserve
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rooms &&
            rooms.map((room: Room) => (
              <TableRow hover key={room.id}>
                <TableCell component="th" scope="row">
                  {room.id}
                </TableCell>
                <TableCell>{room.price}</TableCell>
                <TableCell>{room.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      handleClickOpen(room.id);
                    }}
                  >
                    Reserve Room
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <DialogTitle
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Make Reservation
        </DialogTitle>
        <DialogContent style={{ padding: "20px" }}>
          <Grid alignItems="center" justifyContent="center">
            <Grid item sm={8} style={{ paddingLeft: "160px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Staring Date"
                  inputFormat="MM/dd/yyyy"
                  value={startingDate}
                  onChange={(date) => date && setStartingDate(date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              sm={8}
              style={{ paddingLeft: "160px", paddingTop: "10px" }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Ending Date"
                  inputFormat="MM/dd/yyyy"
                  value={endingDate}
                  onChange={(date) => date && setEndingDate(date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{
              backgroundColor: "#E54949",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={BookReservation}
            variant="contained"
            style={{ color: "white", fontWeight: "bold" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
