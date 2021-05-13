import { Products } from "../../models/product";

const productStore = new Products();

describe("Product Model", () => {
    it('should have an index method', () => {
        expect(productStore.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(productStore.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(productStore.create).toBeDefined();
      });
    
      it('should have a update method', () => {
        expect(productStore.update).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(productStore.delete).toBeDefined();
      });
});