// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import "./index.css"
// import App from './frontend/components/App/App';
// import Header from './frontend/components/Header/Header';
// import { BrowserRouter } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import Sidebar from './frontend/components/Sidebar/Sidebar';


// export default function IndexPage() {
//   return (
//     <div className='index_page'>
//         {/* {console.log(process.env.REACT_APP_GOOGLE_ID)} */}
//         <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
            
//             <BrowserRouter>
//                 <Header/>
//                 <div className='dashboard'>
//                     {/* <Sidebar/> */}
//                     <App/>
//                 </div>
                
//             </BrowserRouter>
//         </GoogleOAuthProvider>
//     </div>
//   )
// }

import React from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./frontend/components/Header/Header";
import Sidebar from "./frontend/components/Sidebar/Sidebar";
import DashboardRoutes from "./frontend/components/DashBoard/DashBoard"; // Handles route rendering
import "./index.css"
import App from "./frontend/components/App/App";
import UserContext from "./frontend/components/UserContext/UserContext";

const IndexPage = () => {
  return (
    <div className="index_page">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
        <UserContext>
        <BrowserRouter>
          <Header />
          <div className="dashboard">
            <Sidebar />
            <div className="content">
              {/* <DashboardRoutes /> */}
              <App/>
            </div>
          </div>
        </BrowserRouter>
        </UserContext>
      </GoogleOAuthProvider>
    </div>
  );
};

export default IndexPage;


const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<IndexPage />);
} else {
    console.error('No container element found!');
}
