import { Producto } from './producto';

describe('Producto', () => {
  it('should create an instance', () => {
    expect(new Producto( "a", 1, false)).toBeTruthy();
  });
});
