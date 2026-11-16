

import { useEffect, useMemo, useState } from "react";

import {

  Menu,

  X,

  Search,

  UserRound,

  ShoppingBag,

  ArrowUpRight,

  ArrowLeft,

  ArrowRight,

  Heart,

  Star,

  Sparkles,

  Smile,

  Flower2,

  CalendarDays,

  Image as ImageIcon,

  Bookmark,

  Coffee,

  Magnet,

  Shirt,

  Mail

} from "lucide-react";



import "./App.css";



/* =========================================

   PRODUCT CATALOG

   ========================================= */



const products = [

  {

    id: "masaan",

    name: "Masaan",

    category: "posters",

    type: "Illustrated poster",

    description:

      "An illustrated tribute to the stories and emotions that stay with us.",

    images: [

      "/products/posters/masaan@0.5x.png"

    ],

    featured: true

  },

  {

    id: "october",

    name: "October",

    category: "posters",

    type: "Illustrated poster",

    description:

      "A quiet, thoughtful piece inspired by a story that lingers.",

    images: [

      "/products/posters/october@0.5x.png"

    ],

    featured: true

  },

  {

    id: "namesake",

    name: "Namesake",

    category: "posters",

    type: "Illustrated poster",

    description:

      "A visual celebration of stories, belonging and identity.",

    images: [

      "/products/posters/namesake@0.5x.png"

    ]

  },

  {

    id: "labour-of-love",

    name: "Labour of Love",

    category: "posters",

    type: "Illustrated poster",

    description:

      "Original illustrated artwork made for the walls you love.",

    images: [

      "/products/posters/labour of love@0.5x.png"

    ]

  },

  {

    id: "indian-calendar",

    name: "Indian Calendar",

    category: "calendars",

    type: "Calendar mockups",

    description:

      "A desk calendar concept celebrating Indian cinema.",

    images: [

      "/products/calendars/indian 1@0.5x.png",

      "/products/calendars/indian 2@0.5x.png"

    ]

  },

  {

    id: "kobita-calendar",

    name: "Kobita Calendar",

    category: "calendars",

    type: "Calendar mockups",

    description:

      "Poetry and illustration brought into everyday moments.",

    images: [

      "/products/calendars/kobita 1@0.5x.png",

      "/products/calendars/kobita 2@0.5x.png"

    ],

    featured: true

  },

  {

    id: "playlist-calendar",

    name: "Playlist Calendar",

    category: "calendars",

    type: "Calendar mockups",

    description:

      "A colorful calendar concept inspired by music and playlists.",

    images: [

      "/products/calendars/playlist 1@0.5x.png",

      "/products/calendars/playlist 2@0.5x.png"

    ],

    featured: true

  },

  {

    id: "world-calendar",

    name: "World Calendar",

    category: "calendars",

    type: "Calendar mockups",

    description:

      "A visual journey through cinema, places and everyday creativity.",

    images: [

      "/products/calendars/world 1@0.5x.png",

      "/products/calendars/world 2@0.5x.png"

    ]

  }

];



const categories = [

  {

    id: "posters",

    name: "Posters",

    subtitle: "For walls with stories to tell",

    tone: "teal",

    symbol: "✳"

  },

  {

    id: "calendars",

    name: "Calendars",

    subtitle: "A little joy, all year long",

    tone: "yellow",

    symbol: "✿"

  },

  {

    id: "bookmarks",

    name: "Bookmarks",

    subtitle: "Small art for big stories",

    tone: "coral",

    symbol: "✦"

  },

  {

    id: "invitations",

    name: "Invitation Cards",

    subtitle: "Start something wonderful",

    tone: "cream",

    symbol: "♡"

  },

  {

    id: "tshirts",

    name: "T-shirts",

    subtitle: "Wear what you love",

    tone: "yellow",

    symbol: "★"

  },

  {

    id: "mugs",

    name: "Coffee Mugs",

    subtitle: "A little art with your coffee",

    tone: "cream",

    symbol: "☻"

  },

  {

    id: "magnets",

    name: "Fridge Magnets",

    subtitle: "Tiny pieces of happiness",

    tone: "teal",

    symbol: "✳"

  },

  {

    id: "coasters",

    name: "Coasters",

    subtitle: "Everyday things, made fun",

    tone: "coral",

    symbol: "✿"

  }

];



/* =========================================

   ROUTING HELPERS

   ========================================= */



function getRoute() {

  const hash = window.location.hash || "#/home";

  return hash.replace(/^#\/?/, "").split("?")[0] || "home";

}



function navigate(path) {

  window.location.hash = `#/${path}`;

}



function ImageFallback({ label = "Artwork" }) {

  return (

    <div className="artwork-fallback">

      <span>✳</span>

      <small>{label}</small>

    </div>

  );

}



function ArtworkImage({ src, alt, className = "" }) {

  const [failed, setFailed] = useState(false);



  useEffect(() => {

    setFailed(false);

  }, [src]);



  if (!src || failed) {

    return <ImageFallback label={alt} />;

  }



  return (

    <img

      src={src}

      alt={alt}

      className={className}

      loading="lazy"

      onError={() => setFailed(true)}

    />

  );

}



/* =========================================

   PRODUCT CARD

   ========================================= */



function ProductCard({ product }) {

  return (

    <a

      className="product-tile"

      href={`#/product/${product.id}`}

      aria-label={`View ${product.name}`}

    >

      <div className="product-picture">

        <ArtworkImage

          src={product.images[0]}

          alt={`${product.name} artwork mockup`}

        />

      </div>



      <div className="product-caption">

        <div>

          <h3>{product.name}</h3>

          <p>{product.type}</p>

          <small>View artwork · Coming soon</small>

        </div>



        <span className="circle-arrow">

          <ArrowUpRight size={19} />

        </span>

      </div>

    </a>

  );

}



/* =========================================

   HEADER

   ========================================= */



function Header({ cartCount = 0 }) {

  const [menuOpen, setMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");



  const searchResults = useMemo(() => {

    const query = searchQuery.trim().toLowerCase();



    if (!query) return [];



    return products.filter((product) => {

      const text =

        `${product.name} ${product.category} ${product.type}`

          .toLowerCase();



      return text.includes(query);

    });

  }, [searchQuery]);



  const closePanels = () => {

    setMenuOpen(false);

    setSearchOpen(false);

    setSearchQuery("");

  };



  const navLinks = [

    { label: "Home", href: "#/home" },

    { label: "Our vibe", href: "#/vibe" },

    { label: "Fresh finds", href: "#/fresh-finds" },

    { label: "Collections", href: "#/collections" },

    { label: "The artist", href: "#/artist" }

  ];



  return (

    <div className="sticky-shell">

      <div className="announcement">

        <Sparkles size={13} />

        <span>

          A little weird. A lot of art. Made with heart.

        </span>

        <Sparkles size={13} />

      </div>



      <header className="header">

        <div className="header-left">

          <button

            type="button"

            className="round-icon menu-icon"

            aria-label={menuOpen ? "Close menu" : "Open menu"}

            aria-expanded={menuOpen}

            onClick={() => {

              setMenuOpen(!menuOpen);

              setSearchOpen(false);

            }}

          >

            {menuOpen ? <X /> : <Menu />}

          </button>



          <button

            type="button"

            className="round-icon search-icon"

            aria-label="Search products"

            aria-expanded={searchOpen}

            onClick={() => {

              setSearchOpen(!searchOpen);

              setMenuOpen(false);

            }}

          >

            <Search />

          </button>

        </div>



        <a

          className="brand"

          href="#/home"

          onClick={closePanels}

          aria-label="NotSoMighty homepage"

        >

          <img src="/logo.png" alt="NotSoMighty" />

        </a>



        <div className="header-actions">

          <a

            className="round-icon profile-icon"

            href="#/profile"

            aria-label="Profile"

            onClick={closePanels}

          >

            <UserRound />

          </a>



          <a

            className="round-icon bag-icon"

            href="#/cart"

            aria-label="Shopping cart"

            onClick={closePanels}

          >

            <ShoppingBag />
            {cartCount > 0 && <span className="bag-count">{cartCount}</span>}

          </a>

        </div>

      </header>



      <nav className={`navigation ${menuOpen ? "open" : ""}`}>

        {navLinks.map((link) => (

          <a

            key={link.href}

            href={link.href}

            onClick={closePanels}

          >

            {link.label}

          </a>

        ))}

      </nav>



      {searchOpen && (

        <div className="search-panel">

          <div className="search-heading">

            <strong>Find your next favorite thing.</strong>



            <button

              type="button"

              aria-label="Close search"

              onClick={() => setSearchOpen(false)}

            >

              <X size={20} />

            </button>

          </div>



          <input

            type="search"

            placeholder="Search posters, calendars, artwork..."

            value={searchQuery}

            onChange={(event) =>

              setSearchQuery(event.target.value)

            }

            autoFocus

          />



          {searchQuery.trim() && (

            <div className="search-hits">

              {searchResults.length ? (

                searchResults.map((product) => (

                  <a

                    href={`#/product/${product.id}`}

                    key={product.id}

                    onClick={closePanels}

                  >

                    <span>

                      {product.name}

                      <small>{product.type}</small>

                    </span>



                    <ArrowUpRight size={17} />

                  </a>

                ))

              ) : (

                <p>No products found. Try another name.</p>

              )}

            </div>

          )}

        </div>

      )}

    </div>

  );

}



/* =========================================

   HERO

   ========================================= */



function Hero() {

  return (

    <section className="hero" id="home">

      <div className="hero-poster">

        <img

          src="/images/posters.png"

          alt="A collage of original illustrated posters"

        />

      </div>



      <div className="hero-copy">

        <span className="eyebrow">

          ✳ NOT YOUR USUAL ART SHOP ✳

        </span>



        <div className="hero-script">Posters</div>



        <h1>

          your favorite films,

          <br />

          now on your wall.

        </h1>



        <a

          className="pill-button coral"

          href="#/collections/posters"

        >

          explore now

          <ArrowUpRight size={19} />

        </a>



        <span className="hero-spark">✺</span>

      </div>

    </section>

  );

}



/* =========================================

   FEATURED PRODUCTS

   ========================================= */



function Featured({ title = "Fresh finds" }) {

  const featuredProducts = products.filter(

    (product) => product.featured

  );



  return (

    <section className="featured" id="fresh-finds">

      <div className="section-title">

        <div>

          <span className="eyebrow">

            HANDPICKED WITH LOVE

          </span>



          <h2 className="fresh-heading">

            <em>Fresh</em> finds.

          </h2>

        </div>



        <span className="title-sticker">✳</span>

      </div>



      <p className="section-intro">

        A few illustrated posters and calendars we love right now.

      </p>



      <div className="product-grid">

        {featuredProducts.map((product) => (

          <ProductCard

            key={product.id}

            product={product}

          />

        ))}

      </div>

    </section>

  );

}



/* =========================================

   INTRO

   ========================================= */



function Intro() {

  return (

    <section className="intro">

      <span className="eyebrow">

        WELCOME TO OUR LITTLE UNIVERSE

      </span>



      <h2>

        Small things.

        <br />

        <em>Big feelings.</em>

      </h2>



      <p>

        Original art, everyday objects and little moments

        of joy. Made for people who like their world a

        little more colorful.

      </p>



      <a

        className="pill-button find-your-thing"

        href="#/collections"

      >

        Find your thing

        <ArrowUpRight size={19} />

      </a>

    </section>

  );

}



/* =========================================

   CATEGORY CARDS

   ========================================= */



function CategoriesSection() {

  return (

    <section className="shop" id="collections">

      <div className="section-title">

        <div>

          <span className="eyebrow">

            PICK SOMETHING THAT FEELS LIKE YOU

          </span>



          <h2>

            The <em>good</em> stuff.

          </h2>

        </div>



        <span className="title-sticker smile">☺</span>

      </div>



      <div className="category-grid">

        {categories.map((category, index) => (

          <a

            key={category.id}

            href={`#/collections/${category.id}`}

            className={`category-card tone-${category.tone} bounce-in bouncy-category`}

            style={{ "--i": index }}

          >

            <div className="card-top">

              <strong>

                {String(index + 1).padStart(2, "0")}

              </strong>



              <small>EXPLORE</small>

            </div>



            <div className="card-symbol">

              {category.symbol}

            </div>



            <div className="card-bottom">

              <div>

                <strong>{category.name}</strong>

                <small>{category.subtitle}</small>

              </div>



              <span className="circle-arrow">

                <ArrowUpRight size={18} />

              </span>

            </div>

          </a>

        ))}

      </div>

    </section>

  );

}



/* =========================================

   ABOUT

   ========================================= */



function About() {

  return (

    <section className="about" id="artist">

      <div className="about-sticker">

        ART

        <br />

        FOR

        <br />

        EVERYONE

        <Heart size={48} />

      </div>



      <div className="about-copy">

        <span className="eyebrow">

          THE PERSON BEHIND THE ART

        </span>



        <h2>

          Oh hey,

          <br />

          I'm <span className="mrinal-name">Mrinal.</span>

        </h2>



        <p>

          NotSoMighty is an independent creative space

          by artist Mrinal Maity. A place where original

          artwork meets everyday life — one creation

          at a time.

        </p>



        <a

          className="pill-button cream"

          href="#/collections"

        >

          Explore the art

          <ArrowUpRight size={19} />

        </a>

      </div>

    </section>

  );

}



/* =========================================

   HOME PAGE

   ========================================= */



function HomePage() {

  return (

    <>

      <Hero />



      <div className="ticker">

        <span>NOT SO ORDINARY</span>

        <b>✳</b>

        <span>MADE WITH FEELING</span>

        <b>✳</b>

        <span>ART FOR EVERY DAY</span>

      </div>



      <Intro />

      <Featured />

      <CategoriesSection />

      <About />

    </>

  );

}



/* =========================================

   COLLECTION PAGE

   ========================================= */



function CollectionPage({ categoryId }) {

  const category = categories.find(

    (item) => item.id === categoryId

  );



  if (!category) {

    return <NotFound />;

  }



  const collectionProducts = products.filter(

    (product) => product.category === categoryId

  );



  const relatedCategories = categories

    .filter((item) => item.id !== categoryId)

    .slice(0, 3);



  return (

    <>

      <section

        className={`collection-hero tone-${category.tone}`}

      >

        <div className="collection-hero-copy">

          <a className="back-link" href="#/collections">

            <ArrowLeft size={17} />

            All collections

          </a>



          <span className="eyebrow">

            THE NOTSOMIGHTY COLLECTION

          </span>



          <h1>{category.name}</h1>



          <p>{category.subtitle}</p>



          <span className="coming-pill">

            {collectionProducts.length

              ? `${collectionProducts.length} ARTWORKS`

              : "COMING SOON"}

          </span>

        </div>



        <div className="collection-hero-art">

          {categoryId === "posters" ? (

            <img

              src="/images/posters.png"

              alt="Poster artwork collage"

            />

          ) : (

            <span className="collection-giant-symbol">

              {category.symbol}

            </span>

          )}

        </div>

      </section>



      <section className="listing-section">

        <div className="section-title">

          <div>

            <span className="eyebrow">

              PICK SOMETHING THAT FEELS LIKE YOU

            </span>



            <h2>

              Take a <em>look.</em>

            </h2>

          </div>

        </div>



        {collectionProducts.length ? (

          <div className="product-grid">

            {collectionProducts.map((product) => (

              <ProductCard

                key={product.id}

                product={product}

              />

            ))}

          </div>

        ) : (

          <div className="empty-collection">

            <span>{category.symbol}</span>

            <h3>Something lovely is on its way.</h3>

            <p>

              We're getting this collection ready.

              Come back soon!

            </p>



            <a

              href="#/collections"

              className="pill-button coral"

            >

              Explore other collections

              <ArrowUpRight size={18} />

            </a>

          </div>

        )}

      </section>



      <section className="related">

        <span className="eyebrow">

          THERE'S MORE TO EXPLORE

        </span>



        <h2>Keep looking around.</h2>



        <div className="related-links">

          {relatedCategories.map((item) => (

            <a

              key={item.id}

              className={`related-card tone-${item.tone}`}

              href={`#/collections/${item.id}`}

            >

              <strong>{item.name}</strong>

              <span>{item.symbol}</span>

              <ArrowUpRight size={20} />

            </a>

          ))}

        </div>

      </section>

    </>

  );

}



/* =========================================

   PRODUCT DETAIL PAGE

   ========================================= */



function ProductPage({ productId, onAddToCart }) {

  const product = products.find(

    (item) => item.id === productId

  );



  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);



  useEffect(() => {

    setActiveImage(0);
    setQuantity(1);

  }, [productId]);



  if (!product) {

    return <NotFound />;

  }



  return (

    <>

      <section className="product-detail">

        <div>

          <div className="product-detail-main">

            <ArtworkImage

              src={product.images[activeImage]}

              alt={`${product.name} artwork`}

            />

          </div>



          {product.images.length > 1 && (

            <div className="thumbnails">

              {product.images.map((image, index) => (

                <button

                  key={image}

                  type="button"

                  className={

                    activeImage === index ? "selected" : ""

                  }

                  onClick={() => setActiveImage(index)}

                  aria-label={`View image ${index + 1}`}

                >

                  <ArtworkImage

                    src={image}

                    alt={`${product.name} view ${index + 1}`}

                  />

                </button>

              ))}

            </div>

          )}

        </div>



        <div className="product-detail-copy">

          <a

            className="back-link"

            href={`#/collections/${product.category}`}

          >

            <ArrowLeft size={18} />

            Back to {product.category}

          </a>



          <span className="eyebrow">

            ORIGINAL NOTSOMIGHTY ARTWORK

          </span>



          <h1>{product.name}</h1>



          <span className="coming-pill">

            COMING SOON

          </span>



          <p>{product.description}</p>



          <p>Explore the artwork and save it to your bag for later.</p>



          <div className="prelaunch-variant"><label>Size / variant</label><div className="unavailable-option" aria-disabled="true">Options to be announced</div></div>
          <div className="prelaunch-variant"><label>Quantity</label><div className="quantity-control"><button type="button" disabled={quantity <= 1} aria-label="Decrease quantity" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button><output>{quantity}</output><button type="button" disabled={quantity >= 99} aria-label="Increase quantity" onClick={() => setQuantity(q => Math.min(99, q + 1))}>+</button></div></div>
          <button type="button" className="pill-button coral" onClick={() => onAddToCart(product.id, quantity)}><ShoppingBag size={19} /> Add {quantity} to bag</button>
          <p className="prelaunch-note">Price and sizes to be announced. Ordering is not open yet.</p>


        </div>

      </section>



      <section className="related">

        <span className="eyebrow">

          MORE THINGS TO LOVE

        </span>



        <h2>Keep exploring.</h2>



        <div className="product-grid">

          {products

            .filter(

              (item) =>

                item.id !== product.id &&

                item.category === product.category

            )

            .slice(0, 4)

            .map((item) => (

              <ProductCard

                key={item.id}

                product={item}

              />

            ))}

        </div>

      </section>

    </>

  );

}



/* =========================================

   PLACEHOLDER PAGES

   ========================================= */



function PlaceholderPage({ title, description }) {

  return (

    <section className="not-found">

      <span className="eyebrow">

        NOTSOMIGHTY

      </span>



      <h1>{title}</h1>



      <p>{description}</p>



      <a

        className="pill-button coral"

        href="#/collections"

      >

        Explore collections

        <ArrowUpRight size={19} />

      </a>

    </section>

  );

}



function NotFound() {

  return (

    <PlaceholderPage

      title="Oops! Wrong turn."

      description="This page doesn't exist yet. Let's find something lovely instead."

    />

  );

}



/* =========================================

   FOOTER

   ========================================= */



function Footer() {

  return (

    <footer className="footer">

      <div className="footer-main">

        <div>

          <a href="#/home">

            <img

              className="footer-logo"

              src="/logo.png"

              alt="NotSoMighty"

            />

          </a>



          <p>A little weird. A lot of art. Made with heart.</p>

        </div>



        <div className="footer-links">

          <a href="#/home">Home</a>

          <a href="#/fresh-finds">Fresh finds</a>

          <a href="#/collections">Collections</a>

          <a href="#/artist">The artist</a>

        </div>

      </div>



      <div className="footer-bottom">

        © 2026 Mrinal Maity. All rights reserved.

      </div>

    </footer>

  );

}



/* =========================================

   MAIN APP

   ========================================= */




/* PRE-LAUNCH BAG: No prices, inventory, variants, or payment processing. */
const CART_STORAGE_KEY = "notsomighty-prelaunch-bag-v1";

function loadCart() {
  try {
    const value = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || "[]");
    if (!Array.isArray(value)) return [];
    return value.filter((entry) =>
      entry && typeof entry.id === "string" &&
      products.some((product) => product.id === entry.id) &&
      Number.isInteger(entry.quantity) && entry.quantity >= 1 && entry.quantity <= 99
    );
  } catch {
    return [];
  }
}

function CartPage({ cart, onQuantityChange, onRemove }) {
  const count = cart.reduce((total, entry) => total + entry.quantity, 0);
  return (
    <section className="cart-page">
      <span className="eyebrow">YOUR LITTLE COLLECTION</span>
      <h1>Your bag <span>✳</span></h1>
      <p className="cart-intro">Save the artwork you love. Prices, sizes, and ordering will be announced when the shop launches.</p>
      {cart.length === 0 ? (
        <div className="cart-empty">
          <ShoppingBag size={42} />
          <h2>Nothing in your bag yet.</h2>
          <p>Find something that feels like you.</p>
          <a className="pill-button coral" href="#/collections">Explore collections <ArrowUpRight size={18} /></a>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((entry) => {
              const product = products.find((item) => item.id === entry.id);
              if (!product) return null;
              return (
                <article className="cart-item" key={entry.id}>
                  <a className="cart-art" href={`#/product/${product.id}`}>
                    <ArtworkImage src={product.images[0]} alt={product.name} />
                  </a>
                  <div className="cart-item-details">
                    <a href={`#/product/${product.id}`}><h2>{product.name}</h2></a>
                    <p>{product.type}</p>
                    <strong>Price to be announced</strong>
                    <div className="cart-item-actions">
                      <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
                        <button type="button" aria-label={`Decrease ${product.name} quantity`} disabled={entry.quantity <= 1} onClick={() => onQuantityChange(entry.id, entry.quantity - 1)}>−</button>
                        <output>{entry.quantity}</output>
                        <button type="button" aria-label={`Increase ${product.name} quantity`} disabled={entry.quantity >= 99} onClick={() => onQuantityChange(entry.id, entry.quantity + 1)}>+</button>
                      </div>
                      <button className="cart-remove" type="button" onClick={() => onRemove(entry.id)}>Remove</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <aside className="cart-summary">
            <span className="eyebrow">BAG SUMMARY</span>
            <h2>{count} {count === 1 ? "item" : "items"} saved</h2>
            <p>Prices, product options, shipping, and availability are not yet confirmed.</p>
            <div className="cart-summary-total"><span>Total</span><strong>Not available yet</strong></div>
            <a href="#/checkout" className="pill-button cart-checkout">Preview checkout <ArrowRight size={18}/></a>
            <small>No payment or order has been placed.</small>
            <a href="#/collections" className="cart-continue">Continue exploring <ArrowRight size={17} /></a>
          </aside>
        </div>
      )}
    </section>
  );
}


/* PRE-LAUNCH UI: No network calls, orders, payments, or customer accounts. */
const EMPTY_CHECKOUT = { name: "", email: "", phone: "", address1: "", address2: "", city: "", state: "", postalCode: "", country: "India", delivery: "unavailable" };

function CheckoutPage({ cart }) {
  const [form, setForm] = useState(EMPTY_CHECKOUT);
  const [touched, setTouched] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const update = (field, value) => { setForm(current => ({ ...current, [field]: value })); setShowPreview(false); };
  const required = ["name", "email", "phone", "address1", "city", "state", "postalCode", "country"];
  const invalid = required.filter(key => !form[key].trim());
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) invalid.push("email format");
  if (form.phone && !/^[+\d\s()-]{7,20}$/.test(form.phone)) invalid.push("phone format");
  const fields = [
    ["name", "Full name", "text"], ["email", "Email", "email"], ["phone", "Phone number", "tel"],
    ["address1", "Street address", "text"], ["address2", "Apartment / landmark (optional)", "text"],
    ["city", "City", "text"], ["state", "State / region", "text"],
    ["postalCode", "Postal / PIN code", "text"], ["country", "Country", "text"]
  ];
  return <section className="checkout-page">
    <a className="back-link" href="#/cart"><ArrowLeft size={18}/> Back to bag</a>
    
    <h1>Checkout <em>preview.</em></h1>
   
    {cart.length === 0 ? <div className="cart-empty"><h2>Your bag is empty.</h2><a className="pill-button coral" href="#/collections">Explore artwork</a></div> : <div className="checkout-grid">
      <form noValidate onSubmit={event => { event.preventDefault(); setTouched(true); setShowPreview(invalid.length === 0); }} className="checkout-form">
        <h2>Contact & shipping</h2>
        <div className="checkout-fields">{fields.map(([key,label,type]) => <label key={key} className="checkout-field">{label}
          <input type={type} autoComplete="off" value={form[key]} onChange={event => update(key,event.target.value)} aria-invalid={touched && (invalid.includes(key) || invalid.includes(key+" format"))} placeholder={label} />
        </label>)}</div>
        <h2>Delivery method</h2>
        <div className="unavailable-option">Delivery options and shipping rates will be confirmed at launch.</div>
        {touched && invalid.length > 0 && <p className="form-error" role="alert">Please check the required contact and address fields. Email and phone must be valid.</p>}
        <button className="pill-button coral" type="submit">Preview entered details <ArrowRight size={18}/></button>
        {showPreview && <div className="demo-confirmation" role="status"><strong>Form preview complete.</strong><p>Your contact and shipping fields passed basic checks. This is not an order confirmation; no data was submitted.</p></div>}
      </form>
      <aside className="cart-summary"><span className="eyebrow">BAG SUMMARY</span><h2>{cart.reduce((n,item)=>n+item.quantity,0)} items</h2>
        {cart.map(item => { const product=products.find(p=>p.id===item.id); return product ? <p key={item.id}>{product.name} × {item.quantity}</p> : null; })}
        <div className="cart-summary-total"><span>Total</span><strong>Not available yet</strong></div>
        
        <button className="pill-button cart-checkout" type="button" disabled>Place order </button>
      </aside>
    </div>}
  </section>;
}

const PAYMENT_SCREENS = {
  "payment/pending": ["Payment pending", "A payment would be processing here after gateway integration."],
  "payment/success": ["Payment successful", "A verified payment result would appear here after backend integration."],
  "payment/failure": ["Payment failed", "Payment error details and retry options will appear here after integration."],
  "payment/cancelled": ["Payment cancelled", "A customer-initiated cancellation would be shown here after integration."],
  "order/confirmation": ["Order confirmation", "A real order number and receipt will appear here after a verified order is created."]
};
function DemoStatusPage({ route }) {
  const [title, description] = PAYMENT_SCREENS[route];
  return <section className="not-found demo-status"><span className="eyebrow">DESIGN PREVIEW · NOT A REAL TRANSACTION</span><h1>{title}</h1><p>{description}</p><p>No payment has been made and no order has been placed.</p><a href="#/collections" className="pill-button coral">Explore collections <ArrowUpRight size={18}/></a></section>;
}
function OrderLookupPage() {
  const [reference, setReference] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return <section className="not-found demo-status"><span className="eyebrow">COMING SOON · PREVIEW</span><h1>Find your order.</h1><p>Order tracking will be available after orders are connected to the backend.</p>
    <form onSubmit={event=>{event.preventDefault();setSubmitted(true);}} className="lookup-form"><label htmlFor="order-ref">Order reference</label><input id="order-ref" value={reference} onChange={event=>{setReference(event.target.value);setSubmitted(false);}} placeholder="Enter your order reference" required /><button className="pill-button coral" type="submit">Preview lookup</button></form>
    {submitted && <p role="status">Order lookup is not connected yet. No records were searched.</p>}
  </section>;
}

export default function App() {

  const [route, setRoute] = useState(getRoute);
  const [cart, setCart] = useState(loadCart);
  const [cartNotice, setCartNotice] = useState("");
  const cartCount = cart.reduce((total, entry) => total + entry.quantity, 0);

  useEffect(() => {
    try { window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)); } catch { /* Storage may be disabled. */ }
  }, [cart]);

  function addToCart(id, quantity = 1) {
    const safeQuantity = Math.max(1, Math.min(99, Number(quantity) || 1));
    if (!products.some((product) => product.id === id)) return;
    setCart((current) => {
      const existing = current.find((entry) => entry.id === id);
      return existing
        ? current.map((entry) => entry.id === id ? { ...entry, quantity: Math.min(99, entry.quantity + safeQuantity) } : entry)
        : [...current, { id, quantity: safeQuantity }];
    });
    setCartNotice("Artwork added to your bag!");
  }

  function changeQuantity(id, quantity) {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return;
    setCart((current) => current.map((entry) => entry.id === id ? { ...entry, quantity } : entry));
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((entry) => entry.id !== id));
  }



  useEffect(() => {

    const handleHashChange = () => {

      setRoute(getRoute());

      window.scrollTo(0, 0);

    };



    window.addEventListener("hashchange", handleHashChange);



    return () =>

      window.removeEventListener(

        "hashchange",

        handleHashChange

      );

  }, []);



  let page;



  if (route === "home" || route === "") {

    page = <HomePage />;

  } else if (route === "collections") {

    page = <CategoriesSection />;

  } else if (route.startsWith("collections/")) {

    const categoryId = route.split("/")[1];

    page = <CollectionPage categoryId={categoryId} />;

  } else if (route.startsWith("product/")) {

    const productId = route.split("/")[1];

    page = <ProductPage productId={productId} onAddToCart={addToCart} />;

  } else if (route === "fresh-finds") {

    page = <Featured />;

  } else if (route === "artist" || route === "vibe") {

    page = <About />;

  } else if (route === "profile") {

    page = (

      <PlaceholderPage

        title="Your little corner."

        description="Customer accounts are coming soon."

      />

    );

  } else if (route === "checkout") {
    page = <CheckoutPage cart={cart} />;
  } else if (PAYMENT_SCREENS[route]) {
    page = <DemoStatusPage route={route} />;
  } else if (route === "order/lookup") {
    page = <OrderLookupPage />;
  } else if (route === "cart") {

    page = <CartPage cart={cart} onQuantityChange={changeQuantity} onRemove={removeFromCart} />;

  } else {

    page = <NotFound />;

  }



  return (

    <div className="site">

      <Header cartCount={cartCount} />
      {cartNotice && <div className="cart-notice" role="status">{cartNotice} <a href="#/cart" onClick={() => setCartNotice("")}>View bag</a><button type="button" aria-label="Dismiss notification" onClick={() => setCartNotice("")}>×</button></div>}

      <main>{page}</main>

      <Footer />

    </div>

  );

}
