export const dynamic = 'force-dynamic'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Gallery from '@/components/Gallery'
import Amenities from '@/components/Amenities'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Gallery />
      <Amenities />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
