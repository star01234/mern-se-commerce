import api from "./api";  
const API_URL = "/stripe";  

const createCheckOutSession = async (data) => {
  // แสดง URL ที่ถูกสร้างขึ้นใน console.log
  console.log("Request URL:", `${api.defaults.baseURL}${API_URL}/create-checkout-session`);  
  
  // ส่งคำขอไปยังเซิร์ฟเวอร์
  return await api.post(`${API_URL}/create-checkout-session`, data);  
};

const StripeService = {
  createCheckOutSession,
};

export default StripeService;
