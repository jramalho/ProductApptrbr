import type { IProductItem, ICategories, ISelectInput } from '../src/types';

describe('Type Interfaces', () => {
  describe('IProductItem', () => {
    it('should accept valid product item with all required properties', () => {
      const validProduct: IProductItem = {
        id: 1,
        title: 'Test Product',
        price: 99.99,
        rating: 4.5,
        thumbnail: 'https://example.com/image.jpg',
      };

      expect(validProduct.id).toBe(1);
      expect(validProduct.title).toBe('Test Product');
      expect(validProduct.price).toBe(99.99);
      expect(validProduct.rating).toBe(4.5);
      expect(validProduct.thumbnail).toBe('https://example.com/image.jpg');
    });

    it('should accept product item with optional properties', () => {
      const productWithOptional: IProductItem = {
        id: 2,
        title: 'Complete Product',
        price: 199.99,
        rating: 5.0,
        thumbnail: 'https://example.com/image2.jpg',
        description: 'This is a detailed description',
        brand: 'TestBrand',
        stock: '50',
      };

      expect(productWithOptional.description).toBe('This is a detailed description');
      expect(productWithOptional.brand).toBe('TestBrand');
      expect(productWithOptional.stock).toBe('50');
    });

    it('should accept product item without optional properties', () => {
      const productWithoutOptional: IProductItem = {
        id: 3,
        title: 'Minimal Product',
        price: 49.99,
        rating: 3.8,
        thumbnail: 'https://example.com/image3.jpg',
      };

      expect(productWithoutOptional.description).toBeUndefined();
      expect(productWithoutOptional.brand).toBeUndefined();
      expect(productWithoutOptional.stock).toBeUndefined();
    });

    it('should have correct property types', () => {
      const product: IProductItem = {
        id: 4,
        title: 'Type Test Product',
        price: 79.99,
        rating: 4.2,
        thumbnail: 'https://example.com/image4.jpg',
        description: 'Description',
        brand: 'Brand',
        stock: '100',
      };

      expect(typeof product.id).toBe('number');
      expect(typeof product.title).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(typeof product.rating).toBe('number');
      expect(typeof product.thumbnail).toBe('string');
      expect(typeof product.description).toBe('string');
      expect(typeof product.brand).toBe('string');
      expect(typeof product.stock).toBe('string');
    });
  });

  describe('ICategories', () => {
    it('should accept valid category with all properties', () => {
      const validCategory: ICategories = {
        slug: 'smartphones',
        name: 'Smartphones',
        url: 'https://dummyjson.com/products/category/smartphones',
      };

      expect(validCategory.slug).toBe('smartphones');
      expect(validCategory.name).toBe('Smartphones');
      expect(validCategory.url).toBe('https://dummyjson.com/products/category/smartphones');
    });

    it('should have correct property types', () => {
      const category: ICategories = {
        slug: 'laptops',
        name: 'Laptops',
        url: 'https://dummyjson.com/products/category/laptops',
      };

      expect(typeof category.slug).toBe('string');
      expect(typeof category.name).toBe('string');
      expect(typeof category.url).toBe('string');
    });

    it('should accept different category values', () => {
      const categories: ICategories[] = [
        {
          slug: 'beauty',
          name: 'Beauty',
          url: 'https://dummyjson.com/products/category/beauty',
        },
        {
          slug: 'furniture',
          name: 'Furniture',
          url: 'https://dummyjson.com/products/category/furniture',
        },
      ];

      expect(categories).toHaveLength(2);
      expect(categories[0].slug).toBe('beauty');
      expect(categories[1].slug).toBe('furniture');
    });
  });

  describe('ISelectInput', () => {
    it('should accept valid select input with all properties', () => {
      const validSelectInput: ISelectInput = {
        label: 'All Products',
        value: 'https://dummyjson.com/products',
      };

      expect(validSelectInput.label).toBe('All Products');
      expect(validSelectInput.value).toBe('https://dummyjson.com/products');
    });

    it('should have correct property types', () => {
      const selectInput: ISelectInput = {
        label: 'Smartphones',
        value: 'smartphones',
      };

      expect(typeof selectInput.label).toBe('string');
      expect(typeof selectInput.value).toBe('string');
    });

    it('should accept different select input values', () => {
      const selectInputs: ISelectInput[] = [
        { label: 'Option 1', value: 'value1' },
        { label: 'Option 2', value: 'value2' },
        { label: 'Option 3', value: 'value3' },
      ];

      expect(selectInputs).toHaveLength(3);
      selectInputs.forEach((input, index) => {
        expect(input.label).toBe(`Option ${index + 1}`);
        expect(input.value).toBe(`value${index + 1}`);
      });
    });

    it('should work with empty strings', () => {
      const emptySelectInput: ISelectInput = {
        label: '',
        value: '',
      };

      expect(emptySelectInput.label).toBe('');
      expect(emptySelectInput.value).toBe('');
    });
  });

  describe('Type Usage Integration', () => {
    it('should work together in realistic scenario', () => {
      // Product data
      const product: IProductItem = {
        id: 1,
        title: 'iPhone 12',
        price: 999,
        rating: 4.8,
        thumbnail: 'https://example.com/iphone.jpg',
        brand: 'Apple',
      };

      // Category data
      const category: ICategories = {
        slug: 'smartphones',
        name: 'Smartphones',
        url: 'https://dummyjson.com/products/category/smartphones',
      };

      // Select input derived from category
      const selectInput: ISelectInput = {
        label: category.name,
        value: category.url,
      };

      expect(selectInput.label).toBe(category.name);
      expect(selectInput.value).toBe(category.url);
      expect(product.brand).toBeDefined();
    });

    it('should handle array of products', () => {
      const products: IProductItem[] = [
        {
          id: 1,
          title: 'Product 1',
          price: 10,
          rating: 4.0,
          thumbnail: 'url1',
        },
        {
          id: 2,
          title: 'Product 2',
          price: 20,
          rating: 4.5,
          thumbnail: 'url2',
        },
      ];

      expect(products).toHaveLength(2);
      expect(products.every(p => typeof p.id === 'number')).toBe(true);
    });

    it('should handle array of categories', () => {
      const categories: ICategories[] = [
        { slug: 'cat1', name: 'Category 1', url: 'url1' },
        { slug: 'cat2', name: 'Category 2', url: 'url2' },
      ];

      expect(categories).toHaveLength(2);
      expect(categories.every(c => typeof c.slug === 'string')).toBe(true);
    });

    it('should handle array of select inputs', () => {
      const selectInputs: ISelectInput[] = [
        { label: 'Label 1', value: 'value1' },
        { label: 'Label 2', value: 'value2' },
      ];

      expect(selectInputs).toHaveLength(2);
      expect(selectInputs.every(s => typeof s.label === 'string')).toBe(true);
    });
  });
});
