import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { Calculator, CalculatorInput }          from './calculator';
import { ImcDataType, ImcCalculator } from '../components/calculator';
import { round2 } from '../components/calculator/round2';

@Component({
  selector: 'app-creatinine',
  templateUrl: './creatinine.component.html',
  styleUrls: ['./creatinine.component.scss']
})
export class CreatinineComponent {
  currentYear: number = (new Date()).getFullYear()

  public formData: ImcDataType = {
    birthYear: 1985,
    age: 33,
    weight: 65,
    height: 194,
    creatinimie: 12,
    creatinimieType: 'µmol/L',
    sex: 'H',
    originAfro: false,
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

  constructor(private el: ElementRef) {
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

  reset() {
    for (let prop in this.formData) {
      this.formData[prop] = null
    }

    this.currentYear = (new Date()).getFullYear()
  }

  setAge(e: any) {
    let year = e.target.value

    if (year.toString().length !== 4) {
      this.error = 'Year must be...'
      return;
    }

    this.formData.age = this.currentYear - this.formData.birthYear;
  }

  setBirthYear(e: any) {
    let age = e.target.value
    this.formData.birthYear = this.currentYear - this.formData.age;
  }

  compute() {
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
}
