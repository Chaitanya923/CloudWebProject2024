import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
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
