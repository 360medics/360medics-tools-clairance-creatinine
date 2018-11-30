import { round2 }                         from './round2';
import { ImcDataType }          from './imc-calculator';
import { Model }                          from './model';

export type CreatinineResultDataType = {
  cockroftGault: any;
  mdrd: any;
}

export class CreatinineCalculator {

  private MDRD = 'MDRD';
  private COCKROFTGAULT = 'COCKROFTGAULT';

  error: string;
  currentYear: number;
  cockroftGault: any;

  private _formData: Model.ImcDataType;

  constructor(formData: Model.ImcDataType = null) {
    this.formData = formData;
  }

  compute(): Model.CreatinineResultDataType {

      return {
        cockroftGault: this.computeCockroftGault(),
        mdrd: this.computeMdrd()
      }
  }

  computeCockroftGault() {
    const k = (this.formData.sex === 'H') ? 1.23 : 1.04;

    // quick check if age is empty, if so : it must be computed
    // from birthyear. Otherwise we only need the age so go on
    this.setAge();

    // base creatinimie value must be in umol/L (it normalizes mg/L formData(s))
    const creat = this.toUmolCockroftGault();

    return this.cockroftGault = round2((((140 - this.formData.age) / creat) * this.formData.weight * k));
  }

  computeMdrd() {
    // two different multipliers must be applied to the base result
    // depending on sex (male, female) or afro origin.
    // If not, assign a neutral multiplier to m1 and m2 (ie. 1)
    const m1 = (this.formData.sex === 'F') ? 0.742 : 1;
    const m2 = (this.formData.originAfro === true) ? 1.212 : 1;

    // base creatinimie value must be in umol/L (id normalize mg/L formData(s))
    const creat = this.toUmolMdrd();

    let mdrd = 186 * Math.pow((creat * 0.0113), -1.154) * Math.pow(this.formData.age, -0.203) * m1 * m2;


    if (this.formData.creatinimieType === 'mg/L') {
      mdrd = mdrd * Math.pow(88.5, -1.154);
    }

    return round2(mdrd);
  }

  getCurrentYear() {
    for (let prop in this.formData) {
      this.formData[prop] = null;
    }

    return (new Date()).getFullYear();
  }

  setAge() {
    if ((this.formData.birthYear === null) && (this.formData.age === null)) {
      return console.error('Year must be...');

    } else if (this.formData.birthYear === null) {
      this.formData.birthYear = this.getCurrentYear() - this.formData.age;

    } else if (this.formData.age === null) {
      this.formData.age = this.getCurrentYear() - this.formData.birthYear;
    }
  }

  toUmolCockroftGault() {
    // converts mg/L to umol/L
    return (this.formData.creatinimieType !== 'mg/L') ? this.formData.creatinimie : (this.formData.creatinimie / 10) * 88.4;
  }

  toUmolMdrd() {
    // converts mg/L to umol/L
    return (this.formData.creatinimieType === 'mg/L') ? this.formData.creatinimie / 10 : this.formData.creatinimie;
  }

  set formData(data: Model.ImcDataType) {
    this._formData = data;
  }

  get formData() {
    return this._formData;
  }

}

export const CreatinineCalculatorSingleton = new CreatinineCalculator();