import CurtainArt from './CurtainArt'
import InteriorArt from './InteriorArt'

export const VIEWS = ['closed', 'drawn', 'detail']
export const VIEW_LABELS = ['Closed', 'Open', 'Fabric']

/** How many gallery images a product has (real photos if provided, else 3 drawn views). */
export const viewCount = (product) => product.photos?.length || VIEWS.length

/** Shows a real photo if the product has `photos`, otherwise the drawn curtain artwork. */
export default function ProductImage({ product, colorHex, view = 0, className = '' }) {
  const photo = product.photos?.[view]
  if (photo) {
    return (
      <img
        src={photo}
        alt={`${product.name}, view ${view + 1}`}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }
  const art = product.art || 'curtain'
  if (art !== 'curtain') {
    return (
      <InteriorArt
        art={art}
        color={colorHex || product.colors[0].hex}
        variant={VIEWS[view] || 'closed'}
        className={className}
      />
    )
  }
  return (
    <CurtainArt
      kind={product.kind}
      color={colorHex || product.colors[0].hex}
      variant={VIEWS[view] || 'closed'}
      className={className}
    />
  )
}
