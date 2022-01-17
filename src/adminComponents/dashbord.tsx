import { Avatar, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import HotelIcon from '@mui/icons-material/Hotel';
import GroupIcon from '@mui/icons-material/Group';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import './dashbord.css';
export default function Dashbord(){
    const avatarStyle={backgroundColor:'#1d38b9', margin:'10px'}
    return(
        <div>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{padding:"100px"}}>
            <Grid item xs={6}>
                    <Card variant="outlined" style={{textAlign:'center'}} className="cardStyling">
                    <CardMedia >
                        <Grid  style={{padding:10, alignItems:'center'}}>
                            <Avatar style={avatarStyle}><HotelIcon/></Avatar>
                        </Grid>
                    </CardMedia>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Number of Hotels : 4
                        </Typography>
                    </CardContent>
                    </Card>
            </Grid>
            <Grid item xs={6}>
                    <Card variant="outlined" style={{textAlign:'center'}} className="cardStyling">
                    <CardMedia >
                        <Grid style={{padding:10, alignItems:'center'}}>
                            <Avatar style={avatarStyle}><GroupIcon/></Avatar>
                        </Grid>
                    </CardMedia>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Number of Users : 2
                        </Typography>
                    </CardContent>
                    </Card>
            </Grid>
            <Grid item xs={6}>
                    <Card variant="outlined" style={{textAlign:'center'}} className="cardStyling">
                    <CardMedia >
                        <Grid  style={{padding:10, alignItems:'center'}}>
                            <Avatar style={avatarStyle}><BedroomParentIcon/></Avatar>
                        </Grid>
                    </CardMedia>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Number of Rooms : 10
                        </Typography>
                    </CardContent>
                    </Card>
            </Grid>
            <Grid item xs={6}>
                    <Card variant="outlined" style={{textAlign:'center'}} className="cardStyling">
                    <CardMedia >
                        <Grid  style={{padding:10, alignItems:'center'}}>
                            <Avatar style={avatarStyle}><BookOnlineIcon/></Avatar>
                        </Grid>
                    </CardMedia>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Number of Reservations : 5
                        </Typography>
                    </CardContent>
                    </Card>
            </Grid>
            </Grid>
        </div>
    )
}