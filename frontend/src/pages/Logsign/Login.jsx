import React ,{useState} from 'react'
import axios from "axios"
import {toast} from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom'

import bgimg from '../images/shopease.jpg'
import './Login.css';



const Login = () => {

    const navigate=useNavigate()
    const [data,setData]=useState({
        email:'',
        password:'',
    })

    const LoginData= async (e)=>{
        e.preventDefault()
        const {email,password}=data
        try {
            const {data}=await axios.post('/login',{
                email,password
            });

            if(data.error){
                toast.error(data.error)
            }
            else{
                setData({});
                toast.success('Login Successfull');
                navigate('/main')
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('An error occurred while logging in');
        }
       
    }






  return (
    

            <div className="container">

                {/* Outer Row */}
                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* Nested Row within Card Body */}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block" style={{ background: `url(${bgimg})`}}></div>
                                    <div className="col-lg-6">
                                        <div className="p-5 ustify-content-center">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input type="email" className="form-control form-control-user"
                                                        value={data.email} onChange={(e) => setData({...data,email:e.target.value})}
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address..." />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user"
                                                        value={data.password} onChange={(e) => setData({...data,password:e.target.value})}
                                                        id="exampleInputPassword" placeholder="Password" />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" htmlFor="customCheck">Remember
                                                            Me</label>
                                                    </div>
                                                </div>
                                                <a href="index.html" onClick={LoginData} className="btn btn-primary btn-user btn-block">
                                                    Login
                                                </a>
                                                <hr />
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                               <Link to='/signup'><a className="small" href="register.html">Create an Account!</a></Link> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
       

  )
}

export default Login