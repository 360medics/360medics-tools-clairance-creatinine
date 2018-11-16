import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { clairanceCalculator, ClairanceInput } from './calculator';
import { toolsClairanceCreatinineCompute } from './toolsClairanceCreatinineCompute';
import { and } from '@angular/router/src/utils/collection';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-creatinine',
  templateUrl: './creatinine.component.html',
  styleUrls: ['./creatinine.component.scss']
})
export class CreatinineComponent implements OnInit, AfterViewInit {
  formData: ClairanceInput = {
    birthYear: null,
    year: 2018,
    age: null,
    weight: null,
    height: null,
    creatinimie: null,
    creatinimieType: null,
    sex: null,
    origin: null,
    res: null,
    resultat: null,

    cockroft: '',
    m1: null,
    m2: null,
    coef: null,
    createUnite: null,
    creat: null,
    creaumol: null,
    creat2: null,
    MDRD: null,
    slidePercCock: null,
    slideClassCock: null,
    paraCock: null,
    slidePercMdrd: null,
    slideClassMdrd: null,
    paraMdrd: null,
  };
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

  constructor(private el: ElementRef) {

    //IMC
    // this.imc_height = '';
    // this.imc_weight = '';
    this.imc = '';
    this.percent = '';
    this.seuilMin = '';
    this.seuilMax = '';
    this.value = '';
    this.percentMin = '';
    this.percentMax = '';
    this.legendClassImc = '';
    this.slidePercImc = '';
    // this.to_info_clair = '';
    // this.globalHeight = '';
    // this.globalBMI = '';
    // this.scope = '';
    // this.calculateIMC = '';
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  onClick(e) {
    e.preventDefault()
    console.log(e);
  }

  reset() {
    this.formData.birthYear = null;
    this.formData.age = null;
    this.formData.creatinimie = null;
    this.formData.creatinimieType = null;
    this.formData.sex = null;
    this.formData.origin = null;
    this.formData.res = null;
    this.formData.resultat = null;
    this.formData.weight = null;
    this.formData.height = null;
    //Ajouter variables IMC
  }

  calculate() {
    //this.res = parseFloat(this.birthYear) + parseFloat(this.age);
    //this.res = 2018 - parseFloat(this.birthYear);
    this.formData.res = 2018 - this.formData.birthYear;
  }

  onRadioButtonClicked(value) {
    this.formData.origin = value;

    const radioButtons = this.el.nativeElement.querySelectorAll('input[type=radio]');
    radioButtons.forEach(element => {
      if (element.value !== this.formData.origin) {
        element.checked = false;
      }
    });
  }

  // onClick2() {
  //   let result = clairanceCalculator({
  //     birthYear: this.birthYear,
  //     weight: this.weight,
  //     sex: this.sex
  //   })
  // }

  // setOld(value: any) {
  //   this.formData.birthYear = value;

  //   if (+this.formData.birthYear === 15) {
  //     this.formData.age = 30;
  //   }
  // }

  setAge(value: any) {
    this.formData.birthYear = value;
    this.formData.age = this.formData.year - this.formData.birthYear;
  }

  toolsIMCCompute(height, weight) {

    height = height / 100;
    this.imc = weight / (height * height);
    this.imc = this.roundNumberWithTwoDigits(this.imc);

    //Interprétation IMC
    switch (this.imc) {
      case this.imc <= 16.5:
        this.legendClassImc = 'L1';
        this.slidePercImc = this.calcPercSlideIMC(this.imc, 0, 16.5, 0, 14);

      case this.imc <= 18.5:
        this.legendClassImc = 'L2';
        this.slidePercImc = this.calcPercSlideIMC(this.imc, 16.5, 18.5, 15, 21);

      case this.imc <= 25:
        this.legendClassImc = 'L3';
        this.slidePercImc = this.calcPercSlideIMC(this.imc, 18.5, 25, 22, 37);

      case this.imc <= 30:
        this.legendClassImc = 'L4';
        this.slidePercImc = this.calcPercSlideIMC(this.imc, 25, 30, 37.5, 52);

      case this.imc <= 35:
        this.legendClassImc = 'L5';
        this.slidePercImc = this.calcPercSlideIMC(this.imc, 30, 35, 53, 67.5);

      case this.imc <= 40:
        this.legendClassImc = 'L6';
        this.slidePercImc = this.calcPercSlideIMC(this.imc, 35, 40, 68.5, 83);

      case this.imc > 40:
        this.legendClassImc = 'L7';
        this.slidePercImc = this.calcPercSlideIMC(this.imc, 40, 45, 84, 98);

      default:
        this.legendClassImc = 0;
    }

    return this.imc;
    return this.legendClassImc;
    return this.slidePercImc;

  }

  roundNumberWithTwoDigits(percent) {
    return Number.parseFloat(percent).toFixed(2);
  }

  calcPercSlideIMC(imc, seuilMin, seuilMax, percentMin, percentMax) {
    this.percent = this.roundNumberWithTwoDigits((this.imc - this.seuilMin) / (this.seuilMax - this.seuilMin));
    this.value = this.percentMin + (this.percent * (this.percentMax - this.percentMin));

    if (this.value > 98) {
      this.value = 98;
    }
    return this.value;
  }

  toolsClairanceCreatinineCompute(formData: ClairanceInput) {
   
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