import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Grid } from "@mui/material";
import axiosService from "../services/axiosServices";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { format, parseISO } from "date-fns";
import { RootState } from "../redux/store";

interface IState {
  reservation: {
    id: number;
    room_id: number;
    starting_date: string;
    ending_date: string;
  }[];
}
export default function Reservation() {
  const dispatch = useDispatch();
  const [reservations, setReservations] = useState<IState["reservation"]>([]);
  const token = useSelector((state:RootState) => state.users?.user?.token);
  useEffect(() => {
    async function fetchData() {
      const user_reservations = await axiosService.get(
        "user/fetchReservations",
        token,
        ""
      );
      setReservations(user_reservations.data);
      setTimeout(() => {
        console.log("reser", reservations);
      }, 1000);
    }
    fetchData();
  }, []);

  const cancelReservation = (room_id: number) => {
    console.log("reserved room id ", room_id, typeof room_id);
    dispatch({
      type: "cancelReservation",
      payload: { room_id: room_id, token: token },
    });
    console.log("this", [
      ...reservations.filter((item, index) => item.room_id !== room_id),
    ]);
    setReservations([
      ...reservations.filter((item, index) => item.room_id !== room_id),
    ]);
    setTimeout(() => {
      console.log("reservation state", reservations);
    }, 2000);
  };
  return (
    <Grid
      style={{ marginLeft: "100px", marginRight: "50px", paddingTop: "30px" }}
    >
      <Table>
        <TableHead style={{ backgroundColor: "#1717cf" }}>
          <TableRow>
            <TableCell
              style={{ color: "#e0e0e0", fontWeight: "bold", fontSize: "15px" }}
            >
              Room Number
            </TableCell>
            <TableCell
              style={{ color: "#e0e0e0", fontWeight: "bold", fontSize: "15px" }}
            >
              Starting Date
            </TableCell>
            <TableCell
              style={{ color: "#e0e0e0", fontWeight: "bold", fontSize: "15px" }}
            >
              Ending Date
            </TableCell>
            <TableCell
              style={{ color: "#e0e0e0", fontWeight: "bold", fontSize: "15px" }}
            >
              Cancel Reservation
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {reservations &&
            reservations.map((reservation) => (
              <TableRow hover key={reservation.id}>
                <TableCell>{reservation.room_id}</TableCell>
                <TableCell>
                  {format(parseISO(reservation.starting_date), "dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  {format(parseISO(reservation.ending_date), "dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      cancelReservation(reservation.room_id);
                    }}
                    style={{
                      backgroundColor: "#E54949",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    startIcon={<DeleteIcon />}
                    size="small"
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Grid>
  );
}
