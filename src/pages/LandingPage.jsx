import BestRestaurants from "../Components/BestRestaurants"
import BigDeals from "../Components/BigDeals"
import Blogs from "../Components/Blogs"
import ExploreBestsellers from "../Components/ExploreBestsellers"
import HeroBanner from "../Components/HeroBanner"
import PopularDishes from "../Components/PopularDishes"
import ShopByCategory from "../Components/ShopByCategory"
import StorySection from "../Components/StorySection"
import TopPicks from "../Components/TopPicks"


const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeroBanner />
      <PopularDishes />
      <ShopByCategory />
      <ExploreBestsellers />
      <TopPicks />
      <BestRestaurants />
      <Blogs />
      <BigDeals />
      <StorySection />
    </div>
  )
}

export default LandingPage
