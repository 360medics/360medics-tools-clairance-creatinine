import { ImcCalculatorSingleton } from './imc-calculator';
// import { async, TestBed } from '@angular/core/testing';

describe('ImcTestSuite', () => {

    it('testImc01', () => {
        const data = {
          birthYear: 1998,
          age: 20,
          weight: 55,
          height: 160,
          creatinimie: 12,
          creatinimieType: 'µmol/L',
          sex: 'F',
          originAfro: false,
        }

        const result = ImcCalculatorSingleton.compute(data);

        expect(result.imc).toEqual('21.48');
        expect(result.sliderLabel).toEqual('L3');
        expect(result.sliderPercentage).toEqual(28.9);

    })

})
