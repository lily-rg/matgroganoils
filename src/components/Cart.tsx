import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

function Cart() {
  const { items, removeItem, updateQty, clear, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h1>Your Basket</h1>
          <p>Your basket is empty</p>
          <Link to="/shop" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1>Your Basket</h1>
      <div className="cart-content">
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                {item.size && <p className="cart-item-size">{item.size}</p>}
                <p className="cart-item-price">£{item.price}</p>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                </div>
                <button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
              <div className="cart-item-total">
                £{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          <button className="checkout-button">Proceed to Checkout</button>
          <button className="clear-cart-button" onClick={clear}>Clear Basket</button>
          <Link to="/shop" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
