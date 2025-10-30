import {
  BASE_URL,
  BASE_URL_CATEGORIES,
  LIMIT,
  INFOS_PRODUCT,
  INFOS_PRODUCT_ITEM,
  initialCategory,
  sortOptions,
} from '../src/constants';

describe('Constants', () => {
  describe('URL Constants', () => {
    it('should have correct BASE_URL', () => {
      expect(BASE_URL).toBe('https://dummyjson.com/products');
    });

    it('should have correct BASE_URL_CATEGORIES derived from BASE_URL', () => {
      expect(BASE_URL_CATEGORIES).toBe(`${BASE_URL}/categories`);
      expect(BASE_URL_CATEGORIES).toBe('https://dummyjson.com/products/categories');
    });
  });

  describe('Pagination Constants', () => {
    it('should have LIMIT set to 10', () => {
      expect(LIMIT).toBe(10);
    });
  });

  describe('API Select Fields', () => {
    it('should have correct INFOS_PRODUCT fields', () => {
      expect(INFOS_PRODUCT).toBe('title,price,rating,thumbnail');
      expect(INFOS_PRODUCT).toContain('title');
      expect(INFOS_PRODUCT).toContain('price');
      expect(INFOS_PRODUCT).toContain('rating');
      expect(INFOS_PRODUCT).toContain('thumbnail');
    });

    it('should have correct INFOS_PRODUCT_ITEM fields', () => {
      expect(INFOS_PRODUCT_ITEM).toBe('title,price,rating,thumbnail,description,brand,stock');
      expect(INFOS_PRODUCT_ITEM).toContain('title');
      expect(INFOS_PRODUCT_ITEM).toContain('description');
      expect(INFOS_PRODUCT_ITEM).toContain('brand');
      expect(INFOS_PRODUCT_ITEM).toContain('stock');
    });

    it('INFOS_PRODUCT_ITEM should be a superset of INFOS_PRODUCT', () => {
      const baseFields = INFOS_PRODUCT.split(',');
      const itemFields = INFOS_PRODUCT_ITEM.split(',');
      
      baseFields.forEach(field => {
        expect(itemFields).toContain(field);
      });
    });
  });

  describe('Initial Category', () => {
    it('should have correct initial category structure', () => {
      expect(initialCategory).toHaveProperty('label');
      expect(initialCategory).toHaveProperty('value');
    });

    it('should have "All" as label', () => {
      expect(initialCategory.label).toBe('All');
    });

    it('should have BASE_URL as value', () => {
      expect(initialCategory.value).toBe(BASE_URL);
    });
  });

  describe('Sort Options', () => {
    it('should have 4 sort options', () => {
      expect(sortOptions).toHaveLength(4);
    });

    it('should have price ascending sort option', () => {
      const priceAsc = sortOptions.find(
        opt => opt.value === 'price' && opt.order === 'asc'
      );
      expect(priceAsc).toBeDefined();
      expect(priceAsc?.name).toBe('Price');
      expect(priceAsc?.icon).toBe('arrow-up-short-wide');
      expect(priceAsc?.active).toBe(false);
    });

    it('should have price descending sort option', () => {
      const priceDesc = sortOptions.find(
        opt => opt.value === 'price' && opt.order === 'desc'
      );
      expect(priceDesc).toBeDefined();
      expect(priceDesc?.name).toBe('Price');
      expect(priceDesc?.icon).toBe('arrow-down-wide-short');
      expect(priceDesc?.active).toBe(false);
    });

    it('should have rating ascending sort option', () => {
      const ratingAsc = sortOptions.find(
        opt => opt.value === 'rating' && opt.order === 'asc'
      );
      expect(ratingAsc).toBeDefined();
      expect(ratingAsc?.name).toBe('Rating');
      expect(ratingAsc?.icon).toBe('arrow-up-short-wide');
      expect(ratingAsc?.active).toBe(false);
    });

    it('should have rating descending sort option', () => {
      const ratingDesc = sortOptions.find(
        opt => opt.value === 'rating' && opt.order === 'desc'
      );
      expect(ratingDesc).toBeDefined();
      expect(ratingDesc?.name).toBe('Rating');
      expect(ratingDesc?.icon).toBe('arrow-down-wide-short');
      expect(ratingDesc?.active).toBe(false);
    });

    it('all sort options should have required properties', () => {
      sortOptions.forEach(option => {
        expect(option).toHaveProperty('name');
        expect(option).toHaveProperty('icon');
        expect(option).toHaveProperty('order');
        expect(option).toHaveProperty('active');
        expect(option).toHaveProperty('value');
        expect(typeof option.name).toBe('string');
        expect(typeof option.icon).toBe('string');
        expect(['asc', 'desc']).toContain(option.order);
        expect(typeof option.active).toBe('boolean');
        expect(['price', 'rating']).toContain(option.value);
      });
    });

    it('all sort options should be inactive by default', () => {
      sortOptions.forEach(option => {
        expect(option.active).toBe(false);
      });
    });

    it('should have ascending and descending variants for each sort type', () => {
      const priceOptions = sortOptions.filter(opt => opt.value === 'price');
      const ratingOptions = sortOptions.filter(opt => opt.value === 'rating');
      
      expect(priceOptions).toHaveLength(2);
      expect(ratingOptions).toHaveLength(2);
      
      expect(priceOptions.some(opt => opt.order === 'asc')).toBe(true);
      expect(priceOptions.some(opt => opt.order === 'desc')).toBe(true);
      expect(ratingOptions.some(opt => opt.order === 'asc')).toBe(true);
      expect(ratingOptions.some(opt => opt.order === 'desc')).toBe(true);
    });
  });
});
