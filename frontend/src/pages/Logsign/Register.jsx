import React,{useState} from 'react'
import axios from "axios"
import {toast} from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom'

import bgimg from '../images/shopease.jpg'
import './Login.css';


const Register = () => {

  const navigate=useNavigate()

  const [data,setData]=useState({
      name:'',
      email:'',
      password:'',
  })

  const signupData=async(e) =>{
    e.preventDefault()
    const {name,email,password}=data
    try{
        const {data} = await axios.post('/register',{
            name,email,password
        })
        if(data.error){
            toast.error(data.error)
        }
        else{
            setData({});
            toast.success('Account Created Successfully');
            navigate('/')
        }
    }
    catch(error){
        console.log(error)
    }
  
  
    }



return (
    <div className="container">
  <div className="card o-hidden border-0 shadow-lg my-5">
    <div className="card-body p-0">
      {/* Nested Row within Card Body */}
      <div className="row">
        <div className="col-lg-5 d-none d-lg-block" style={{ background: `url(${bgimg})`}} />
        <div className="col-lg-7">
          <div className="p-5">
            <div className="text-center">
              <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
            </div>
            <form className="user">
              <div className="form-group row">
              <div className="form-group">
                <input type="text" 
                  value={data.name} onChange={(e) => setData({...data,name:e.target.value})}
                  className="form-control form-control-user" id="exampleInputEmail" placeholder="Your Name" />
              </div>                
              </div>
              <div className="form-group">
                <input type="email" 
                  value={data.email} onChange={(e) => setData({...data,email:e.target.value})}
                  className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" />
              </div>
              <div className="form-group row">
              <div className="form-group">
                <input type="password" 
                  value={data.password} onChange={(e) => setData({...data,password:e.target.value})}
                  className="form-control form-control-user" id="exampleInputEmail" placeholder="Password" />
              </div>              
              </div>
              <a href="login.html" onClick={signupData} className="btn btn-primary btn-user btn-block">
                Register Account
              </a>
              <hr />
            </form>
            <hr />
            <div className="text-center">
              <Link to='/'><a className="small" href="login.html">Already have an account? Login!</a></Link> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  )
}

export default Register