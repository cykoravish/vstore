import Hero from "../components/Hero"
import Categories from "../components/Categories"
import FeaturedProducts from "../components/FeaturedProducts"
import Newsletter from "../components/Newsletter"

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
    </div>
  )
}

export default Home
