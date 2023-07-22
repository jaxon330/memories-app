import React, {useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Input from './Input';
import Icon from './icon'
import { signup, signin } from '../../actions/auth'

import useStyles from './styles';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value} )
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup) {
        dispatch(signup(formData, navigate))
    } else {
        dispatch(signin(formData, navigate))
    }
  }

  const switchMode = () => {
    setIsSignUp((prevSignUp) => !prevSignUp)
    handleShowPassword(false)
  }

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
        const token = codeResponse?.access_token;
        try {
            const profileResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: {
                Authorization: `Bearer ${token}`, // Pass the access token here
              },
            });
            const result = await profileResponse.json();
            dispatch({ type: 'AUTH', data: { result, token }})
            navigate('/')

          } catch (error) {
            console.error('Error fetching Google profile:', error);
          }
    },
    onError: error => console.log(error)
  });

  return (
    <Container component='main' maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOpenOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name='firstName' label='First name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last name' handleChange={handleChange}  half />
                            </>
                        )
                    }
                    <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}

                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                    <Button 
                        className={classes.googleButton} 
                        color='primary' 
                        fullWidth 
                        onClick={() => login() }
                        startIcon={<Icon />} 
                        variant='contained' 
                    >
                        Google Sign In
                    </Button>
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth