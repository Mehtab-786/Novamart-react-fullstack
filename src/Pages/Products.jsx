import { useEffect } from "react";
import { useProduct } from "../Contexts/ProductContext"
import { useNavigate } from "react-router-dom";

function Products() {
  const {allproduct} = useProduct();
  const navigate = useNavigate()
  useEffect(() => {
    if(allproduct){
      console.log(allproduct)
    }
  }, [navigate])

  return (
    <div>Products</div>
  )
}

export default Products