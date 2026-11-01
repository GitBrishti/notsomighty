import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import './CollectionPage.css'

export default function CollectionPage({ category, categories }) {
  if (!category) {
    return (
      <section className="collection-missing" aria-labelledby="lost-title">
        <span className="collection-superstar" aria-hidden="true">✳</span>
        <p className="eyebrow">UH-OH, WRONG TURN</p>
        <h1 id="lost-title">No art on this wall. <em>Yet.</em></h1>
        <p>That collection doesn't exist, but there's plenty more to explore.</p>
        <a className="button-pill button-ink" href="#shop"><ArrowLeft size={19} /> Back to all collections</a>
      </section>
    )
  }

  const index = categories.findIndex((item) => item.slug === category.slug)
  const related = [1, 2, 3].map((offset) => categories[(index + offset) % categories.length])
  const hasPosterArt = category.slug === 'posters'

  return (
    <div className={`collection-page collection-page--${category.tone}`}>
      <section className="collection-lead" aria-labelledby="collection-heading">
        <div className="collection-copy">
          <a href="#shop" className="collection-back"><ArrowLeft size={17} /> All collections</a>
          <div className="collection-kicker"><Sparkles size={15} /> {category.eyebrow}</div>
          <h1 id="collection-heading">{category.name}<span className="collection-title-dot">.</span></h1>
          <p className="collection-headline">{category.headline}</p>
          <p className="collection-description">{category.description}</p>
          <div className="collection-lead-bottom">
            <span className="collection-pill">✳ ARTWORK DROPPING SOON</span>
            <span className="collection-count">{String(index + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}</span>
          </div>
        </div>
        <div className={`collection-cover ${hasPosterArt ? 'collection-cover--posters' : ''}`}>
          {hasPosterArt ? (
            <img
              src="/images/posters.png"
              alt="Original illustrated film poster collage by Mrinal Maity"
              className="collection-poster-art"
            />
          ) : (
            <div className="collection-symbol-design" aria-hidden="true">
              <span className="collection-shape collection-shape--one" />
              <span className="collection-shape collection-shape--two" />
              <span className="collection-giant-symbol">{category.symbol}</span>
              <span className="collection-curved-text">NOT SO ORDINARY ✳</span>
            </div>
          )}
          <span className="collection-cover-sticker">made with<br />feeling ✷</span>
        </div>
      </section>

      <section className="collection-products" aria-labelledby="collection-products-title">
        <div className="collection-products-heading">
          <div>
            <span className="eyebrow">A PEEK INTO THE COLLECTION</span>
            <h2 id="collection-products-title">The little <em>details.</em></h2>
          </div>
          <span className="collection-heading-flower" aria-hidden="true">✿</span>
        </div>
        <div className="collection-empty">
          <div className="collection-empty-graphic" aria-hidden="true"><span>✺</span><span>✦</span></div>
          <div className="collection-empty-text">
            <span className="collection-status">COMING SOON</span>
            <h3>Good things are in the making.</h3>
            <p>{category.detail}</p>
            <p className="collection-availability">No products are listed for purchase in this collection yet.</p>
            <a className="collection-inline-link" href="#shop">Explore all categories <ArrowUpRight size={18} /></a>
          </div>
        </div>
      </section>

      <section className="collection-next" aria-labelledby="collection-next-title">
        <div className="collection-next-heading">
          <div>
            <span className="eyebrow">STILL CURIOUS?</span>
            <h2 id="collection-next-title">Keep wandering <em>✳</em></h2>
          </div>
          <a href="#shop" className="collection-view-all">View all eight <ArrowRight size={19} /></a>
        </div>
        <div className="collection-related-grid">
          {related.map((other) => (
            <a href={`#/collections/${other.slug}`} className={`collection-related tone-${other.tone}`} key={other.slug}>
              <span className="collection-related-top">NOT SO MIGHTY <ArrowUpRight size={19} /></span>
              <span className="collection-related-symbol" aria-hidden="true">{other.symbol}</span>
              <span className="collection-related-name">{other.name}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
