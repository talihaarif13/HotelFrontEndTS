import './login.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  TextField, Grid, Button, Paper, Avatar, Alert, Link} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';

function Login(){

    const paperstyle = {padding:20, height:"70vh", width:280, margin: "20px auto"}
    const avatarStyle={backgroundColor:'#1d38b9'}
    const btnstyle={margin:'8px 0'}

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const aunthenticate = useSelector((state:RootState)=> state.users?.authenticated);
    const loginApi = () => {
        const payload = {
            email : email,
            password: password
        }
        dispatch({type: "userLogin", payload:payload});
        console.log(aunthenticate);
    }

    useEffect(() => {
        console.log('here');
        aunthenticate == true && navigate("/Hotel");
    }, [aunthenticate])


    const error = useSelector((state :RootState)=> state.users?.error);
    return(
        <div>
            <Grid>
                <Grid >
                    <Paper elevation={10} style={paperstyle} >
                        {error ? <Alert severity='error'>{error}</Alert> : <></> }
                        <Grid  style={{padding:"50px", marginLeft: "50px"}}>
                            <Avatar style={avatarStyle}><LoginIcon/></Avatar>
                            <h2>LOGIN</h2>
                        </Grid>
                        <TextField id="email" label="Email" variant="standard" required placeholder="Enter Email" fullWidth value={email} onChange={handleEmailChange}/>
                        <TextField id="password" label="Password" variant="standard" required placeholder="Enter Password" type="password" fullWidth value={password} onChange={handlePasswordChange}/>
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={loginApi}>Sign in</Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
export default Login