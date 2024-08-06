import React from "react"
import PathConstants from "./PathConstants"

const Home = React.lazy(() => import("../Home"))
const About = React.lazy(() => import("../About"))
const Cart = React.lazy(() => import("../Cart"))
const ProductDetail = React.lazy(() => import("../ProductDetail"))
const Products = React.lazy(() => import("../Products"))

const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.CART, element: <Cart /> },
    { path: PathConstants.ABOUT, element: <About /> },
    { path: PathConstants.PRODUCTDETAIL, element: <ProductDetail /> },
    { path: PathConstants.PRODUCTS, element: <Products /> },
]
export default routes