import React, { useEffect } from 'react';
import  Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Axios } from 'axios';
import { makeStyles } from '@mui/styles';
import { Button, Container, Typography } from '@mui/material';


export default function SignupScreen() {
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
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      await Axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });

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
      padding: '120px 0 60px 0',
      overflow: 'hidden',
      minHeight: {
        md: '100vh !important',
        lg: '100vh !important'
      }
    },
    formContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'Center',
      // border: '1px solid ',
      padding: '40px',
      // borderRadius: '5px'
    }, 
    formInput: {
      width: '100%',
      backgroundColor: 'transparent',
      borderRadius: '5px',
      border: '1',
      borderStyle: 'solid',
      borderColor: "#000",
      height: '55px',
      paddingLeft: '10px',
      marginBottom: '15px',
      color: '#000000',
      fontWeight: '700',
      letterSpacing: '0.85px',

      '&:active': {
        background: '#F2F2F2 !important',
        borderRadius: '2px',
        border: '1',
        borderStyle: 'solid',
        borderColor: "#927780 !important",
        height: '55px',
        paddingLeft: '10px',
        marginBottom: '15px',
        color: '#000000 !important',
      },
      '&:hover': {
        background: '#F2F2F2 !important',
        borderRadius: '2px',
        border: '1',
        borderStyle: 'solid',
        borderColor: "#927780 !important",
        height: '55px',
        paddingLeft: '10px',
        marginBottom: '15px',
        color: '#000000 !important',
      },
      '&:focus': {
        background: '#F2F2F2 !important',
        borderRadius: '2px',
        border: '1',
        borderStyle: 'solid',
        borderColor: "#927780 !important",
        height: '55px',
        paddingLeft: '10px',
        marginBottom: '15px',
        color: '#000000 !important',
      },
    },
    textRed: {
      color: '#9b0404',
      fontFamily: 'Fauna One',
      fontWeight: '400',
      fontSize: '12px',
    }
  }));

  const classes = useStyles();

  return (
    <section title='Create Account' className={classes.container}>
        <Container 
          // className='container'
        >
          <div  className={classes.formContainer}>
            <div>
              <Typography variant='h2' 
                sx={{
                  fontWeight: '700', 
                  fontSize: '28px', 
                  padding: '20px 0',
                  marginBottom: '20px',
                  letterSpacing: '0.85px',
                  textAlign: 'center',
                }}
              >
                Welcome
              </Typography>
              <Typography variant='body2' 
                sx={{
                  fontWeight: '500', 
                  fontSize: '16px', 
                  padding: '20px 0',
                  marginBottom: '20px',
                  letterSpacing: '0.85px',
                  textAlign: 'center',
                }}
              >
                Create an account
              </Typography>

              <form onSubmit={handleSubmit(submitHandler)}>
                <div>
                  <label htmlFor='name' 
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
                  >
                    Full Name
                  </label>
                  <input 
                    type="name" 
                    id='name'
                    placeholder='enter full name'
                    // className='form-input' 
                    {...register('name', {
                      required: 'Please enter full name',
                    })}

                    className={classes.formInput}
                  />
                  {errors.name && (
                    <div className={classes.textRed}>{errors.name.message}</div>
                  )}
                </div>

                {/* <div>
                  <label htmlFor='lastName' className='form-label'>Last Name</label>
                  <input 
                    type="lastName" 
                    placeholder='enter last name' 
                    className='form-input' 
                    id='lastName'
                    {...register('lastName', {
                      required: 'Please enter last name',
                    })}
                  />
                  {errors.lastName && (
                    <div className="text-red-500">{errors.lastName.message}</div>
                  )}
                </div> */}

                <div>
                  <label htmlFor='email' 
                    style={{
                      fontFamily: 'Poppins',
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
                    placeholder='enter email address '
                    //  className='form-input'
                    id='email'
                    {...register('email', {
                      required: 'Please enter email',
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                        message: 'Please enter valid email',
                      },
                    })}

                    className={classes.formInput}
                  />
                  {errors.email && (
                    <div className={classes.textRed}>{errors.email.message}</div>
                  )}
                </div>

                <div>
                  <label htmlFor='password' 
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: '700',
                      display: 'block',
                      marginBottom: '5px',
                      color: '#000',
                      fontSize: '12px',
                      lineHeight: '19px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.95px'
                    }}
                  >Password</label>
                  <input 
                    type="password" 
                    placeholder='enter password' 
                    // className='form-input' 
                    {...register('password', {
                      required: 'Please enter password',
                      minLength: { value: 6, message: 'password is more than 5 chars' },
                    })}
                    id='password'
                    className={classes.formInput}
                  />
                  {errors.password && (
                    <div className={classes.textRed}>{errors.password.message}</div>
                  )}
                </div>

                <div>
                  <label htmlFor='confirmPassword'  
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: '700',
                      display: 'block',
                      marginBottom: '5px',
                      color: '#000',
                      fontSize: '12px',
                      lineHeight: '19px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.95px'
                    }}
                  >Confirm Password</label>
                  <input 
                    type='password' 
                    placeholder='enter password' 
                    // className='form-input' 
                    id='confirmPassword'
                    {...register('confirmPassword', {
                      required: 'Please enter confirm password',
                      validate: (value) => value === getValues('password'),
                      minLength: {
                        value: 6,
                        message: 'confirm password is more than 5 chars',
                      },
                    })}
                    className={classes.formInput}
                  />
                  {errors.confirmPassword && (
                    <div className={classes.textRed}>
                      {errors.confirmPassword.message}
                    </div>
                  )}
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === 'validate' && (
                      <div className={classes.textRed}>Password do not match</div>
                  )}
                </div>
                {/* <div>
                  <label htmlFor='phone' className='form-label'>Phone No.</label>
                  <input type='phone' placeholder='+234801234567' className='form-input' />
                </div> */}
                <div>
                  <Button type='submit' 
                    variant='contained'
                    // className='create-act-btn'
                    style={{
                      width: '340px',
                      backgroundColor: '#927780',
                      height: '55px',
                      marginBottom: '20px',
                      fontWeight: '500',
                      letterSpacing: '1px',
                      fontSize: '18px',
                      color: '#ffffff'
                    }}
                  >
                    Create Account
                  </Button>
                </div>
                <Typography variant='body2'
                  style={{
                    color: '#000',
                    textAlign: 'center'
                  }}
                >
                  Already have an account? &nbsp;
                  <Link href={`/signin?redirect=${redirect || '/'}`}>
                    <a 
                      style={{
                        color: '#927780', 
                        fontWeight: '700'
                      }}
                    >Sign In</a>
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Container>
    </section>
  )
}
