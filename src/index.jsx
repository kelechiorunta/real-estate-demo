import React from 'react';
import { createRoot } from 'react-dom/client';
import "./index.css"
import App from './frontend/components/App/App';
import Header from './frontend/components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';


export default function IndexPage() {
  return (
    <div className='index_page'>
        {/* {console.log(process.env.REACT_APP_GOOGLE_ID)} */}
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
            <BrowserRouter>
                <Header/>
                <App/>
            </BrowserRouter>
        </GoogleOAuthProvider>
    </div>
  )
}

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<IndexPage />);
} else {
    console.error('No container element found!');
}
