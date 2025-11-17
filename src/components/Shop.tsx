import { useState } from 'react'
import { useCart } from '../context/CartContext'

interface Painting {
  id: number
  title: string
  price: number
  image: string
  size: string
  description: string
  available: boolean
}

function Shop() {
  const [expandedImage, setExpandedImage] = useState<number | null>(null)
  const { addItem } = useCart()

  const paintings: Painting[] = [
    { 
      id: 1, 
      title: 'Still Life with Pears', 
      price: 450, 
      image: '/paintings/dad1.jpg',
      size: '24" x 36"',
      description: 'A classic still life rendered in warm tones.',
      available: true
    },
    { 
      id: 2, 
      title: 'Daffodils in a Glass', 
      price: 380, 
      image: '/paintings/dad2.jpg',
      size: '20" x 30"',
      description: 'Bright daffodils arranged in a simple glass vase.',
      available: true
    },
    { 
      id: 3, 
      title: 'Decorative Ginger Jar', 
      price: 520, 
      image: '/paintings/dad3.jpg',
      size: '30" x 40"',
      description: 'An ornate jar study with delicate floral detail.',
      available: true
    }
  ]

  const handleImageClick = (id: number) => {
    setExpandedImage(expandedImage === id ? null : id)
  }

  const handleAddToBasket = (painting: Painting) => {
    addItem(painting, 1)
  }

  return (
    <div className="shop">
      <h1>Available Paintings</h1>
      <div className="paintings-grid">
        {paintings.map(painting => (
          <div key={painting.id} className="painting-card">
            <div 
              className="painting-image-container"
              onClick={() => handleImageClick(painting.id)}
            >
              <img 
                src={painting.image} 
                alt={painting.title} 
                className="painting-image"
              />
            </div>
            {expandedImage === painting.id && (
              <div 
                className="painting-image-container expanded"
              >
                <img 
                  src={painting.image} 
                  alt={painting.title} 
                  className="painting-image"
                />
              </div>
            )}
            <div className="painting-info">
              <h2>{painting.title}</h2>
              <p className="painting-size">{painting.size}</p>
              <p className="painting-description">{painting.description}</p>
              <p className="painting-price">£{painting.price}</p>
              <button 
                className="add-to-basket-button"
                onClick={() => handleAddToBasket(painting)}
              >
                Add to Basket
              </button>
            </div>
          </div>
        ))}
      </div>
      {expandedImage && (
        <div className="modal-backdrop" onClick={() => setExpandedImage(null)} />
      )}
    </div>
  )
}

export default Shop