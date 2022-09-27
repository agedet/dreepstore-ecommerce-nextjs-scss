import React, { useEffect } from 'react';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function ProfileScreen() {
    const { data: session } = useSession();

    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setValue('fullName', session.user.fullName);
        setValue('email', session.user.email);
    }, [session.user, setValue]);

    const submitHandler = async ({ fullName, email, password }) => {
        try {
        await axios.put('/api/auth/update', {
            fullName,
            email,
            password,
        });
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        toast.success('Profile updated successfully');
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
           <h3>Profile</h3> 
           <form onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <label htmlFor="fullName" className='form-label'>Full Name</label>
                    <input
                        type="text"
                        className="form-input"
                        id="fullName"
                        autoFocus
                        {...register('fullName', {
                        required: 'Please enter full name',
                        })}
                    />
                    {errors.fullName && (
                        <div className="text-red-500">{errors.fullName.message}</div>
                    )}
                </div>
                {/* <div>
                    <label htmlFor="lastName" className='form-label'>Last Name</label>
                    <input
                        type="text"
                        className="form-input"
                        id="lastName"
                        autoFocus
                        {...register('lastName', {
                        required: 'Please enter last name',
                        })}
                    />
                    {errors.lastName && (
                        <div className="text-red-500">{errors.lastName.message}</div>
                    )}
                </div> */}

                <div>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input
                        type="email"
                        className="form-input"
                        id="email"
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
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input
                        className="form-input"
                        type="password"
                        id="password"
                        {...register('password', {
                        minLength: { value: 6, message: 'password is more than 5 chars' },
                        })}
                    />
                    {errors.password && (
                        <div className="text-red-500 ">{errors.password.message}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className='form-label'>Confirm Password</label>
                    <input
                        className="form-input"
                        type="password"
                        id="confirmPassword"
                        {...register('confirmPassword', {
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
                        <div className="">Password do not match</div>
                        )}
                    </div>
                <div>
                    <button className="create-acc-btn">Update Profile</button>
                </div>
            </form>
            </div> 
        </div>
    </section>
  )
}

ProfileScreen.auth = true;