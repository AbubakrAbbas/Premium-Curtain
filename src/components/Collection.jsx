import { motion } from "framer-motion";
import { collections, products } from "../data/siteData";
import ProductImage from "./ProductImage";
import Reveal from "./Reveal";
import { Arrow, Cube } from "./Icons";

function ProductCard({ product, view = 0, onOpen, onView3D }) {
  const has3D = Boolean(product.kind); // only curtains with a fabric kind get a 3D model
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      <button
        type="button"
        onClick={() => onOpen(product)}
        aria-label={`View details for ${product.name}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-3xl bg-sand text-left"
      >
        <div className="h-full w-full transition duration-700 ease-out group-hover:scale-[1.04]">
          <ProductImage product={product} view={view} />
        </div>
      </button>

      <div className="mt-5">
        <h3 className="text-2xl">{product.name}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
          {product.tagline}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => onOpen(product)}
          className="btn btn-primary !px-5 !py-2.5"
        >
          View Details <Arrow width={16} height={16} />
        </button>
        {has3D && (
          <button
            type="button"
            onClick={() => onView3D(product.id)}
            className="btn btn-ghost !px-5 !py-2.5"
          >
            <Cube width={16} height={16} /> View in 3D
          </button>
        )}
      </div>
    </motion.article>
  );
}

/** The collections, each as its own section on the page. */
export default function Collection({ onOpen, onView3D }) {
  return (
    <div id="collection">
      {collections.map((col, i) => {
        const shown = products.filter((p) => p.category === colCategory(col));
        return (
          <section
            key={col.id}
            id={col.id}
            className={`section ${i % 2 === 1 ? "bg-sand/50" : ""}`}
            aria-label={col.eyebrow}
          >
            <div className="wrap">
              <Reveal className="max-w-2xl">
                <p className="eyebrow">{col.eyebrow}</p>
                <h2 className="h2 mt-4">{col.title}</h2>
                <p className="lead mt-5">{col.lead}</p>
              </Reveal>

              <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((p, idx) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    view={p.photos ? 0 : idx % 3}
                    onOpen={onOpen}
                    onView3D={onView3D}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

// map a collection entry to its product category name
function colCategory(col) {
  return (
    {
      curtains: "Curtains",
      wallpaper: "Wallpaper",
      "tv-wall": "TV Wall Design",
      molding: "Molding",
      furniture: "Furniture",
    }[col.id] || col.id
  );
}
