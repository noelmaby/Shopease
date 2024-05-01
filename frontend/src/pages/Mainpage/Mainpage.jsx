import React,{useState,useEffect} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import './css/mpstyle.css'
import './css/bootstrap.min.css'
import firstslide from './images/Home,Kitchen,Pets.jpeg';
import secondslide from './images/Mens and Womens Fasion.jpg';
import thirdslide from './images/Mobiles and Computers.jpg';
import alfam from './images/perialfram.jpeg';
import lap from './images/msilap.jpg';
import vcl from './images/vcner.jpg';
import oil from './images/oil.jpg';
import seed from './images/seed.jpg';
import strap from './images/strap.jpg';
import {toast} from 'react-hot-toast';
import heroimg from './images/hero-img.jpg'
import introimg from './images/baner-1.png'

import axios from 'axios'


import {City} from "country-state-city";


const Mainpage = () => {

  const [isAdmin, setIsAdmin] = useState(false);
  const navigate=useNavigate();
  const [message,setMessage]=useState()
  const [searchpro, setSearchpro] = useState('');
    const[location,setLocation]=useState();
    const[locshop,setLocshop]=useState([]);

    useEffect(()=>{
      axios.get('/profile')
      .then(res=> {
        if(res.data.valid){
          setMessage(res.data.message);
          setIsAdmin(res.data.isAdmin);
        }else{
          navigate('/')
        }
      })
      .catch(err=>console.log(err))
    })
    
    console.log(location)

    function handleClose() {
        // Remove the 'show' class from the modal
        const searchModal = document.getElementById('searchModal');
        searchModal.classList.remove('show');
        
        // Remove the modal backdrop
        const modalBackdrops = document.getElementsByClassName('modal-backdrop');
        for (let backdrop of modalBackdrops) {
            backdrop.remove();
        }
    }
    const[cityData,setCityData]=useState([]); 
    useEffect(() => {
        const cities = City.getCitiesOfState('IN', 'KL');
        setCityData(cities);
      }, []);
    
      const searchloca = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/get-locationshop',  location);
            setLocshop(response.data.shop);
            console.log(response.data.shop);
            console.log(locshop)
        } catch (error) {
            console.log(error);
        }
    };

    const [data,setData]=useState({
      name:'',      
      description:'',     
      profession:'',
      photo:'',
     
  })
  
    const addcomm =async(e)=>{
        e.preventDefault();
        try {
            const { name, profession, description, photo } = data;
            const formData = new FormData();
            formData.append('name', name);
            formData.append('profession', profession);
            formData.append('description', description);
            formData.append('photo', photo);
    
            const response = await axios.post('/create-comm', formData);
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
     const[comms,setComm]=useState([]);
    

     
  
      const getAllcomms= async () => {
          try {
              const { data } = await axios.get('/get-comm');
              setComm(data.shop);
              console.log(data.shop);
              console.log(comms)
          } catch (error) {
              console.log(error);
              toast.error('something went wrong');
          }
      }
   
      useEffect(() => {
        getAllcomms()
    },[]);

    const handleSignOut = async () => {
      try {
          // Call the sign-out API endpoint
          await axios.get('/signout');
          // Clear any local session storage or state
          // Redirect to the sign-in page or update UI as needed
      } catch (error) {
          console.error('Error signing out:', error);
      }
  };
    
    
  return (
    <div>
      
              {/* Location Search Modal */}
              <div className="modal fade show" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-fullscreen">
        <div className="modal-content rounded-0">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Select your Location</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
            </div>
            <div className="modal-body d-flex align-items-center">
                <div className="input-group w-75 mx-auto d-flex">
                <select className="form-control" values={location} onChange={(e) => setLocation(e.target.value)} >
        <option>--Select City--</option>
        {cityData.map(ctr =>(
            <option value={ctr.name}>{ctr.name}</option>
        ))}
    </select>
                    <button onClick={searchloca}><span id="search-icon-1" className="input-group-text p-2"><i className="fa fa-search" /></span></button>
                </div>
            </div>
        </div>
    </div>
</div>
        {/* NAVBAR */}

        <div className="container-fluid fixed-top">
        <div className="container px-0">
    <nav className="navbar navbar-light bg-white navbar-expand-xl">
      <a href="index.html" className="navbar-brand"><h1 className="text-primary display-6">ShopEase</h1></a>
      <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="fa fa-bars text-primary" />
      </button>
      <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
        <div className="navbar-nav mx-auto">
          <a href="" className="nav-item nav-link active">Home</a>
          <a href="#nearby-shops" className="nav-item nav-link">Nearby Shops</a>
          <a href="" className="nav-item nav-link">Todays Deal</a>
          <a href="#about-us" className="nav-item nav-link">About Us</a>
          {isAdmin && <Link to='/userdatadmin'><a href="#about-us" className="nav-item nav-link">ADMIN PANEL</a></Link>}
          
          
        </div>
        <div className="d-flex justify-content-between flex-lg-wrap">
          <a id="location" href="#navbar" className="nav-item nav-link" data-bs-toggle="modal" data-bs-target="#searchModal">
            <i className="fas fa-map-marked-alt fa-1x text-primary my-auto" />
            Enter Location
          </a>
          <a onClick={handleSignOut} className="my-auto">
            <button  className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target><i className="fas fa-user fa-1x text-primary" /></button>
          </a>
        </div>
      </div>
    </nav>
  </div>
</div>
{/* NAVBAR End */}




{/* Product Search Start */}
<div id="product-search" className="container-fluid py-5 mb-5 "  style={{
    backgroundImage: `linear-gradient(rgba(248, 223, 173, 0.1), rgba(248, 223, 173, 0.1)), url(${heroimg})`,
    /* Other background properties */
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}>
  <div className="container py-5">
    <div className="row g-5 align-items-center">
      <div className="col-md-12 col-lg-7">
        <h4 className="mb-3 text-secondary">Looking for something?</h4>
        <h1 className="mb-5 display-3 text-primary">Search your items in nearby shops</h1>
        <div className="position-relative mx-auto">
          <input className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill" values={searchpro} onChange={(e) => setSearchpro(e.target.value)} placeholder="Search" />
          <Link to={`/search-result?pro=${searchpro}&location=${location}`}><button type="submit"  className=" btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100" style={{top: 0, right: '25%'}}>Search<i className="fas fa-search text-light" /></button></Link>
        </div>
      </div>
      <div className="col-md-12 col-lg-5">
        <div id="carouselId" className="carousel slide position-relative mt-5" data-bs-ride="carousel">
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item active rounded">
              <img src={firstslide} className="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide" />
              <a href className="btn px-4 py-2 text-white rounded">Home, Kitchen, Pets</a>
            </div>
            <div className="carousel-item rounded">
              <img src={secondslide} className="img-fluid w-100 h-100 rounded" alt="Second slide" />
              <a href="#" className="btn px-4 py-2 text-white rounded">Mens and Womens Fasion</a>
            </div>
            <div className="carousel-item rounded">
              <img src={thirdslide} className="img-fluid w-100 h-100 rounded" alt="Second slide" />
              <a href="#" className="btn px-4 py-2 text-white rounded">Mobiles and Computers</a>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Product Search End */}

<div id="nearby-shops" >
<div class="container-fluid fruite py-5">
  <div className="container py-5">
    <div className="tab-class text-center">
      <h1 className="row g-4 col-lg-4 text-start">Shops Near You</h1>
      <div className="tab-content">
        <div  className="tab-pane fade show p-0 active" style={{ backgroundColor: 'white' }} >
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="row g-4">
             
                {/* Mapping through locshop array */}
                {locshop.filter(p => p.location === location && p.name !== null).length === 0 ? (
    <h1>No nearby shops</h1>
) : (
    locshop
        .filter(p => p.location === location && p.name !== null) // Filter shops by location and check if name is not null
        .map(p => (
                 <div className="col-md-6 col-lg-4 col-xl-3">
                 <div class="rounded position-relative fruite-item">
              <div key={p._id} className="col mb-4">
            
            <div class="fruite-img mt-3">
                <img 
                    src={`${axios.defaults.baseURL}/getphoto/${p._id}`} 
                    className="card-img-top img-fluid "  
                    alt={p.name} 
                    style={{ width: '100%', height: '200px' }}  
                />
              </div>
              <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                    <h4 id="shop-1-name">{p.name}</h4>
                    <h6 id="shop-1-name">{p.proname}</h6>
                    <h6 id="shop-1-name">{p.description}</h6>
                    <br></br>
                    
                    <div class="d-flex justify-content-between flex-lg-wrap">
                    <p id="shop-1-dis" class="text-dark fs-5 fw-bold mb-0">{p.price}</p>
                    <a id="shop-1-dir" href={p.slink} className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-location-arrow me-2 text-primary"></i>Direction</a>

                   
                  </div>
                    <div className="mt-auto text-center">                        
                    </div>       
                </div>
            </div>
            </div>
                </div> 
    )))}
         
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>      
  </div>
 </div>
 </div>

 {/* Bestseller Product Start */}
<div id="bestseller" className="container-fluid py-5">
  <div className="container py-5">
    <div className="text-center mx-auto mb-5" style={{maxWidth: 700}}>
      <h1 className="display-4">Bestseller Products</h1>
      <p>Here you can see the best deals that are available to you based on your location</p>
    </div>
    <div className="row g-4">
      <div className="col-lg-6 col-xl-4">
        <div className="p-4 rounded bg-light">
          <div className="row align-items-center">
            <div className="col-6">
              <img id="product1-img" src={alfam} className="img-fluid rounded-circle w-100" alt />
            </div>
            <div className="col-6">
              <h2 id="product1-name"  className="h5">Peri Peri Alfam</h2>
              <span>AL MIYA MANDI</span>
              
              <h4 id="product1-price" className="mb-3">Thrissur</h4>
              <a id="shop-1-dir" href="#bestseller" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa-solid fa-tag me-2 text-primary" />750-Full</a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="p-4 rounded bg-light">
          <div className="row align-items-center">
            <div className="col-6">
              <img id="product1-img" src={lap} className="img-fluid rounded-circle w-100" alt />
            </div>
            <div className="col-6">
              <h2 id="product1-name"  className="h5">MSI LAPTOP</h2>
              <span>JEO SYSTEM</span>
              
              <h4 id="product1-price" className="mb-3">Palakkad</h4>
              <a id="shop-1-dir" href="#bestseller" className="btn border
               border-secondary rounded-pill px-3 text-primary"><i className="fa-solid fa-tag me-2 text-primary" />80,000</a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="p-4 rounded bg-light">
          <div className="row align-items-center">
            <div className="col-6">
              <img id="product1-img" src={vcl} className="img-fluid rounded-circle w-100" alt />
            </div>
            <div className="col-6">
              <h2 id="product1-name"  className="h5">Ikon Vaccum Cleaner</h2>
              <span>MAYUGA ELECTRIC</span>
              
              <h4 id="product1-price" className="mb-3">Ernakulam</h4>
              <a id="shop-1-dir" href="#bestseller" className="btn border 
              border-secondary rounded-pill px-3 text-primary"><i className="fa-solid fa-tag me-2 text-primary" />5800</a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="p-4 rounded bg-light">
          <div className="row align-items-center">
            <div className="col-6">
              <img id="product1-img" src={oil} className="img-fluid rounded-circle w-100" alt />
            </div>
            <div className="col-6">
              <h2 id="product1-name"  className="h5">Natural Coconut Oil</h2>
              <span>THEJUS </span>
              
              <h4 id="product1-price" className="mb-3">Kozhikode</h4>
              <a id="shop-1-dir" href="#bestseller" className="btn border 
              border-secondary rounded-pill px-3 text-primary"><i className="fa-solid fa-tag me-2 text-primary" />170-1ltr</a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="p-4 rounded bg-light">
          <div className="row align-items-center">
            <div className="col-6">
              <img id="product1-img" src={seed} className="img-fluid rounded-circle w-100" alt />
            </div>
            <div className="col-6">
              <h2 id="product1-name"  className="h5">Imported Sunflower seed</h2>
              <span>DUB-ELA FRUITS</span>
              
              <h4 id="product1-price" className="mb-3">Thrivandrum</h4>
              <a id="shop-1-dir" href="#bestseller" className="btn border 
              border-secondary rounded-pill px-3 text-primary"><i className="fa-solid fa-tag me-2 text-primary" />460-1Kg</a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="p-4 rounded bg-light">
          <div className="row align-items-center">
            <div className="col-6">
              <img id="product1-img" src={strap} className="img-fluid rounded-circle w-100" alt />
            </div>
            <div className="col-6">
              <h2 id="product1-name"  className="h5">Casio Watch Strap</h2>
              <span>SAM WATCHES</span>
              
              <h4 id="product1-price" className="mb-3">Thrissur</h4>
              <a id="shop-1-dir" href="#bestseller" className="btn border 
              border-secondary rounded-pill px-3 text-primary"><i className="fa-solid fa-tag me-2 text-primary" />200-Starting</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Bestsaler Product End */}




 {/* ShopEase Intro Start*/}
 <div id="about-us" className="container-fluid banner bg-secondary my-5">
  <div className="container">
    <div className="row g-4 align-items-center">
      <div className="col-lg-6">
        <div>
          <h1 className="display-3 text-white">ShopEase</h1>
          <p className="fw-normal display-3 text-dark mb-4">What do we do</p>
          <p className="mb-5 text-dark">ShopEase is a large database of offline shops in which anyone can search for any products based on their current location. ShopEase can easily identify nearby shops which have the products that you are looking for. </p> {/* Increased mb-5 */}
          <a href="#product-search" className="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5">Try Now</a>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="position-relative">
          <img src={introimg} className="img-fluid w-100 rounded" alt />
          <div className="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute" style={{width: 140, height: 140, top: 0, left: 0}}>
            <h1 style={{fontSize: 100}}>1</h1>
            <div className="d-flex flex-column">
              <span className="h2 mb-0">50$</span>
              <span className="h4 text-muted mb-0">kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* ShopEase Intro End */}

{/* Featurs Section Start */}
<div className="container-fluid featurs py-5">
  <div className="container py-5">
    <div className="row g-4">
      <div className="col-md-6 col-lg-3">
        <div className="featurs-item text-center rounded bg-light p-4 h-100">
          <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
            <i className="fas fa-store fa-3x text-white" />
          </div>
          <div className="featurs-content text-center">
            <h5>Free Entry for Shops</h5>
            <p className="mb-0">Any offline stores can register in our platform and get discovered by anyone using ShopEase</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3">
        <div className="featurs-item text-center rounded bg-light p-4 h-100">
          <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
            <i className="fas fa-laptop-code fa-3x text-white" />
          </div>
          <div className="featurs-content text-center">
            <h5>Platform Independent</h5>
            <p className="mb-0">Users can access ShopEase from any platform and use our services. Easy and intuitive Interface</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3">
        <div className="featurs-item text-center rounded bg-light p-4 h-100">
          <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
            <i className="fas fa-tags fa-3x text-white" />
          </div>
          <div className="featurs-content text-center">
            <h5>Latest Deals</h5>
            <p className="mb-0">Offline Stores offering better and competitive pricing will be available here.</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3">
        <div className="featurs-item text-center rounded bg-light p-4 h-100">
          <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
            <i className="fa fa-truck fa-3x text-white" />
          </div>
          <div className="featurs-content text-center">
            <h5>Home Delivery</h5>
            <p className="mb-0">We are a growing platform. Home Delivery features will be implemented soon. Stay Tuned for updates</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Featurs Section End */}

{/* Tastimonial Start */}
<div className="container-fluid testimonial py-5">
  <div className="container py-5">
  
    <div className="testimonial-header text-center">
      <h4 className="text-primary">Our Testimonial</h4>
      <h1 className="display-5 mb-5 text-dark">Our Client Saying!</h1>
      </div>
      {comms?.map((p) => (
     <div key={p._id} className="owl-carousel testimonial-carousel">
      <div className="testimonial-item img-border-radius bg-light rounded p-4">
        <div className="position-relative">
          <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{bottom: 30, right: 0}} />
          <div className="mb-4 pb-4 border-bottom border-secondary">
          
          </div>
          <div className="d-flex align-items-center flex-nowrap">
            <div className="bg-secondary rounded">
              <img src={`${axios.defaults.baseURL}/getcomphoto/${p._id}`} 
              className="img-fluid rounded" style={{width: 100, height: 100}} alt />
            </div>
            <div className="ms-4 d-block">
              <h4 className="text-dark">{p.name} </h4>
              <p className="m-0 pb-3">{p.description} </p>
             
            </div>
          </div>
        </div>
      </div>
    
     </div>
     ))}
  
  </div>

</div>
{/* Tastimonial End */}


{/* comment start*/}
<h1 className="display-4">Comment Section</h1>
<div className='p-5'>
  <form className="row g-3">
    <div className="col-md-6">
      <label htmlFor="inputEmail4" className="form-label">Full Name</label>
      <input type="text"  value={data.name} onChange={(e) => setData({...data,name:e.target.value})}
      className="form-control" id="inputEmail4" />
    </div>
    <div className="col-md-6">
      <label htmlFor="inputPassword4" className="form-label">Profession</label>
      <input type="text"  value={data.profession} onChange={(e) => setData({...data,profession:e.target.value})}
      className="form-control" id="inputPassword4" />
    </div>
    <div className="col-12">
      <label htmlFor="inputAddress" className="form-label">Add Comment</label>
      <input type="text" value={data.description} onChange={(e) => setData({...data,description:e.target.value})}
       className="form-control" id="inputAddress" placeholder="Tell About Shopease" style={{ height: '100px' }} />
    </div>
    <div className="col-12">
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
    <div className="col-12 text-center">
      <button type="submit" onClick={addcomm} className="btn btn-primary">Add Comment</button>
    </div>
  </form>
</div>
  {/* comment ends */}

<div>
  {/* Footer Start */}
  <div className="container-fluid bg-dark text-white-50 footer">
    <div className="container py-5">
      <div className="pb-4 mb-4" style={{borderBottom: '1px solid rgba(226, 175, 24, 0.5)'}}>
        <div className="row g-4">
          <div className="col-lg-3">
            <a href="#">
              <h1 className="text-primary mb-0">ShopEase</h1>
              <p className="text-secondary mb-0">Products on the go</p>
            </a>
          </div>
          <div className="col-lg-6">
            <div className="position-relative mx-auto">
              <input className="form-control border-0 w-100 py-3 px-4 rounded-pill" type="number" placeholder="Your Email" />
              <button type="submit" className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white" style={{top: 0, right: 0}}>Subscribe Now</button>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="d-flex justify-content-end pt-3">
              <a className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-twitter" /></a>
              <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-facebook-f" /></a>
              <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-youtube" /></a>
              <a className="btn btn-outline-secondary btn-md-square rounded-circle" href><i className="fab fa-linkedin-in" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Footer End */}
  {/* Copyright Start */}
  <div className="container-fluid copyright bg-dark py-4">
    <div className="container">
      <div className="row">
        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
          <span className="text-light"><b>ShopEase</b>.All right reserved.</span>
        </div>
        <div className="col-md-6 my-auto text-center text-md-end text-white">
          Designed By <b>Team Phazor</b> Open Sourced at <a className="border-bottom" href>Github</a>
        </div>
      </div>
    </div>
  </div>
  {/* Copyright End */}
  {/* Back to Top */}
  <a href="#" className="btn btn-primary border-3 border-primary rounded-circle back-to-top"><i className="fa fa-arrow-up" /></a>
</div>


       
        
</div>

  )
}

export default Mainpage