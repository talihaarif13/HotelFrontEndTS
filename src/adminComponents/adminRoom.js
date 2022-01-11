import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Dialog, Grid, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import axiosService from '../services/axiosServices';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';


export default function AdminRoom() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const token = useSelector(state => state.users?.user?.token);
    const rooms = useSelector(state => state.rooms);

    useEffect(() => {
        async function fetchData() {
            console.log("hotel_id", id);
            const response_rooms = await axiosService.get('room/', token, {
                params: {
                  hotel_id: id
                }
            });
            dispatch({type: 'fetchRooms', payload: {rooms: response_rooms.data} });
        }
        fetchData();
    }, [id]);

    
    const [open, setOpen] = useState(false);
    const [addRoomOpen, setAddRoomOpen] = useState(false);
    const [roomId, setRoomId] = useState(0);
    const [price, setPrice] = useState('');

    const handleClickOpen = (room_id) => {
        console.log('room id', room_id);
        setRoomId(room_id);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
        console.log('new price ', price, typeof(price));
    }
    const UpdateRoom = () => {
        setOpen(false);
        console.log('room id on click', roomId);
        const payload = {
            price : price,
            room_id: roomId,
            token: token
        }
        dispatch({type: "updateRoom", payload:payload});
    }

    const handleAddClickOpen = () => {
        setAddRoomOpen(true);
    };
    const handleAddClose = () => {
        setAddRoomOpen(false);
    };
    const AddRoom = () => {
        setAddRoomOpen(false);
        console.log('hotel id on click', id);
        const payload = {
            price : price,
            hotel_id: id,
            token: token
        }
        dispatch({type: "addRoom", payload:payload});
    }


    return (
        
        <Grid style={{marginLeft:"100px",marginRight:"50px" , paddingTop:"30px"}} >
            <Grid item xs={10} style={{paddingBottom:"20px"}} >
                <Button size="large" variant='contained' startIcon={<AddIcon />} style={{color:"white", fontWeight:"bold"}} onClick={handleAddClickOpen}>Add New Room</Button>
            </Grid>
            <Table>
                <TableHead style={{backgroundColor: "#1717cf"}}>
                    <TableRow >
                        <TableCell style={{color:"#e0e0e0",fontWeight:"bold", fontSize:"20px"}}>Number</TableCell>
                        <TableCell style={{color:"#e0e0e0", fontWeight:"bold", fontSize:"20px"}}>Price</TableCell>
                        <TableCell style={{color:"#e0e0e0", fontWeight:"bold", fontSize:"20px"}}>Status</TableCell>
                        <TableCell style={{color:"#e0e0e0", fontWeight:"bold", fontSize:"20px"}}>Update Room</TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                {rooms && rooms.map((room) => (
                <TableRow hover key={room.id} >
                    <TableCell component="th" scope="row">
                    {room.id}
                    </TableCell>
                    <TableCell >{room.price}</TableCell>
                    <TableCell >{room.status}</TableCell>
                    <TableCell ><Button variant="contained" size='small' onClick={() => {handleClickOpen(room.id);}} >Update Room</Button></TableCell>
                </TableRow>
                
                ))}
                </TableBody>
            </Table>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
                <DialogTitle style={{backgroundColor:"#1976d2", color:"white", fontWeight:"bold", textAlign:"center"}}>Update Room</DialogTitle>
                    <DialogContent style={{padding:"20px"}}>
                    <Grid alignItems="center" justifyContent="center">
                        <Grid item sm={8} style={{paddingLeft:"160px"}}>

                            <TextField id="price" label="Price" 
                                variant="standard" required 
                                placeholder="Enter New Price" fullWidth value={price} 
                                onChange={handlePriceChange}
                            />
                        </Grid>
                    </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant='contained' style={{backgroundColor: "#E54949", color:"white", fontWeight:"bold"}}>Cancel</Button>
                        <Button onClick={UpdateRoom} variant='contained' style={{color:"white", fontWeight:"bold"}}>Save</Button>
                    </DialogActions>
            </Dialog>
            <Dialog open={addRoomOpen} onClose={handleAddClose} fullWidth={true} maxWidth='sm'>
                <DialogTitle style={{backgroundColor:"#1976d2", color:"white", fontWeight:"bold", textAlign:"center"}}>Add Room</DialogTitle>
                    <DialogContent style={{padding:"20px"}}>
                    <Grid alignItems="center" justifyContent="center">
                        <Grid item sm={8} style={{paddingLeft:"160px"}}>

                            <TextField id="price" label="Price" 
                                variant="standard" required 
                                placeholder="Enter New Price" fullWidth value={price} 
                                onChange={handlePriceChange}
                            />
                        </Grid>
                    </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddClose} variant='contained' style={{backgroundColor: "#E54949", color:"white", fontWeight:"bold"}}>Cancel</Button>
                        <Button onClick={AddRoom} variant='contained' style={{color:"white", fontWeight:"bold"}}>Save</Button>
                    </DialogActions>
            </Dialog>
            
        </Grid>
        
    );
}
