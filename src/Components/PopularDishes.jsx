"use client"
import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const PopularDishes = () => {
  const { addToCart } = useCart()
  const [dishes,setDishes]=useState([]);
  const navigate=useNavigate()


  useEffect(()=>{
    const fetchData= async ()=>{
      try {
        const response= await axios.get("http://localhost:8080/api/foods/getFoods")
        if (response.data && response.data.length > 0) {
          setDishes(response.data);
          console.log("Dishes fetched successfully:", response.data);
          
        } else {
          console.warn("No dishes found in the response");
        }
      } catch (error) {
        console.error("Error fetching dishes:", error);
        
      }
    }
    fetchData();

  },[])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in slide-in-from-bottom duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Popular Dishes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most loved dishes that keep customers coming back for more
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.slice(3,9).map((dish, index) => (
            <div
              key={dish.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-t-2xl"
              onClick={()=>navigate(`/product/${dish.id}`)}
              >
                
                <img
                  src={dish.imageUrl || "/placeholder.svg"}
                  alt={dish.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                  {dish.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 line-through">${dish.price}</span>
                    <span className="text-xl font-bold text-orange-500">${dish.price-2}</span>
                  </div>
                  <button
                    onClick={() => addToCart(dish)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularDishes
