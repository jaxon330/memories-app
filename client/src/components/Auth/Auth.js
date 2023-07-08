import React, {useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useGoogleLogin } from '@react-oauth/google';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Input from './Input';
import Icon from './icon'

import useStyles from './styles';

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false)

  const [isSignup, setIsSignUp] = useState(true)

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleChange = () => {

  }
  const switchMode = () => {
    setIsSignUp((prevSignUp) => !prevSignUp)
    handleShowPassword(false)
  }

  const login = useGoogleLogin({
    onSuccess: async codeResponse => {
        console.log(codeResponse)
    },
    onError: error => console.log(error)
  });

//   const googleSuccess = async (res) => {
//     console.log(res);
//   }

//   const googleFailure = (error) => {
//     console.log(error);
//     console.log('Google Sign In was unsuccessfull. Try again later')
//   }
  return (
    <Container component='main' maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOpenOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form}>
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