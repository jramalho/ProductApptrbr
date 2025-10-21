import { RootStackParamList } from '../src/types/navigation';

describe('Navigation Types', () => {
  it('should have correct type structure for RootStackParamList', () => {
    // Type-only test - if this compiles, the types are correct
    const validParams: RootStackParamList = {
      HomePage: undefined,
      ProductPage: { itemId: 1 },
    };

    expect(validParams).toBeDefined();
  });

  it('should enforce required parameters for ProductPage', () => {
    // This is a compile-time check
    type ProductPageParams = RootStackParamList['ProductPage'];
    
    // Verify that ProductPage requires itemId
    const validProductPageParams: ProductPageParams = { itemId: 123 };
    expect(validProductPageParams.itemId).toBe(123);
  });

  it('should allow undefined for HomePage', () => {
    type HomePageParams = RootStackParamList['HomePage'];
    
    // HomePage should accept undefined
    const validHomePageParams: HomePageParams = undefined;
    expect(validHomePageParams).toBeUndefined();
  });
});
