import { useEffect, useState } from "react";
import OrderService from "../../services/order.service";
import Swal from "sweetalert2";
import { MdDelete, MdVisibility } from "react-icons/md";

const Index = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await OrderService.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await OrderService.deleteOrder(orderId);
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== orderId)
          );
          Swal.fire("Deleted!", "The order has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting order:", error);
          Swal.fire("Error!", "Failed to delete the order.", "error");
        }
      }
    });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the order status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await OrderService.updateOrderStatus(orderId, newStatus);
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId
                ? { ...order, delivery_status: newStatus }
                : order
            )
          );
          Swal.fire("Updated!", "Order status has been updated.", "success");
        } catch (error) {
          console.error("Error updating status:", error);
          Swal.fire("Error!", "Failed to update status.", "error");
        }
      }
    });
  };

  const handleViewDetails = (order) => {
    const orderDetailsHtml = `
    <div style="text-align: left;">
      <h3 style="font-size: 20px; font-weight: bold;">Order Details</h3>

      <h4 style="margin-top: 10px; font-weight: bold;">Products</h4>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="background-color: #f4f4f4;">
            <th style="border: 1px solid #ddd; padding: 8px;">#</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Image</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Name</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Unit Price</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${
            order.products && order.products.length > 0
              ? order.products
                  .map(
                    (order, index) => `
                   
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  index + 1
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">
                  <img src="${order.productId.image || "/placeholder.png"}" 
                       alt="Product Image" width="50" height="50" />
                </td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  order.productId.name || "No Name"
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">฿${
                  order.productId?.price
                    ? order.productId.price.toLocaleString()
                    : "0.00"
                }</td>

                <td style="border: 1px solid #ddd; padding: 8px;">${
                  order.quantity || "0"
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">฿${
                  order.quantity * order.productId?.price
                }</td>
              </tr>
            `
                  )
                  .join("")
              : `<tr><td colspan="6" style="text-align: center; padding: 8px;">No Products Found</td></tr>`
          }
        </tbody>
      </table>

      <h4 style="font-weight: bold; margin-top: 10px;">Total: ฿${
        order.total
      }</h4>
      
      <h4 style="margin-top: 20px; font-weight: bold;">Shipping Details</h4>
      <div style="display: flex; justify-content: space-between;">
        <div>
          <p><strong>Name:</strong> ${order.shipping.name || "N/A"}</p>
          <p><strong>Phone:</strong> ${order.shipping.phone || "N/A"}</p>
          <p><strong>Address:</strong> ${
            order.shipping?.address?.line1 || "N/A"
          }</p>
        </div>
        <div>
          <p><strong>City:</strong> ${
            order.shipping?.address?.city || "N/A"
          }</p>
          <p><strong>Country:</strong> ${
            order.shipping?.address?.country || "N/A"
          }</p>
          <p><strong>Postal Code:</strong> ${
            order.shipping.address.postal_code || "N/A"
          }</p>
        </div>
      </div>
    </div>
  `;

    Swal.fire({
      title: "Order Details",
      html: orderDetailsHtml,
      confirmButtonText: "Close",
      width: "700px",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Orders</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-maroon-700 text-white">
              <th className="p-3 border text-black">OrderId</th>
              <th className="p-3 border text-black">Email</th>
              <th className="p-3 border text-black">Total</th>
              <th className="p-3 border text-black">Payment Status</th>
              <th className="p-3 border text-black">Delivery Status</th>
              <th className="p-3 border text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-3">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="p-3 border">
                    {order._id.slice(0, 3)} ... {order._id.slice(-3)}
                  </td>
                  <td className="p-3 border">{order.email}</td>
                  <td className="p-3 border">
                    {order.total.toLocaleString()} THB
                  </td>
                  <td className="p-3 border">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        order.payment_status === "paid"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.payment_status === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="p-3 border">
                    <select
                      className="border p-2 rounded"
                      value={order.delivery_status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="p-3 border flex justify-center space-x-2">
                    <button
                      className="bg-green-500 text-white p-2 rounded-full"
                      title="View Details"
                      onClick={() => handleViewDetails(order)}
                    >
                      <MdVisibility size={20} />
                    </button>
                    <button
                      className="bg-red text-white p-2 rounded-full"
                      title="Delete Order"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;