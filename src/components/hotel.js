import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axiosService from '../services/axiosServices';
import { Grid } from '@mui/material';
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Hotel() {
    const [hotels, setHotels] = useState([]);
    const token = useSelector(state => state.users?.user?.token);
    
    useEffect(async () => {
        const response_hotels = await axiosService.get("hotel/", token, "");
        console.log(response_hotels.data);
        setHotels(response_hotels.data);
    }, []);

    return (
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{padding:"100px"}} >
            {hotels && hotels.map((hotel) => (
                <Grid item md={6}  key={hotel.id}>
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
                        <Button size="small"><Link to={"/room/" + hotel.id }>Show Rooms</Link></Button>
                    </CardActions>
                </Card>
                </Grid>
            ))}
        </Grid>
    );
}