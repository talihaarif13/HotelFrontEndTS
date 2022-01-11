import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axiosService from '../services/axiosServices';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input, TextField } from '@mui/material';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const AdminHotel = () => {
    const dispatch = useDispatch();
    
    const token = useSelector(state => state.users?.user?.token);
    const hotels = useSelector(state => state.hotels);
    

    useEffect(async () => {
        const response_hotels = await axiosService.get("hotel/", token, "");
        console.log(response_hotels.data);
        dispatch({type:'fetchHotels', payload:{hotels:response_hotels.data}});
    }, []);


    const [open, setOpen] = useState(false);
    const handleClickOpen = (e) => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [fileName, setFileName] = useState('');
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };
    const fileSelectedHandler = (event) => {
        let file = event.target.files[0].name;
        setSelectedFile(event.target.files[0]);
        setFileName(file);
        console.log(file);
    }

    const fileUploadHandler = (event) => {
        event.preventDefault();
        setOpen(false);
        let formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('filename', fileName);
        formData.append('picture', selectedFile);
      
        const config = {     
            headers: { 
                'content-type': 'multipart/form-data',
                'token' : token
            }
        }
        console.log('here ia am');
        axios.post("http://localhost:3000/hotel/", formData, config)
            .then (res => {
                console.log("response", res.data);
                dispatch({type:'createHotel', payload:{hotel:res.data}});
                console.log(res.data);
                console.log(fileName);
                console.log(formData);
            })
    }

    const adminDeleteHotel = (hotel_id) => {
        console.log("delete hotel admin", hotel_id);
        dispatch({type:'deleteHotels', payload:{token:token, id:hotel_id}});
    }


    return (
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{padding:"100px"}}>
            <Grid item xs={10}>
                <Button size="large" variant='contained' startIcon={<AddIcon />} style={{color:"white", fontWeight:"bold"}} onClick={handleClickOpen}>Add New Hotel</Button>
            </Grid>
            {hotels && hotels.map((hotel) => (
                <Grid item xs={6} key={hotel.id}>
                <Card variant="outlined">
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={hotel.picture}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {hotel.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {hotel.address}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant='contained' style={{color:"white", fontWeight:"bold"}}><Link to={"/admin/room/" + hotel.id }>Show Rooms</Link></Button>
                        <Button size = "small" onClick={() => {adminDeleteHotel(hotel.id);}}  style={{backgroundColor: "#E54949", color:"white", fontWeight:"bold"}}>Delete Hotel</Button>
                    </CardActions>
                </Card>
                </Grid>
            ))}
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
                <DialogTitle style={{backgroundColor:"#1976d2", color:"white", fontWeight:"bold", textAlign:"center"}}>Add New Hotel</DialogTitle>
                    <DialogContent style={{padding:"20px"}}>
                    <Grid alignItems="center" justifyContent="center">
                        <form encType="multipart/form">
                            <TextField id="name" label="Name" variant="standard" required placeholder="Enter Name" fullWidth value={name} onChange={handleNameChange}/>
                            <TextField id="address" label="Address" variant="standard" required placeholder="Enter Address"  fullWidth value={address} onChange={handleAddressChange}/>
                            <Input id="file" accept="image/*" variant="standard" required placeholder="Upload your file" fullWidth type="file"  onChange={fileSelectedHandler}/>
                        </form>
                    </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant='contained' style={{backgroundColor: "#E54949", color:"white", fontWeight:"bold"}}>Cancel</Button>
                        <Button  variant='contained' style={{color:"white", fontWeight:"bold"}} onClick={fileUploadHandler}>Save</Button>
                    </DialogActions>
            </Dialog>
        </Grid>
    );
}
export default AdminHotel;

// onClick={BookReservation}
// onClick={this.fileUploadHandler}
//onChange={this.fileSelectedHandler}
//onChange={this.handleChange}
//onChange={this.handleChange}