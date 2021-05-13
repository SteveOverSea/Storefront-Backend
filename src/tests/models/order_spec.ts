import { Orders } from "../../models/order";

const orderStore = new Orders();

describe("Order Model", () => {
    it('should have an index method', () => {
        expect(orderStore.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(orderStore.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(orderStore.create).toBeDefined();
      });
    
      it('should have a update method', () => {
        expect(orderStore.update).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(orderStore.delete).toBeDefined();
      });
});