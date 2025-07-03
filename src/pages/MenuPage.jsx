"use client"

import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, Eye, EyeOff, Search, X, AlertTriangle } from "lucide-react"
import axios from "axios"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function MenuPage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showToggleModal, setShowToggleModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [image, setImage] = useState(false)
  const [editImage, setEditImage] = useState(null)

  const [menuItems, setMenuItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);






  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/category/getCategory");
        console.log("Fetched categories:", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("⚠️ Failed to fetch categories");
        console.log("Message:", error.message);
        console.log("Response:", error.response);
      }
    };

    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/foods/getFoods");
        // console.log("Fetched menu items:", response.data);
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    available: true
  })

  const [editFormData, setEditFormData] = useState({

    name: "",
    description: "",
    price: "",
    category: "",
    available: true
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAdding(true); // Start loader

    const cleanFormData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    const formDataval = new FormData();
    formDataval.append('food', JSON.stringify(cleanFormData));
    formDataval.append('file', image);

    try {
      const response = await axios.post("http://localhost:8080/api/foods/addFood", formDataval, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.status === 200) {
        setFormData({ name: "", description: "", price: "", category: "", available: true });
        setImage(null);
        toast.success("Item added successfully");
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      toast.error("Error: " + (error.response?.data?.message || "Something went wrong"));
    } finally {
      setIsAdding(false); // Stop loader
    }
  };


  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const cleanEditData = {
      ...editFormData,
      price: parseFloat(editFormData.price)
    };

    // console.log("Updating item:", cleanEditData);

    // Prepare FormData like your backend expects
    const formData = new FormData();
    formData.append('food', JSON.stringify(cleanEditData));

    // If you have file upload in edit form, append file
    if (editImage) {
      formData.append('file', editImage);
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/foods/updatedFood/${editFormData.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        // console.log("Item updated successfully:", response.data);
        // alert("Item updated successfully");
        toast.success("Item updated successfully");
        setShowEditForm(false);
        setSelectedItem(null);
        window.location.reload();
      }
    } catch (error) {
      // console.error("Error updating item:", error);
      // alert("Error: " + (error.response?.data?.message || "Something went wrong"));
      toast.error("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };


  const toggleAvailability = (item) => {
    setSelectedItem(item);
    setShowToggleModal(true);
  }

  const handleToggleConfirm = async () => {
    if (!selectedItem) return;

    try {
      const updatedItem = {
        ...selectedItem,
        available: !selectedItem.available
      };

      const response = await axios.put(`http://localhost:8080/api/foods/updateFood/${selectedItem.id}`, updatedItem);
      if (response.status === 200) {
        // console.log("Availability toggled successfully:", response.data);
        // alert(`Item ${updatedItem.available ? 'made available' : 'made unavailable'} successfully`);
        toast.success(`Item ${updatedItem.available ? 'made available' : 'made unavailable'} successfully`);

        setShowToggleModal(false);
        setSelectedItem(null);
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      // console.error("Error toggling availability:", error);
      // alert("Error: " + (error.response?.data?.message || "Something went wrong"));
      toast.error("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditFormData({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      available: item.available
    });
    setEditImage(null); // Reset image selection
    setShowEditForm(true);
  };



  const handleDeleteFood = async (foodId) => {
     const confirm = window.confirm("Are you sure you want to delete this category?");
    if (!confirm) return;
    try {
      const response = await axios.delete(`http://localhost:8080/api/foods/deletefood/${foodId}`);
      // console.log("Food item deleted successfully:", response.data);
      if (response.data) {
        // alert("Food item deleted successfully");

        toast.success("Food item deleted successfully");
        window.location.reload();
      } else {
        // alert("Failed to delete food item: " + response.data);
        toast.error("Failed to delete food item: " + response.data);
      }
    } catch (error) {
      // console.error("Error deleting food item:", error);
      // alert("Error: " + (error.response?.data?.message || "Something went wrong"));
      toast.error("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  }

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // ✅ Show loader

    const formData = new FormData();
    formData.append("category", JSON.stringify(newCategory));
    formData.append("file", imageFile);

    try {
      const response = await axios.post("http://localhost:8080/api/category/addCategory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 && response.data) {
        toast.success("Category added!");
        setCategories((prev) => [...prev, response.data]);
        setShowCategoryModal(false);
        setNewCategory({ name: "", description: "" });
        setImageFile(null);
      } else {
        toast.error("Something went wrong. No data received.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add category");
    } finally {
      setIsSubmitting(false); // ✅ Hide loader
    }
  };


  const handleDeleteCategory = async (categoryId) => {
    const confirm = window.confirm("Are you sure you want to delete this category?");
    if (!confirm) return;

    try {
      const response = await axios.delete(`http://localhost:8080/api/category/category/${categoryId}`);
      if (response.status === 200) {
        toast.success("Category deleted successfully");
        // Refresh categories after deletion
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      toast.error("Error: " + (error.response?.data || "Something went wrong"));
      console.error("Delete error:", error);
    }
  };

  //filter data
  const filteredItems = menuItems.filter((item) => {
  const matchCategory =
    selectedCategory === "all" || item.category === selectedCategory;
  const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
  return matchCategory && matchSearch;
});


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-dark">Menu Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Item</span>
        </button>
      </div>

      {/* Categories Management */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
        <h2 className="text-lg font-semibold text-primary-dark mb-4">Categories</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="p-4 bg-bg-light rounded-lg border border-gray-200 shadow-sm flex items-center space-x-4"
            >
              {/* Category Image */}
              <div className="w-16 h-16 flex-shrink-0 rounded-full">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-full border border-red-600"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col justify-between w-full">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary-dark text-base">{category.name}</span>
                  <div className="flex space-x-2">
                    {/* <button className="text-primary hover:text-primary-dark">
              <Edit className="w-4 h-4" />
            </button> */}
                    <button
                      className="text-accent hover:text-red-700"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* Add Category Card */}
          <div className="p-4 border-2 border-dashed border-neutral rounded-lg flex items-center justify-center">
            <button
              className="text-primary hover:text-primary-dark flex items-center space-x-2"
              onClick={() => setShowCategoryModal(true)}
            >
              <Plus className="w-5 h-5" />
              <span>Add Category</span>
            </button>
          </div>
        </div>
      </div>

      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
            <form onSubmit={handleAddCategory}>
              <input
                type="text"
                placeholder="Category Name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="w-full border border-gray-300 rounded p-2 mb-3"
                required
              />
              <textarea
                placeholder="Description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="w-full border border-gray-300 rounded p-2 mb-3"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setShowCategoryModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 bg-primary text-white rounded hover:bg-primary-dark flex items-center justify-center space-x-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save</span>
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}


      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search menu items..."
                className="pl-10 pr-4 py-2 border border-neutral rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div> */}
         

            <select
              className="border border-neutral rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral">
        <div className="p-6 border-b border-neutral">
          <h2 className="text-lg font-semibold text-primary-dark">Menu Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-light">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-bg-light">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-primary-dark">{item.name}</div>
                        {/* <div className="text-sm text-gray-500">{item.description}</div> */}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.category}</td>
                  <td className="px-6 py-4 text-sm font-medium text-primary">${item.price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                    >
                      {item.available ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleAvailability(item)}
                        className="text-primary hover:text-primary-dark"
                        title={item.available ? "Make Unavailable" : "Make Available"}
                      >
                        {item.available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-primary hover:text-primary-dark"
                        title="Edit Item"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-accent hover:text-red-700"
                        onClick={() => handleDeleteFood(item.id)}
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Item Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="p-6 border-b border-neutral flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary-dark">Add New Menu Item</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Description</label>
                <textarea
                  required
                  rows={3}
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Category</label>
                <select
                  required
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.value}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="rounded border-neutral text-primary focus:ring-primary"
                />
                <label htmlFor="available" className="ml-2 text-sm text-primary-dark">
                  Available
                </label>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-neutral rounded-lg text-gray-700 hover:bg-bg-light"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center space-x-2"
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <span>Add Item</span>
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary-dark">Edit Menu Item</h3>
              <button
                onClick={() => setShowEditForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              {/* Current Image Display */}
              {/* <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Current Image</label>
                <div className="flex justify-center mb-3">
                  <img
                    src={selectedItem?.imageUrl || "/placeholder.svg"}
                    alt={selectedItem?.name || "Food item"}
                    className="w-32 h-32 rounded-lg object-cover border border-neutral"
                  />
                </div>
              </div> */}

              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Description</label>
                <textarea
                  required
                  rows={3}
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Category</label>
                <select
                  required
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={editFormData.category}
                  onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.value}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* New Image Upload */}
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">
                  Upload New Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditImage(e.target.files[0])}
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {editImage && (
                  <div className="mt-2">
                    <p className="text-sm text-green-600">New image selected: {editImage.name}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="edit-available"
                  checked={editFormData.available}
                  onChange={(e) => setEditFormData({ ...editFormData, available: e.target.checked })}
                  className="rounded border-neutral text-primary focus:ring-primary"
                />
                <label htmlFor="edit-available" className="ml-2 text-sm text-primary-dark">
                  Available
                </label>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  className="px-4 py-2 border border-neutral rounded-lg text-gray-700 hover:bg-bg-light"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg">
                  Update Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Food Information Modal */}
      {showToggleModal && selectedItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral flex items-center justify-between">
              <h3 className="text-xl font-semibold text-primary-dark">Food Information</h3>
              <button
                onClick={() => setShowToggleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Food Image */}
                <div className="flex justify-center">
                  <img
                    src={selectedItem.imageUrl || "/placeholder.svg"}
                    alt={selectedItem.name}
                    className="w-48 h-48 rounded-lg object-cover shadow-md"
                  />
                </div>

                {/* Basic Information */}
                <div className="bg-bg-light rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-primary-dark mb-3">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Name</label>
                      <p className="text-primary-dark font-medium">{selectedItem.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Category</label>
                      <p className="text-primary-dark">{selectedItem.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Price</label>
                      <p className="text-primary font-semibold text-lg">${selectedItem.price}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <span
                        className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${selectedItem.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                      >
                        {selectedItem.available ? "Available" : "Unavailable"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-bg-light rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-primary-dark mb-3">Description</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedItem.description}</p>
                </div>

                {/* Additional Information (if available) */}
                {(selectedItem.id || selectedItem.createdAt || selectedItem.updatedAt) && (
                  <div className="bg-bg-light rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-primary-dark mb-3">Additional Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedItem.id && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Item ID</label>
                          <p className="text-primary-dark">{selectedItem.id}</p>
                        </div>
                      )}
                      {selectedItem.createdAt && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Created At</label>
                          <p className="text-primary-dark">{new Date(selectedItem.createdAt).toLocaleDateString()}</p>
                        </div>
                      )}
                      {selectedItem.updatedAt && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Last Updated</label>
                          <p className="text-primary-dark">{new Date(selectedItem.updatedAt).toLocaleDateString()}</p>
                        </div>
                      )}
                      {selectedItem.ingredients && (
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium text-gray-600">Ingredients</label>
                          <p className="text-primary-dark">{selectedItem.ingredients}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Nutritional Information (if available) */}
                {(selectedItem.calories || selectedItem.protein || selectedItem.carbs || selectedItem.fat) && (
                  <div className="bg-bg-light rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-primary-dark mb-3">Nutritional Information</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedItem.calories && (
                        <div className="text-center">
                          <label className="text-sm font-medium text-gray-600">Calories</label>
                          <p className="text-primary-dark font-semibold">{selectedItem.calories}</p>
                        </div>
                      )}
                      {selectedItem.protein && (
                        <div className="text-center">
                          <label className="text-sm font-medium text-gray-600">Protein</label>
                          <p className="text-primary-dark font-semibold">{selectedItem.protein}g</p>
                        </div>
                      )}
                      {selectedItem.carbs && (
                        <div className="text-center">
                          <label className="text-sm font-medium text-gray-600">Carbs</label>
                          <p className="text-primary-dark font-semibold">{selectedItem.carbs}g</p>
                        </div>
                      )}
                      {selectedItem.fat && (
                        <div className="text-center">
                          <label className="text-sm font-medium text-gray-600">Fat</label>
                          <p className="text-primary-dark font-semibold">{selectedItem.fat}g</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-neutral">
                  <button
                    onClick={() => setShowToggleModal(false)}
                    className="px-6 py-2 border border-neutral rounded-lg text-gray-700 hover:bg-bg-light"
                  >
                    Close
                  </button>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setShowToggleModal(false);
                        handleEdit(selectedItem);
                      }}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Item</span>
                    </button>
                    {/* <button
                      onClick={handleToggleConfirm}
                      className={`px-6 py-2 rounded-lg text-white flex items-center space-x-2 ${
                        selectedItem.available
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {selectedItem.available ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span>{selectedItem.available ? 'Make Unavailable' : 'Make Available'}</span>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}