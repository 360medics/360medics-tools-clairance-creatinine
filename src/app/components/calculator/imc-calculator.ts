import { round2 }                           from './round2';
import { imcSliderPercentage }              from './imc-slider-percentage';
import { analyzeAndValidateNgModules }      from '@angular/compiler';

export type ImcDataType = {
    birthYear: number;
    age: number;
    weight: number;
    height: number;
    creatinimie: number;
    creatinimieType: any;
    sex: any;
    originAfro: boolean;
}

export type ImcResultDataType = {
    imc: any;
    sliderLabel: string;
    sliderPercentage: number;
}

export class ImcCalculator {

    constructor() {

    }

    compute(data: ImcDataType): ImcResultDataType {
        let imc: any;
        let sliderLabel: string;
        let sliderPercentage: number;

        imc = round2(data.weight / ((data.height / 100) * (data.height / 100)))

        if (imc <= 16.5) {

            sliderLabel = 'Sous-poids';
            sliderPercentage = imcSliderPercentage(imc, 0, 16.5, 0, 14)

        } else if (imc <= 18.5) {

            sliderLabel = 'Maigreur';
            sliderPercentage = imcSliderPercentage(imc, 16.5, 18.5, 15, 21)

        } else if (imc <= 25) {

            sliderLabel = 'Normal';
            sliderPercentage = imcSliderPercentage(imc, 18.5, 25, 22, 37)

        } else if (imc <= 30) {

            sliderLabel = 'Surpoids';
            sliderPercentage = imcSliderPercentage(imc, 25, 30, 37.5, 52)

        } else if (imc <= 35) {

            sliderLabel = 'Obésité modérée';
            sliderPercentage = imcSliderPercentage(imc, 30, 35, 53, 67.5)
        } else if (imc <= 40) {

            sliderLabel = 'Obésité sévère';
            sliderPercentage = imcSliderPercentage(imc, 35, 40, 68.5, 83)

        } else if (imc > 40) {

            sliderLabel = 'Obésité morbide';
            sliderPercentage = imcSliderPercentage(imc, 40, 45, 84, 98)

        } else {

            sliderLabel = '';
            sliderPercentage = 0;
        }

        return {
            imc: imc,
            sliderLabel: sliderLabel,
            sliderPercentage: sliderPercentage,
        }
    }
}

export const ImcCalculatorSingleton = new ImcCalculator();