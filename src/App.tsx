import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Shop from './components/Shop'
import Contact from './components/Contact'
import Cart from './components/Cart'
import { CartProvider, useCart } from './context/CartContext'

function CartIcon() {
  const { itemCount } = useCart()
  
  return (
    <Link to="/cart" className="cart-icon-link">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
      {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
    </Link>
  )
}

function AppContent() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="app-container">
      <nav className="navigation">
        <Link to="/" className="logo-link">
          <h1>Mat Grogan</h1>
        </Link>
        {!isHomePage && (
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact</Link>
            <CartIcon />
            
          </div>
        )}
      </nav>

      <main className={`main-content ${isHomePage ? 'home-page' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      <footer className={`footer ${isHomePage ? 'fixed-footer' : ''}`}>
        <p>&copy; {new Date().getFullYear()} Mat Grogan Oils. All rights reserved.</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider> 
    </Router>
  )
}

export default App