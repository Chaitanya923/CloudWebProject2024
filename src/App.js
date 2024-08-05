import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Category from './components/Category';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckoutForm from './components/CheckOut';
import Cart from './components/Cart';
import ContactUs from './components/ContactUs';
import About from './components/About';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout';
import routes from './components/routes/Route';


function App() {

  
  const router = createBrowserRouter([
    {
      element: <Layout />,
      // errorElement: <Page404 />,
      children: routes
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
