import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'




const manifestForPlugin = {
  registerType:'prompt',
  includeAssests:['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest:{
    name:"ShopEase",
    short_name:"ShopEase",
    description:" Simplifying Your Shopping Experience",
    icons:[{
      src: '/icon/shopease2.jpg',
      sizes:'192x192',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src:'/icon/shopease3.jpg',
      sizes:'512x512',
      type:'image/png',
      purpose:'favicon'
    },
  
    
  ],
  theme_color:'#181818',
  background_color:'#e0cc3b',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),VitePWA(manifestForPlugin)],
})
