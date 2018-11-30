import { CreatinineCalculatorSingleton } from './creatinine-calculator';

describe('ImcTestSuite', () => {

  beforeAll(() => {
    CreatinineCalculatorSingleton.formData = {
      birthYear: 1998,
      age: 20,
      weight: 55,
      height: 160,
      creatinimie: 12,
      creatinimieType: 'µmol/L',
      sex: 'F',
      originAfro: false,
    }
  });

  it('testCockroftGault01', () => {
    const result = CreatinineCalculatorSingleton.computeCockroftGault();
    expect(result).toBeCloseTo(572, 2);
  })

  it('testCockroftGault02', () => {
    CreatinineCalculatorSingleton.formData.creatinimieType = 'mg/L',
      CreatinineCalculatorSingleton.formData.sex = 'H'

    const result = CreatinineCalculatorSingleton.computeCockroftGault();

    expect(result).toEqual('76.53');

  })

  it('testMdrd01', () => {
    CreatinineCalculatorSingleton.formData = {
      birthYear: 1998,
      age: 20,
      weight: 60,
      height: 155,
      creatinimie: 12,
      creatinimieType: 'µmol/L',
      sex: 'F',
      originAfro: true,
    }

    const result = CreatinineCalculatorSingleton.computeMdrd();
    expect(result).toEqual('913.45');

  })

  it('testMdrd02', () => {
    // CreatinineCalculatorSingleton.formData = {
    //   birthYear: 1998,
    //   age: 20,
    //   weight: 55,
    //   height: 160,
    //   creatinimie: 18,
    //   creatinimieType: 'mg/L',
    //   sex: 'H',
    //   originAfro: false,
    // }
    CreatinineCalculatorSingleton.formData = {
      age: 20,
      birthYear: 1998,
      creatinimie: 12,
      creatinimieType: 'mg/L',
      height: 194,
      originAfro: true,
      sex: 'F',
      weight: 65
    }

    const result = CreatinineCalculatorSingleton.computeMdrd();
    expect(result).toEqual('73.78');
  })

})
