import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useCart from "../../hooks/useCart";
import CartService from "../../services/cart.service";
import PaymentButton from "../../components/PaymentButton";
import Swal from "sweetalert2";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { ImBin2 } from "react-icons/im";

const Index = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  console.log("Cart data:", cart);
  const totalPrice = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }
    return total;
  };  

  // Format currency build-in function
  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };
  
  const handleClearCart = async () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure to clear your shopping cart?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CartService.clearCart(user?.email);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Shopping Cart Cleared!",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      }
    });
  };

  const handleDeleteItem = async (cartItem) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CartService.deleteCartItem(cartItem._id);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      }
    });
  };

  const handleIncrease = async (cartItem) => {
    if (cartItem.quantity < 10) {
      try {
        const response = await CartService.updateCartItem(cartItem._id, {
          quantity: cartItem.quantity + 1,
        });
        if (response.status === 200) refetch();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    }
  };

  const handleDecrease = async (cartItem) => {
    if (cartItem.quantity > 1) {
      try {
        const response = await CartService.updateCartItem(cartItem._id, {
          quantity: cartItem.quantity - 1,
        });
        if (response.status === 200) refetch();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    } else {
      handleDeleteItem(cartItem);
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] py-28 flex flex-col items-center justify-center">
        <div className="text-center px-4 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug">
            Items Added to The <span className="text-red-500">Cart</span>
          </h2>
        </div>
      </div>
      <div className="section-container min-h-screen bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100% h-[80.5vh]">
        <div className="justify-end items-end flex p-2">
          <button
            className="btn btn-ghost text-red"
            onClick={() => handleClearCart(user?.email)}
          >
            Clear List
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-red text-white text-center">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price per Unit</th>
                <th className="w-12">Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <tr key={index}>
                    <td className="font-bold">{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-14 w-14">
                          <img src={item.image} alt={`${item.name} image`} />
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <div className="space-x-2 flex justify-center items-center">
                        <button
                          className="btn btn-xs"
                          onClick={() => handleDecrease(item)}
                        >
                          <FiMinus />
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          className="btn btn-xs"
                          onClick={() => handleIncrease(item)}
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </td>
                    <td>{formatPrice(item.price)}</td>
                    <td className="w-12">
                      {formatPrice(item.quantity * item.price)}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="text-red hover:scale-110 transition-transform duration-200"
                      >
                        <ImBin2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No item in cart
                  </td>
                </tr>
              )}
            </tbody>
            {/* foot */}
            <tfoot className="text-center">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price per Unit</th>
                <th className="w-12">Price</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
        {cart.length > 0 ? (
          <div className="overflow-x-auto">
            <hr />
            <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold">Customer Details</h3>
                <p>Name: {user?.displayName}</p>
                <p>Email: {user?.email}</p>
                <p>User_Id: {user?.uid}</p>
              </div>
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold">Shopping Details</h3>
                <p>Total Items: {cart.length} items</p>
                <p>Total Price: {formatPrice(totalPrice(cart))}</p>
                  <PaymentButton cartItems={cart} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-2xl font-bold text-center text-red mb-4"></div>
          </div>
        )}
      </div>
      <div />
    </div>
  );
};

export default Index;
