import React ,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import './css/mpstyle.css'
import './css/bootstrap.min.css'
import headerimg from './images/secpagehead.jpg'
import axios from 'axios'



const Searchresult = () => {


  const [message,setMessage]=useState()
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
    const { search } = useLocation();

    const queryParams = new URLSearchParams(search);
  const searchTerm = queryParams.get('pro');
  const location = queryParams.get('location');

  const[locshop,setLocshop]=useState([]);
  const searchloca = async () => {
    
    try {
        const response = await axios.post('/get-locationshop');
        setLocshop(response.data.shop);
        console.log(response.data.shop);
        console.log(locshop)
    } catch (error) {
        console.log(error);
    }
};
useEffect(() => {
    searchloca()
  }, []);
    
  return (
    <div>
        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5" style={{ position: 'relative', background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${headerimg})`, backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
  <h1 className="text-center text-white display-6">Search Results</h1>
 </div>
{/* Single Page Header End */}


{/* Fruits Shop Start*/}
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
                {locshop.filter(p => p.location === location && p.proname.toLowerCase().includes(searchTerm.toLowerCase()) && p.name !== null).length === 0 ? (
    <h1>No nearby shops</h1>
) : (
    locshop
        .filter(p => p.location === location && p.proname.toLowerCase().includes(searchTerm.toLowerCase()) && p.name !== null) // Filter shops by location, product name (proname), and check if name is not null
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
                    <a id="shop-1-dir" href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-location-arrow me-2 text-primary"></i>Direction</a>

                   
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
{/* Fruits Shop End*/}

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

export default Searchresult