import React from 'react'
import {Routes,Route} from 'react-router-dom'
import LoginP from '../src/pages/Logsign/Login'
import Signup from '../src/pages/Logsign/Register'
import Mainpage from '../src/pages/Mainpage/Mainpage'
import SearchResultPage from '../src/pages/Mainpage/Searchresult'
import Userdataadmin from '../src/pages/Adminpages/Userdata'
import Addshopadmin from '../src/pages/Adminpages/Addshop'
import Allshopadmin from '../src/pages/Adminpages/Allshop'
import Deleteshopadmin from '../src/pages/Adminpages/Deleteshop'
import Deletecomadmin from '../src/pages/Adminpages/comments'
import axios from 'axios';
import {Toaster} from 'react-hot-toast'


axios.defaults.baseURL = 'https://shopeasebackend.vercel.app';
axios.defaults.withCredentials = true


function App() {
  return (
    <>
        <Toaster position='bottom-right' toastOptions={{duration:3000}} />
    <Routes>
        <Route path='/main' element={<Mainpage />} />
        <Route path='/' element={<LoginP/>} />
        <Route path='/signup' element={<Signup/>} />       
        <Route path='/userdatadmin' element={<Userdataadmin/>} />
        <Route path='/addshopadmin' element={<Addshopadmin/>} />
        <Route path='/allshopadmin' element={<Allshopadmin/>} />
        <Route path='/deleteshopadmin' element={<Deleteshopadmin/>} />
        <Route path='/search-result' element={<SearchResultPage />} />
        <Route path='/deletecom' element={<Deletecomadmin />} />
        
        
    </Routes>
    </>
   
    
  )
}

export default App