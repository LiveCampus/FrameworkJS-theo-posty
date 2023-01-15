import Image from 'next/image'
import { BsCart } from 'react-icons/bs'
import { useCart } from '../context/CartContext'

const CartItem = ({ product, qty }: any) => {
  const { cart, removeFromCart, addToCart } = useCart()
  return (
    <article style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      {product.image ? (
        <Image
          width={50}
          height={50}
          style={{ marginRight: 25 }}
          src={product.image}
          alt={product.name}
        />
      ) : (
        <Image
          width={50}
          height={50}
          style={{ marginRight: 25 }}
          src={
            'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png'
          }
          alt={product.name}
        />
      )}

      <span
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minWidth: 0,
          marginRight: 25,
        }}
      >
        {product.name}
      </span>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          style={{
            marginBottom: 0,
            width: 'fit-content',
            background: 'red',
            marginRight: 10,
          }}
          onClick={() => {
            removeFromCart(product.id)
          }}
        >
          -
        </button>
        <span style={{ marginRight: 10 }}>
          <b>{cart.find((cart: any) => cart.id === product.id)?.qty || 0}</b> (
          <b>{(cart.find((cart: any) => cart.id === product.id)?.qty || 0) * product.price}</b>
          $)
        </span>
        <BsCart />
        <button
          style={{
            marginBottom: 0,
            width: 'fit-content',
            marginLeft: 10,
          }}
          onClick={() => addToCart(product.id, product.price)}
        >
          +
        </button>
      </div>
    </article>
  )
}

export default CartItem
