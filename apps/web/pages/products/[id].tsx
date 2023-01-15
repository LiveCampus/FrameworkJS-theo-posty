import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { BsCart, BsShop } from 'react-icons/bs'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link'

export default function Product() {
  const router = useRouter()
  const { cart, addToCart, removeFromCart } = useCart()
  const { id } = router.query
  const { authUser } = useAuth()

  const [product, setProduct] = useState<any>()

  useEffect(() => {
    if (!id) return

    axios
      .get(process.env.NEXT_PUBLIC_API_URL + '/products/' + id)
      .then((res) => setProduct(res.data.data))
      .catch((e) => console.error(e))
  }, [id])

  return (
    <>
      <Head>
        <title>{product ? product.name : 'product'}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container">
        {product && (
          <>
            <hgroup>
              <h1>
                {product.name} ({product.price}$)
              </h1>
              <h2>{product.description}</h2>
            </hgroup>
            {product.image && (
              <figure>
                <Image src={product.image} alt={product.name} width={500} height={500} />
              </figure>
            )}
            {authUser ? (
              <div>
                <button
                  style={{
                    display: 'inline-block',
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
                  <b>
                    {(cart.find((cart: any) => cart.id === product.id)?.qty || 0) * product.price}
                  </b>
                  $)
                </span>
                <BsCart />
                <button
                  style={{
                    display: 'inline-block',
                    width: 'fit-content',
                    marginLeft: 10,
                  }}
                  onClick={() => addToCart(product.id)}
                >
                  +
                </button>
              </div>
            ) : (
              <p>
                Please <Link href="/login">login</Link> to order some of this product !
              </p>
            )}
          </>
        )}
      </main>
    </>
  )
}
