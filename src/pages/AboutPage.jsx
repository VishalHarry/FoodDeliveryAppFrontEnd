import { Users, Target, Award, TrendingUp } from "lucide-react"

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "John Smith",
      position: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Passionate about bringing delicious food to your doorstep with 10+ years in the food industry.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Ensures smooth operations and quality control across all our restaurant partners.",
    },
    {
      id: 3,
      name: "Mike Chen",
      position: "Head of Technology",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Leading our tech team to create the best food delivery experience through innovation.",
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "Customer Success Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Dedicated to ensuring every customer has an amazing experience with our platform.",
    },
  ]

  const stats = [
    { icon: TrendingUp, label: "Years in Business", value: "8+" },
    { icon: Users, label: "Happy Customers", value: "50K+" },
    { icon: Award, label: "Orders Delivered", value: "1M+" },
    { icon: Target, label: "Restaurant Partners", value: "500+" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in slide-in-from-bottom duration-1000">
            About Us
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto animate-in slide-in-from-bottom duration-1000 delay-200">
            Connecting food lovers with their favorite restaurants since 2016
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Story */}
        <div className="mb-20 animate-in slide-in-from-bottom duration-1000">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                FoodieApp was born from a simple idea: everyone deserves access to delicious, quality food delivered
                right to their doorstep. Founded in 2016 by a team of food enthusiasts and tech innovators, we started
                with just 10 restaurant partners and a dream to revolutionize food delivery.
              </p>
              <p>
                Today, we're proud to serve over 50,000 happy customers across multiple cities, partnering with more
                than 500 restaurants to bring you the best culinary experiences. Our mission is to make great food
                accessible to everyone, while supporting local restaurants and creating opportunities for delivery
                partners.
              </p>
              <p>
                What sets us apart is our commitment to quality, speed, and customer satisfaction. We use cutting-edge
                technology to ensure your food arrives fresh and hot, while our dedicated customer support team is
                always ready to help make your experience exceptional.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-in slide-in-from-left duration-1000">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To connect people with the food they love, support local restaurants, and create a seamless delivery
              experience that brings communities together through the joy of great food.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 animate-in slide-in-from-right duration-1000">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be the world's most trusted food delivery platform, where every meal is an opportunity to discover new
              flavors, support local businesses, and create memorable dining experiences.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12 animate-in slide-in-from-bottom duration-1000">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-bottom duration-1000"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-orange-500 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="animate-in slide-in-from-bottom duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-in slide-in-from-bottom duration-1000"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20 bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12 animate-in slide-in-from-bottom duration-1000">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-in slide-in-from-bottom duration-1000 delay-200">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quality First</h3>
              <p className="text-gray-600">
                We partner only with restaurants that meet our high standards for food quality and safety.
              </p>
            </div>

            <div className="text-center animate-in slide-in-from-bottom duration-1000 delay-400">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Speed & Reliability</h3>
              <p className="text-gray-600">
                Fast delivery times and reliable service you can count on, every single time.
              </p>
            </div>

            <div className="text-center animate-in slide-in-from-bottom duration-1000 delay-600">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Love</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We go above and beyond to exceed your expectations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
