import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function currency(amount: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount)
}

export default function Cart() {
  const { items, updateQty, removeItem, clear, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="shop" style={{ textAlign: 'center' }}>
        <h1>Your Basket</h1>
        <p className="contact-intro">Your basket is empty.</p>
        <Link to="/shop" className="home-nav-link" style={{ display: 'inline-block' }}>Browse Paintings</Link>
      </div>
    )
  }

  return (
    <div className="shop">
      <h1>Your Basket</h1>
      <div className="cart-list">
        {items.map(item => (
          <div key={item.id} className="cart-row">
            <img src={item.image} alt={item.title} className="cart-thumb" />
            <div className="cart-info">
              <div className="cart-title">{item.title}</div>
              {item.size && <div className="cart-size">{item.size}</div>}
              <div className="cart-price">{currency(item.price)}</div>
            </div>
            <div className="cart-qty">
              <button onClick={() => updateQty(item.id, item.quantity - 1)} aria-label="decrease quantity">−</button>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={e => updateQty(item.id, Number(e.target.value) || 1)}
              />
              <button onClick={() => updateQty(item.id, item.quantity + 1)} aria-label="increase quantity">+</button>
            </div>
            <div className="cart-line-total">{currency(item.price * item.quantity)}</div>
            <button className="cart-remove" onClick={() => removeItem(item.id)} aria-label={`remove ${item.title}`}>
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-subtotal">Subtotal: {currency(subtotal)}</div>
        <div className="cart-actions">
          <button className="home-nav-link" onClick={clear}>Clear Basket</button>
          <button className="home-nav-link" disabled title="Checkout coming soon">Checkout</button>
        </div>
      </div>
    </div>
  )
}
