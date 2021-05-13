import { Order_Lists } from "../../models/order_list";

const order_listStore = new Order_Lists();

describe("Order_List Model", () => {
    it('should have an index method', () => {
        expect(order_listStore.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(order_listStore.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(order_listStore.create).toBeDefined();
      });
    
      it('should have a update method', () => {
        expect(order_listStore.update).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(order_listStore.delete).toBeDefined();
      });
});