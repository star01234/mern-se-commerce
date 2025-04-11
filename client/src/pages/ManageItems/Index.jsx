import { useEffect, useState } from "react";
import ProductService from "../../services/product.service";
import Swal from "sweetalert2";

const index = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [productsPerPage] = useState(5); 

  // โหลดข้อมูลสินค้าจาก API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  // ลบสินค้า
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await ProductService.deleteProduct(id);
        fetchProducts();
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the product.", "error");
      }
    }
  };

  // เปิด Modal สำหรับแก้ไขสินค้า
  const handleEdit = (product) => {
    setEditProduct(product);
  };

  // อัปเดตสินค้า
  const handleUpdate = async () => {
    try {
      await ProductService.updateProduct(editProduct._id, editProduct);
      setEditProduct(null);
      fetchProducts();
      Swal.fire("Updated!", "Product updated successfully.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to update the product.", "error");
    }
  };

  // คำนวณสินค้าที่จะแสดงในหน้าปัจจุบัน
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // การเปลี่ยนหน้า
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Products</h2>

      {/* ตารางแสดงสินค้า */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Price (THB)</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-3">
                    No products found
                  </td>
                </tr>
              ) : (
                currentProducts.map((product) => (
                  <tr key={product._id} className="text-center">
                    <td className="p-3 border">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover mx-auto rounded-md"
                      />
                    </td>
                    <td className="p-3 border">{product.name}</td>
                    <td className="p-3 border">{product.category}</td>
                    <td className="p-3 border">{product.price} THB</td>
                    <td className="p-3 border">
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-3"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-400 text-white rounded-l"
        >
          Prev
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * productsPerPage >= products.length}
          className="px-4 py-2 bg-gray-400 text-white rounded-r"
        >
          Next
        </button>
      </div>

      {/* Modal สำหรับแก้ไขสินค้า */}
      {editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <label className="block">Product Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-3"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />

            <label className="block">Price (THB)</label>
            <input
              type="number"
              className="w-full border p-2 rounded mb-3"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
            />

            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setEditProduct(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
