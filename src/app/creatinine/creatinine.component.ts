import { Component, OnInit, AfterViewInit }   from '@angular/core';
import { ElementRef, ViewChild }              from '@angular/core';
import { NgForm }                             from '@angular/forms';
import { ImcDataType }                        from '../components/calculator';
import { round2 }                             from '../components/calculator/round2';
// import { CreatinineCompute }                  from '../components/calculator/CreatinineCompute'
import { ImcCalculator }                      from "../components/calculator/imc-calculator";
import { CreatinineCalculator }               from "../components/calculator/creatinine-calculator";
import { Model }                              from '../components/calculator/model';

@Component(
  {
    selector: 'app-creatinine',
    templateUrl: './creatinine.component.html',
    styleUrls: ['./creatinine.component.scss']
  })

export class CreatinineComponent
{
  currentYear: number = (new Date()).getFullYear();

  imcResultData: Model.ImcResultDataType;

  cockroftGaultResultData: Model.CreatinineResultDataType;

  public formData: ImcDataType = {
    birthYear: null,
    age: null,
    weight: null,
    height: null,
    creatinimie: null,
    creatinimieType: null,
    sex: null,
    originAfro: null,
  }

  cockroftGault: null;
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
  imc: any;
  percent: any;
  seuilMin: any;
  seuilMax: any;
  value: any;
  percentMin: any;
  percentMax: any;
  legendClassImc: any;
  slidePercImc: any;

  @ViewChild('form') form: NgForm;
  error: string;

  cursorStyle = {};

  constructor(private el: ElementRef) {
    this.imcResultData = {
      imc: null,
      sliderLabel: null,
      sliderPercentage: null,
    }
    this.cockroftGaultResultData = {
      cockroftGault: null,
      mdrd: null,
    }
  }

  reset()
  {
    for (let prop in this.formData) {
      this.formData[prop] = null;
    }

    this.currentYear = (new Date()).getFullYear();
  }

  setAge(e: any)
  {
    let year = e.target.value;

    if (year.toString().length !== 4) {
      this.error = 'Year must be...'
      return;
    }

    this.formData.age = this.currentYear - this.formData.birthYear;
  }

  setBirthYear(e: any)
  {
    let age = e.target.value;
    this.formData.birthYear = this.currentYear - this.formData.age;
  }

  compute()
  {
    const calculator1 = new ImcCalculator();
    const calculator2 = new CreatinineCalculator(this.formData);

    console.log(this.formData);
    this.imcResultData = calculator1.compute(this.formData);
    this.cockroftGaultResultData = calculator2.compute();

   

    // this.cursorStyle = {
    //   // color: 'pink',
    //   left: '50%',
    //   transition: 'all 0.5s ease-in',
    // }

    //Récupérer la valeur de this.imcResultData.sliderPercentage
    //Tant que c'est inférieur à 45
    //--> faire glisser le curseur jusqu'à sa valeur, en pourcentage
    //Si c'est supérieur, faire glisser jusqu'à 45
    let sliderPerc = this.imcResultData.sliderPercentage;
    
      this.cursorStyle = {
        left: sliderPerc+'%',
        transition: 'all 0.5s ease-in',
      }
    

  }

  onRadioButtonClicked(value: true|false)
  {
      this.formData.originAfro = value;
  
      const radioButtons = this.el.nativeElement.querySelectorAll('input[type=radio]')
  
      radioButtons.forEach(element => {
      if (element.value !== this.formData.originAfro) {
              element.checked = false;
          }
      })
  }
}
