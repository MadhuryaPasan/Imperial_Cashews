import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'

const cart = () => {
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>([]);

  // Effect to load cart items from local storage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Function to remove an item from the cart
  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
  };

  return (
    <>
      <h1 className='text-3xl font-bold m-5'>Your Shopping Cart</h1>
      <section className='flex justify-center gap-5 m-5'>
        <Card className='w-[60%]'>
          <h2 className='text-xl font-semibold mb-4'>Cart Items</h2>
          
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className='mb-2 flex justify-between items-center'>
                  <span>
                    Product ID: {item.id} - Quantity: {item.quantity}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Card>
        <Card className='w-[40%]'></Card>
      </section>
    </>
  );
};

export default cart;