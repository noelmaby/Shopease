import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import {toast} from 'react-hot-toast';
import {City} from "country-state-city";


const Addshop = () => {

    const [data,setData]=useState({
        name:'',
        price:'',
        description:'',
        location:'',
        proname:'',
        photo:'',
        slink:'',
    })
    const createShop =async(e)=>{
        e.preventDefault();
        try {
            const { name, price, description, location, proname, photo,slink } = data;
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('location', location);
            formData.append('proname', proname);
            formData.append('photo', photo);
            formData.append('slink', slink);
    
            const response = await axios.post('/create-shop', formData);
            console.log(response.data);
            toast.success('Shop created successfully');
            window.location.reload();
        } catch (error) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data.error || error.response.data.message || 'Something went wrong');
            } else {
                toast.error('Something went wrong');
            }
        }
    };
    
    const[cityData,setCityData]=useState([]); 
    useEffect(() => {
        const cities = City.getCitiesOfState('IN', 'KL');
        setCityData(cities);
      }, []);
    
    console.log(cityData)
    
  
   
    const [message,setMessage]=useState()
    const navigate = useNavigate();

    useEffect(()=>{
      axios.get('/getadmin')
      .then(res=> {
      if(res.data.valid){
          setMessage(res.data.message)
      }else{
          navigate('/main')
      }
      })
      .catch(err=>console.log(err))
  })

 


  return (
    <div>
  <div id="wrapper">
    {/* Sidebar */}
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* Sidebar - Brand */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text mx-3">Shopease <sup>Admin</sup></div>
      </a>
      
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <a className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard</span></a>
      </li>
      <li className="nav-item active">
        <Link to='/main'><a className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Main Page</span></a></Link>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
      <div className="sidebar-heading">
        Users
      </div>
      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <Link to='/userdatadmin'><a className="nav-link collapsed text-decoration-none" >
          <i className="fas fa-fw fa-cog" />
          <span>Users Data</span>
        </a> </Link>       
      </li>
      
     
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
      <div className="sidebar-heading">
        Shop Data
      </div>
      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <Link to='/addshopadmin'><a className="nav-link collapsed text-decoration-none"  >
          <i className="fas fa-fw fa-folder" />
          <span>ADD Shop</span>
        </a> </Link>       
      </li>
      {/* Nav Item - Charts */}
      <li className="nav-item">
        <Link  to='/allshopadmin'><a className="nav-link text-decoration-none" >
          <i className="fas fa-fw fa-chart-area" />
          <span>All Shops</span></a> </Link>
      </li>
      {/* Nav Item - Tables */}
      <li className="nav-item">
        <Link to='/deleteshopadmin'><a className="nav-link text-decoration-none" >
          <i className="fas fa-fw fa-table" />
          <span>Delete Shop</span></a> </Link>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />     
    </ul>
    {/* End of Sidebar */}

    {/* Content Wrapper */}
    <div id="content-wrapper" className="d-flex flex-column">
      {/* Main Content */}
      <div id="content">
        {/* Topbar */}
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          {/* Sidebar Toggle (Topbar) */}
          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars" />
          </button>
          {/* Topbar Search */}
          <div className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <h2>Add Shop</h2>
          </div>
          {/* Topbar Navbar */}
          <ul className="navbar-nav ml-auto">
            
            <div className="topbar-divider d-none d-sm-block" />
            {/* Nav Item - User Information */}
            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Admin</span>                
              </a>
              {/* Dropdown - User Information */}
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a className="dropdown-item" href="#">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                  Profile
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                  Settings
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                  Activity Log
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
        {/* End of Topbar */}
        {/* Begin Page Content */}
       <form className="row g-3 needs-validation p-5" Validate>
  <div className="col-md-4">
    <label htmlFor="validationCustom01" className="form-label">Product Name</label>
    <input value={data.proname} onChange={(e) => setData({...data,proname:e.target.value})}
         type="text" className="form-control" id="validationCustom01" required />
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom02" className="form-label">Shop Name</label>
    <input value={data.name} onChange={(e) => setData({...data,name:e.target.value})}
    type="text" className="form-control" id="validationCustom02" required />
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  
  <div className="col-md-6">
    <label htmlFor="validationCustom03" className="form-label">Description</label>
    <input value={data.description} onChange={(e) => setData({...data,description:e.target.value})}
         type="text" className="form-control" id="validationCustom03" required />
    <div className="invalid-feedback">
      Please provide a Description.
    </div>
  </div>
  <div className="col-md-3">
    <label htmlFor="validationCustom04" className="form-label">Location</label>
   
    <label htmlFor="countrySelect">City</label>
    <select className="form-control" values={cityData} onChange={(e) => setData({...data,location:e.target.value})} >
        <option>--Select City--</option>
        {cityData.map(ctr =>(
            <option value={ctr.name}>{ctr.name}</option>
        ))}
    </select>

    <div className="invalid-feedback">
      Please select a valid location.
    </div>
  </div>
  <div className="col-md-3">
    <label htmlFor="validationCustom05" className="form-label">Price</label>
    <input value={data.price} onChange={(e) => setData({...data,price:e.target.value})}
         type="number" className="form-control" id="validationCustom05" required />
    <div className="invalid-feedback">
      Please provide a price.
    </div>
  </div>
  <div>
  <label htmlFor="formFileLg" className="form-label">Photo</label>
  <input className="form-control form-control-lg" accept="image/*" 
     onChange={(e) => setData({ ...data, photo: e.target.files[0] })}
    id="formFileLg" type="file" />
</div>
<div className='mb-3'>
    {data.photo && (
        <div className="text-center">
        <img src={URL.createObjectURL(data.photo)} alt="product photo" />
        </div>
    )}
</div>
<div className="col-md-6">
    <label htmlFor="validationCustom03" className="form-label">Direction Link</label>
    <input value={data.slink} onChange={(e) => setData({...data,slink:e.target.value})}
         type="text" className="form-control" id="validationCustom03" required />
    <div className="invalid-feedback">
      Please provide a Description.
    </div>
  </div>

  <div className="col-12">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" defaultValue id="invalidCheck" required />
      <label className="form-check-label" htmlFor="invalidCheck">
        Provided Detaials Are True
      </label>
      <div className="invalid-feedback">
        You must agree before submitting.
      </div>
    </div>
  </div>
  <div className="col-12">
    <button className="btn btn-primary" onClick={createShop} type="submit">Submit form</button>
  </div>
</form>

        {/* /.container-fluid */}
      </div>
      {/* End of Main Content */}
      {/* Footer */}
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright © Shopease</span>
          </div>
        </div>
      </footer>
      {/* End of Footer */}
    </div>
    {/* End of Content Wrapper */}
  </div>
  {/* End of Page Wrapper */}
  {/* Scroll to Top Button*/}
  <a className="scroll-to-top rounded" href="#page-top">
    <i className="fas fa-angle-up" />
  </a>
  {/* Logout Modal*/}
  <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
          <button className="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
        <div className="modal-footer">
          <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
          <a className="btn btn-primary" href="login.html">Logout</a>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Addshop