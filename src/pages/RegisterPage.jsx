import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/Register.scss"



const RegisterPage = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null

    })

    console.log(formData)

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === 'profileImage' ? files[0] : value,
        })
    }

    const [passwordMatch, setPasswordMatch] = useState(true)
    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "");

    })

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const register_form = new FormData()
            for (var key in formData) {
                register_form.append(key, formData[key])
            }

            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                body: register_form
            })
            console.log(response.ok)
            if (response.ok) {
                navigate("/login")
            }

        } catch (error) {
            console.log("Registeration failed : ", error.message)
        }

    }
    return (
        <div className='register'>
            <div className='register_content'>
                <form
                    className='register_content_form'
                    onSubmit={handleSubmit}
                >
                    <input
                        placeholder='First Name'
                        name='firstName'
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <input
                        placeholder='Last Name'
                        name='lastName'
                        required
                        value={formData.lastName}
                        onChange={handleChange}

                    />
                    <input
                        placeholder='Email'
                        name='email'
                        required
                        type='email'
                        value={formData.email}
                        onChange={handleChange}

                    />
                    <input
                        placeholder='Password'
                        name='password'
                        required
                        type='password'
                        value={formData.password}
                        onChange={handleChange}

                    />
                    <input
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        required
                        type='password'
                        value={formData.confirmPassword}
                        onChange={handleChange}

                    />
                    {!passwordMatch && (<p style={{ color: 'red' }}> Password didn't matched!</p>)}
                    <input
                        type='file'
                        name='profileImage'
                        accept='image/*'
                        required
                        style={{ display: 'none' }}
                        id='image'
                        onChange={handleChange}

                    />
                    <label htmlFor='image'>
                        <img src='/assets/addImage.png' alt='add profile img' />
                        <p>Upload your Picture</p>

                    </label>
                    {
                        formData.profileImage && (
                            <img
                                src={URL.createObjectURL(formData.profileImage)}
                                alt='profilePicture'
                                style={{ maxWidth: "100px" }}

                            />
                        )}
                    <button type='submit' disabled={!passwordMatch} >Register</button>
                </form>
                <a href='/login'>Already have an Account ? Login here</a>
            </div>
           

        </div>
    )
}

export default RegisterPage;