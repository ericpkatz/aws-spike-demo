import { mapper } from './utils';
import { expect } from 'chai';
describe('Client', ()=> {
  describe('Mapping Code', ()=> {
    it('maps', ()=> {
      const map = mapper([{ id: 1, name: 'foo'}, { id: 2, name: 'bar'}]);
      expect(map).to.eql({
        1: { id: 1, name: 'foo'},
        2: { id: 2, name: 'bar'},
      });
    });
  });
});
