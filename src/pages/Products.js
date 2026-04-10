import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
const API_BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

function Products(){

const [products, setProducts] = useState([]);

// 🔗 Backend se data fetch
useEffect(()=>{

fetch(`${API_BASE_URL}/api/products`)
.then(res => res.json())
.then(data => setProducts(data))
.catch(err => console.log(err));

},[]);

return(

<div className="products-page">

<h2>Featured Products</h2>

<div className="product-grid">

{products.map((product)=>(
<ProductCard key={product._id} product={product}/>
))}

</div>

</div>

)

}

export default Products;