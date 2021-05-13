import { Users } from "../../models/user";

const userStore = new Users();

describe("User Model", () => {
    it('should have an index method', () => {
        expect(userStore.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(userStore.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(userStore.create).toBeDefined();
      });
    
      it('should have a update method', () => {
        expect(userStore.update).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(userStore.delete).toBeDefined();
      });

      it('should have a authenticate method', () => {
        expect(userStore.authenticate).toBeDefined();
      });
});