import products from '../data/products.json' with { type: 'json' };
import categories from '../data/categories.json' with { type: 'json' };

// Repository boundary: replace these methods with OCI MySQL queries later.
// Do not add prices or purchasable variants until approved by the artist.
export const catalogRepository = {
  async listProducts({ category, featured, query } = {}) {
    return products.filter((product) =>
      (!category || product.category === category) &&
      (featured === undefined || product.featured === featured) &&
      (!query || `${product.name} ${product.category} ${product.type}`.toLowerCase().includes(query.toLowerCase()))
    );
  },
  async findProductById(id) {
    return products.find((product) => product.id === id) ?? null;
  },
  async listCategories() {
    return categories;
  },
  async findCategoryById(id) {
    return categories.find((category) => category.id === id) ?? null;
  }
};
