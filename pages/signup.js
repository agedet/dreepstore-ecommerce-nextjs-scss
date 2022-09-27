import React, { useEffect } from 'react';
import  Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Axios } from 'axios';


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

  const submitHandler = async ({ fullName, email, password }) => {
    console.log(fullName, email, password)
    try {
      await Axios.post('/api/auth/signup', {
        fullName,
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

  return (
    <section title='Create Account'>
        <div className='container'>
          <div className='login-form-container'>
            <h3>Create Account</h3>

            <form onSubmit={handleSubmit(submitHandler)}>
              <div>
                <label htmlFor='fullName' className='form-label'>
                  Full Name
                </label>
                <input 
                  type="fullName" 
                  id='fullName'
                  placeholder='enter full name here' 
                  className='form-input' 
                  {...register('fullName', {
                    required: 'Please enter full name',
                  })}
                />
                {errors.fullName && (
                  <div className="text-red-500">{errors.fullName.message}</div>
                )}
              </div>

              {/* <div>
                <label htmlFor='lastName' className='form-label'>Last Name</label>
                <input 
                  type="lastName" 
                  placeholder='enter last name here' 
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
                <label htmlFor='email' className='form-label'>Email</label>
                <input 
                  type="email" 
                  placeholder='enter email address here' className='form-input'
                  id='email'
                  {...register('email', {
                    required: 'Please enter email',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: 'Please enter valid email',
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>

              <div>
                <label htmlFor='password' className='form-label'>Password</label>
                <input 
                  type="password" 
                  placeholder='enter password here' 
                  className='form-input' 
                  {...register('password', {
                    required: 'Please enter password',
                    minLength: { value: 6, message: 'password is more than 5 chars' },
                  })}
                  id='password'
                />
                {errors.password && (
                  <div className="text-red-500 ">{errors.password.message}</div>
                )}
              </div>

              <div>
                <label htmlFor='confirmPassword' className='form-label'>Confirm Password</label>
                <input 
                  type='confirmPassword' 
                  placeholder='enter password here' 
                  className='form-input' 
                  id='confirmPassword'
                  {...register('confirmPassword', {
                    required: 'Please enter confirm password',
                    validate: (value) => value === getValues('password'),
                    minLength: {
                      value: 6,
                      message: 'confirm password is more than 5 chars',
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <div className="text-red-500 ">
                    {errors.confirmPassword.message}
                  </div>
                )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === 'validate' && (
                    <div className="text-red-500 ">Password do not match</div>
                )}
              </div>
              {/* <div>
                <label htmlFor='phone' className='form-label'>Phone No.</label>
                <input type='phone' placeholder='+234801234567' className='form-input' />
              </div> */}
              <div>
                <button type='submit' className='create-act-btn'>
                  Create Account
                </button>
              </div>
              <div>
                Already have an account? &nbsp;
                <Link href={`/signin?redirect=${redirect || '/'}`}>
                  <a className='link-acc'>Sign In</a>
                </Link>
              </div>
            </form>
          </div>
        </div>
    </section>
  )
}
