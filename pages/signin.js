import React, { useEffect } from 'react';
import  Link from 'next/link';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

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
    console.log(email, password);
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

  return (
    <section>
        <div className='container'>
          <div className='login-form-container'>
            <h3>Login</h3>

            <form onSubmit={handleSubmit(submitHandler)}>
              <div>
                <label htmlFor='email' className='form-label'>Email</label>
                <input 
                  type="email"
                  placeholder='enter email address here' 
                  {
                    ...register('email', {
                      required: 'Please enter email',
                      pattern: {
                        message: 'Please enter valid email',
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      },
                  })}
                  className='form-input'
                  id='email'
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>

              <div>
                <label 
                  htmlFor='password'
                  className='form-label'
                >
                  Password
                </label>
                <input 
                  type="password"
                  placeholder='enter password here' 
                  {...register('password', {
                    required: 'Please enter password',
                    minLength: { value: 6, message: 'password is more than 5 chars' }, 
                  })}
                  className='form-input'
                  id='password'
                />
                {errors.password && (
                  <div className="text-red-500">{errors.password.message}</div>
                )}
              </div>

              <div>
                <button type='submit' className='create-act-btn'>
                    Login 
                </button>
              </div>

              <div className='link-acc'>
                Don&apos;t have an account? &nbsp;
                
                <Link href={`/signup?redirect=${redirect || '/'}`} >
                  <a className='link-acc'>
                    Sign Up
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
    </section>
  )
}
