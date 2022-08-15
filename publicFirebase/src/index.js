import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import App from './App'
import Checkout from './pages/Checkout/Checkout'
import Home from './pages/Home/Home'
import ThankYou from './pages/ThankYou/ThankYou'
import Product from './pages/Product/Product'
import Profile from './pages/Profile/Profile'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const root = ReactDOM.createRoot(document.getElementById('root'))

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDrNAOLc6sjLIPk8PrS5krzEGXRIGPtsug',
  authDomain: 'newstylish-fa92f.firebaseapp.com',
  projectId: 'newstylish-fa92f',
  storageBucket: 'newstylish-fa92f.appspot.com',
  messagingSenderId: '385920866194',
  appId: '1:385920866194:web:d2bd7c0f4d8f34123d134b',
  measurementId: 'G-15ZWDEREJH',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="thankyou" element={<ThankYou />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
