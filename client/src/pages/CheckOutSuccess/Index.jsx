import React from "react";
import "./style.css";

const index = () => {
  return (
    <div className="checkout">
      <h2>Check out Successful</h2>
      <p>Your order might take sometime yo process</p>
      <p>Check your order status at your profile after about 10 mins.</p>
      <p>
        {" "}
        In case of any inquiries contact the support at{" "}
        <strong>Support@se-shop.come</strong>
        {""}
      </p>
    </div>
  );
};

export default index;
