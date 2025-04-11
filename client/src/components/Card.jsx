import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import CartService from "../services/cart.service";
import useCart from "../hooks/useCart";
import Swal from "sweetalert2";
import ProductItem from "./ProductItem";

const Card = ({ item }) => {
  const { _id, name, image, description, category, price } = item;
  const { user } = useContext(AuthContext);
  const [cart,refetch] = useCart();
  const [isHeartfilled, setIsHeartFilled] = useState(false);
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartfilled);
  };
  const handleAddToCart = async () => {
    
    if (!user || !user.email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please login to add to cart",
      });
      return;
    }
    try {
      const cartItem = {
        productId : _id,
        email: user.email,
        quantity: 1,
        name,
        price,
        image,
      };
      console.log(cartItem);
      const response = await CartService.createCartItems(cartItem);
      
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Item added to cart",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch(); 
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error.message, 
      });
    }
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my5 h:120">
        <div className="rating gap-1 absolute right-2 top-2 p-4 z-10 heartStar"></div>
      <figure>
        <img
          src={image}
          alt={name}
          className="hover:scale-105 transition-all duration-300 md:h-60"
        />
        </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-action justify-between items-center mt-2">
          <h5 className="font-bold">
            {price}
            <span className="text-sm text-red">฿</span>
          </h5>
          <button className="btn bg-red text-white" onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
