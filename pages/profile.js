import React from 'react'

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
        setValue('firstName', session.user.firstName);
        setValue('lastName', session.user.lastName);
        setValue('email', session.user.email);
    }, [session.user, setValue]);

    const submitHandler = async ({ firstName, lastName, email, password }) => {
        try {
        await axios.put('/api/auth/update', {
            firstName,
            lastName,
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
                    <label htmlFor="firstName" className='form-label'>First Name</label>
                    <input
                        type="text"
                        className="form-input"
                        id="firstName"
                        autoFocus
                        {...register('firstName', {
                        required: 'Please enter first name',
                        })}
                    />
                    {errors.firstName && (
                        <div className="text-red-500">{errors.firstName.message}</div>
                    )}
                </div>
                <div>
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
                </div>

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