import React from "react"
import PathConstants from "./PathConstants"

const Home = React.lazy(() => import("../Home"))
const About = React.lazy(() => import("../About"))
const Cart = React.lazy(() => import("../Cart"))
const ProductDetail = React.lazy(() => import("../ProductDetail"))
const Products = React.lazy(() => import("../Products"))
const Payment = React.lazy(() => import("../Payment"))

const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.CART, element: <Cart /> },
    { path: PathConstants.ABOUT, element: <About /> },
    { path: PathConstants.PRODUCTDETAIL, element: <ProductDetail /> },
    { path: PathConstants.PRODUCTS, element: <Products /> },
    { path: PathConstants.PAYMENT, element: <Payment /> },
]
export default routes