import { useMutation } from '@apollo/client';
import { PLACE_ORDER } from '../graphql/mutations';
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';
import '../styles/cart.css';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, increment, decrement, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [placeOrder] = useMutation(PLACE_ORDER);

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleCheckout = async () => {
    const orderItems = cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const customerName = user?.displayName || 'Anonymous';
    const address = prompt('Enter delivery address');
    if (!address) return;

    try {
      await placeOrder({
        variables: {
          items: orderItems,
          customerName,
          address
        }
      });
      alert('Order placed successfully!');
      clearCart();
      onClose();
    } catch (err) {
      alert('Order failed!');
    }
  };

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button onClick={onClose}>×</button>
      </div>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-info">
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <div className="cart-qty">
                  <button onClick={() => decrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increment(item)}>+</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer">
        <p>Total: ₹{total}</p>
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout (COD)
        </button>
      </div>
    </div>
  );
}
