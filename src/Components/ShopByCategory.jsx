import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShopByCategory = () => {
  


 const [categories,setCategories]=useState([]);
   const navigate = useNavigate()

  useEffect(()=>{
    const fetchdata= async ()=>{
try {
  const response= await axios.get("http://localhost:8080/api/category/getCategory")
  const categoriesWithSlug = response.data.map((cat) => ({
  ...cat,
  slug: cat.name.toLowerCase().replace(/\s+/g, "-"), // 👈 naam ko slug me convert kiya
}));
setCategories(categoriesWithSlug);
console.log(categoriesWithSlug);
  
} catch (error) {
  console.log("Error fetching categories:", error);
  
}
}
fetchdata();
  },[])

   const handleCategoryClick = (categorySlug) => {
    navigate(`/category/${categorySlug}`)
    setIsCategoryOpen(false)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in slide-in-from-bottom duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of cuisines and find your perfect meal
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.slice(0,8).map((category, index) => (
            <div
              key={category.id}
              className="group text-center animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleCategoryClick(category.slug)}
            >
              <div className="relative mb-4">
                <div
                  className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${category.color} p-1 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <img
                      src={category.imageUrl || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-white bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-500 transition-colors duration-300">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopByCategory
