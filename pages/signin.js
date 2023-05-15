import React, { useEffect } from 'react';
import  Link from 'next/link';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import { Button, Container, Grid, Typography } from '@mui/material';

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const { 
    handleSubmit, 
    register, 
    formState: { errors }, 
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', { 
        redirect: false, 
        email, 
        password, 
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const useStyles = makeStyles ((theme) => ({
    container: {
      padding: '120px 0 80px 0',
      overflow: 'hidden',
      height: {
        md: '100vh !important'
      }
    },
    formContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'Center',
      // border: '1px solid ',
      padding: '40px',
      // borderRadius: '5px',

    }
  }));

  const classes = useStyles();

  return (
    <section title='Sign In' className={classes.container}>
      <Container>
        <div className={classes.formContainer}>
          <div>
            <Typography variant='h2' 
              sx={{
                fontWeight: '700', 
                fontSize: '28px', 
                padding: '20px 0',
                marginBottom: '20px',
                letterSpacing: '0.85px',
                textAlign: 'center',
                color: '#000000'
              }}
            >
              Login
            </Typography>

            <form onSubmit={handleSubmit(submitHandler)}>
              <div>
                <label htmlFor='email'      
                  // className='form-label'
                  style={{
                    // fontFamily: 'Poppins',
                    fontWeight: '700',
                    display: 'block',
                    marginBottom: '5px',
                    color: '#000',
                    fontSize: '12px',
                    lineHeight: '19px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.95px'
                  }}
                >Email</label>
                <input 
                  type="email"
                  placeholder='Enter email address' 
                  {...register('email', {required: 'Please enter email', 
                      pattern: {message: 'Please enter valid email', value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i, },
                  })}
                  // className='form-input'
                  id='email'
                  autoFocus
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    borderRadius: '5px',
                    border: '1',
                    borderStyle: 'solid',
                    borderColor: "#000",
                    height: '55px',
                    paddingLeft: '10px',
                    marginBottom: '15px',
                    color: '#000',
                    fontWeight: '700',
                    letterSpacing: '0.85px'
                  }}
                ></input>
                {errors.email && (
                  <div className="text-red">{errors.email.message}</div>
                )}
              </div>

              <div>
                <label htmlFor='password'   
                  // className='form-label'
                  style={{
                    // fontFamily: 'Poppins',
                    fontWeight: '700',
                    display: 'block',
                    marginBottom: '5px',
                    color: '#000',
                    fontSize: '12px',
                    lineHeight: '19px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.95px',
                  }}
                
                >Password</label>
                <input 
                  type="password"
                  placeholder='Enter password' 
                  {...register('password', {
                    required: 'Please enter password',
                    minLength: { value: 6, message: 'password is more than 5 chars' }, 
                  })}
                  // className='form-input'
                  id='password'
                  autoFocus
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    borderRadius: '5px',
                    border: '1',
                    borderStyle: 'solid',
                    borderColor: "#000",
                    height: '55px',
                    paddingLeft: '10px',
                    marginBottom: '15px',
                    color: '#000',
                    fontWeight: '700',
                    letterSpacing: '0.85px'
                  }}
                />
                {errors.password && (
                  <div className="text-red">{errors.password.message}</div>
                )}
              </div>

              <div 
                style={{
                    margin: '0px 0 15px 0',
                    textAlign: 'end'
                }}
              >
                <Typography 
                  variant='subtitle2'
                  component='a' 
                  href='/forgotpasword' 
                  style={{
                    color: '#927780',
                    fontWeight: '500'
                  }}
                >
                  Forgot password? 
                </Typography>
              </div>
              <div>
                <Button type='submit' 
                  variant='contained'
                  // className='create-act-btn'
                  style={{
                    width: '100%',
                    backgroundColor: '#927780',
                    height: '55px',
                    marginBottom: '20px',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    fontSize: '18px',
                    color: '#ffffff'
                  }}
                >
                  Login 
                </Button>
              </div>

              <Typography variant='body2'
                style={{
                  color: '#000',
                  textAlign: 'center'
                }}
              >
                Don&apos;t have an account? &nbsp;
                
                <Link href={`/signup?redirect=${redirect || '/'}`} >
                  <a style={{color: '#927780', fontWeight: '700'}}
                  >
                    Sign Up
                  </a>
                </Link>
              </Typography>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
