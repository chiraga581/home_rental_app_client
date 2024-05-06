import React, { useState } from 'react'
import "../styles/Login.scss"

import { setLogin } from "../redux/state"
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'




const LoginPage = () => {

	const dispatch = useDispatch()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			
			const response = await fetch("http://localhost:5000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email, password })

			})

			//  get data after fetching 
			const loggedIn = await response.json();
			if (loggedIn) {
				dispatch(setLogin({
					user: loggedIn.user,
					token: loggedIn.token
				}))
			}
			navigate('/')

		} catch (error) {
			console.log("login failed",error)
		}
	}
	return (
		<div className='login'>
			<div className='login_content'>
				<form className='login_content_form' onSubmit={handleSubmit}>
					<input
						type='email'
						placeholder='Email'
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						placeholder='Password'
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type='submit' > Login</button>
				</form>
				<a href='/register'> Don't have an account? Register here!</a>
			</div>
			

		</div>
	)
}

export default LoginPage