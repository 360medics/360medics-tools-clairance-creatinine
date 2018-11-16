import { Component, OnInit, AfterViewInit }     from '@angular/core';
import { ElementRef, ViewChild }                from '@angular/core';
import { NgForm }                               from '@angular/forms';
// import { Calculator, CalculatorInput }          from './calculator';
import { ImcDataType, ImcCalculator }           from '../components/calculator';

@Component({
  selector: 'app-creatinine',
  templateUrl: './creatinine.component.html',
  styleUrls: ['./creatinine.component.scss']
})
export class CreatinineComponent
{
    currentYear: number = (new Date()).getFullYear()

    public formData: ImcDataType = {
        birthYear: 1985,
        age: 33,
        weight: 65,
        height: 194,
        creatinimie: 12,
        creatinimieType: 'µmol/L',
        sex: 'H',
        originAfro: 'no',
    }

    cockroft: '';
    m1: null;
    m2: null;
    coef: null;
    createUnite: null;
    creat: null;
    creaumol: null;
    creat2: null;
    mdrd: null;
    slidePercCock: null;
    slideClassCock: null;
    paraCock: null;
    slidePercMdrd: null;
    slideClassMdrd: null;
    paraMdrd: null;

    //IMC
    // imc_height: any;
    // imc_weight: any;
    imc: any;
    percent: any;
    seuilMin: any;
    seuilMax: any;
    value: any;
    percentMin: any;
    percentMax: any;
    legendClassImc: any;
    slidePercImc: any;
    // to_info_clair: any;
    // globalHeight: any;
    // globalBMI: any;
    // scope: any;
    // calculateIMC: any;

  @ViewChild('form') form: NgForm;
  error: string;

  constructor(private el: ElementRef)
  {
      // this.reset()
    // this.imc = '';
    // this.percent = '';
    // this.seuilMin = '';
    // this.seuilMax = '';
    // this.value = '';
    // this.percentMin = '';
    // this.percentMax = '';
    // this.legendClassImc = '';
    // this.slidePercImc = '';
  }

  reset()
  {
    for (let prop in this.formData) {
        this.formData[prop] = null
    }

    this.formData.year = (new Date()).getFullYear()
  }

  setAge(e: KeyboardEvent)
  {
      let year = e.target.value

      if (year.toString().length !== 4) {
          this.error = 'Year must be...'
          return;
      }

      this.formData.age = this.formData.year - this.formData.birthYear;
  }

  setBirthYear(e: KeyboardEvent)
  {
      let age = e.target.value
      this.formData.birthYear = this.formData.year - this.formData.age;
  }

  compute()
  {
      const calculator = new ImcCalculator()

      let imcResult = calculator.compute(this.formData)
      console.log(imcResult)
  }

  // onRadioButtonClicked(value: 'yes'|'no')
  // {
  //     this.formData.originAfro = value;
  //
  //     const radioButtons = this.el.nativeElement.querySelectorAll('input[type=radio]')
  //
  //     radioButtons.forEach(element => {
  //     if (element.value !== this.formData.originAfro) {
  //             element.checked = false;
  //         }
  //     })
  // }

  toolsClairanceCreatinineCompute(formData: ClairanceInput)
  {
      
    //Calcul de l'année de naissance selon l'âge saisi

    // COCKROFT FORMULE 1 (creatinimie en mg/dL)
    formData.cockroft = this.roundNumberWithTwoDigits(formData.cockroft);

    formData.m1 = formData.m2 = 1;

    if (formData.sex == 'F') {
      formData.m1 = 0.742;
    }

    if (formData.origin === true) {
      formData.m2 = 1.212;
    }

    // COCKROFT FORMULE 2 (creatinimie en µmol/L)
    formData.coef = 140;
    const k = (formData.sex === 'H') ? 1.23 : 1.04;

    if (parseInt(formData.createUnite, 2)) {
      formData.creat = (formData.creaumol / 10) * 88.4;
    } else {
      formData.creat = formData.creaumol;
    }
    formData.cockroft = (((140 - parseInt(formData.age)) / formData.creat) * formData.weight * k);

    // MDRD FORMULE 1 (creatinimie en mg/dL)
    if (formData.createUnite === 2) {
      formData.MDRD = formData.MDRD * Math.pow(88.5, -1.154);
    }
    formData.MDRD = this.roundNumberWithTwoDigits(formData.MDRD);

    // MDRD FORMULE 2 (creatinimie en µmol/L)
    if (parseInt(formData.createUnite, 2)) {
      formData.creat2 = formData.creaumol / 10;
    } else {
      formData.creat2 = formData.creaumol;
    }

    formData.MDRD = 186 * Math.pow((formData.creat2 * 0.0113), -1.154) * Math.pow(formData.age, -0.203) * formData.m1 * formData.m2;

    // Interpretations cockroft:
    formData.slidePercCock = (formData.cockroft / 120) * 100;
    if (formData.slidePercCock < 10) {
      formData.slidePercCock = 10;
    }
    if (formData.slidePercCock > 90) {
      formData.slidePercCock = 90;
    }

    if (formData.cockroft <= 30) {
      formData.slideClassCock = 'severe';
      formData.paraCock = " Insuffisance rénale sévère";
    } else if (formData.cockroft <= 60) {
      formData.slideClassCock = 'modere';
      formData.paraCock = "Insuffisance rénale modérée";
    } else if (formData.cockroft <= 80) {
      formData.slideClassCock = 'legere';
      formData.paraCock = "Insuffisance rénale légère";
    } else {
      formData.slideClassCock = 'normal';
      formData.paraCock = "Valeurs normales";
    }
    return formData.paraCock;
    return formData.slideClassCock;
    return formData.slidePercCock;


    //interpretation MDRD
    formData.slidePercMdrd = (formData.MDRD / 120) * 100;
    if (formData.slidePercMdrd < 10) {
      formData.slidePercMdrd = 10;
    }
    if (formData.slidePercMdrd > 90) {
      formData.slidePercMdrd = 90;
    }

    if (formData.MDRD <= 30) {
      formData.slideClassMdrd = 'severe';
      formData.paraMdrd = " Insuffisance rénale sévère";
    } else if(formData.MDRD <= 60) {
      formData.slideClassMdrd = 'modere';
      formData.paraMdrd = "Insuffisance rénale modérée";
    } else if(formData.MDRD <= 80) {
      formData.slideClassMdrd = 'legere';
      formData.paraMdrd = "Insuffisance rénale légère";
    } else {
      formData.slideClassMdrd = 'normal';
      formData.paraMdrd = "Valeurs normales";
    }
    return formData.paraMdrd;
    return formData.slideClassMdrd;
    return formData.slidePercMdrd;

    return formData.cockroft;
    return formData.MDRD;
  }

}
