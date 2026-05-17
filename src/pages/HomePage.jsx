import HeroSlider from "../components/HeroSlider"
import EditorsPick from "../components/EditorsPick"

import BestsellerProducts from "../components/BestsellerProducts"
import NeuralUniverse from "../components/NeuralUniverse"
import FeaturedPosts from "../components/FeaturedPosts"
import Carousel2 from "../components/Carousel2"
function HomePage() {
  return (
    <main>
     
      <HeroSlider />
      <EditorsPick />
      <BestsellerProducts />
      <Carousel2 />
      <NeuralUniverse />
      <FeaturedPosts />
    </main>
  )
}

export default HomePage