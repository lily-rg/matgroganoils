import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const paintings = [
    { id: 1, src: '/paintings/dad1.jpg', title: 'Still Life with Pears' },
    { id: 2, src: '/paintings/dad2.jpg', title: 'Daffodils in a Glass' },
    { id: 3, src: '/paintings/dad3.jpg', title: 'Decorative Ginger Jar' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === paintings.length - 1 ? 0 : prev + 1
      )
    }, 5000)
    return () => clearInterval(timer)
  }, [paintings.length])

  return (
    <div className="home-fullscreen">
      {/* Background slideshow */}
      <div className="background-slideshow">
        {paintings.map((painting, index) => (
          <div
            key={painting.id}
            className={`background-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${painting.src})` }}
          />
        ))}
      </div>

      {/* Overlay for darkening */}
      <div className="background-overlay" />

      {/* Center content */}
      <div className="home-center-content">
        <h1 className="home-title">Welcome to <br />Mat Grogan Oils</h1>
        <nav className="home-nav">
          <Link to="/about" className="home-nav-link">About</Link>
          <Link to="/shop" className="home-nav-link">Shop</Link>
          <Link to="/contact" className="home-nav-link">Contact</Link>
        </nav>
      </div>
    </div>
  )
}

export default Home