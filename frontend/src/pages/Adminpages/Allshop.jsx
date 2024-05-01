import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'

const Allshop = () => {

    const[shops,setShops]=useState([]);

    const getAllShops = async () => {
        try {
            const { data } = await axios.get('/get-shop');
            setShops(data.shop);
            console.log(data.shop);
            console.log(shops)
        } catch (error) {
            console.log(error);
            toast.error('something went wrong');
        }
    };

    useEffect(() => {
        getAllShops()
    },[]);

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
        <Link to='/userdatadmin'><a className="nav-link text-decoration-none"  >
          <i className="fas fa-fw fa-cog" />
          <span>Users Data</span>
        </a>  </Link>        
      </li>
      
     
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
      <div className="sidebar-heading">
        Shop Data
      </div>
      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <Link to='/addshopadmin'><a className="nav-link text-decoration-none" >
          <i className="fas fa-fw fa-folder" />
          <span>ADD Shop</span>
        </a>  </Link>      
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
            <h2>All Shop Data</h2>
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
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 p-5">
    {shops?.map((p) => (
        <div key={p._id} className="col mb-4">
            <div className="card h-100">
                <img 
                    src={`${axios.defaults.baseURL}/getphoto/${p._id}`} 
                    className="card-img-top img-fluid"  
                    alt={p.name} 
                    style={{ width: '100%', height: '200px' }}  
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{p.proname}</h6>
                    <p className="card-text">{p.location}</p>
                    <p className="card-text">{p.price}</p>
                    <p className="card-text">{p.description}</p>
                    <div className="mt-auto text-center">                        
                    </div>       
                </div>
            </div>
        </div>
    ))}
</div>

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

export default Allshop