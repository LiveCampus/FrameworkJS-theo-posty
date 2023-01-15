import Image from 'next/image'
import Link from 'next/link'

const ArticleCard = ({ product }: any) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="contrast"
      key={product.id}
      style={{ textDecoration: 'none', width: 'max-content', height: 'max-content' }}
    >
      <article
        style={{
          width: 300,
          display: 'flex',
          alignItems: 'center',
        }}
      >
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
        <span>{product.price}$</span>
      </article>
    </Link>
  )
}

export default ArticleCard
