import { ImcDataType } from './imc-calculator';
import { round2 } from './round2';


export type CreatinineComputeType = {
    cockroftGault: any;
    mdrd: any;
}

export type CockroftGaultAndMDRDDataType = {
    cockroftGault: any;
    mdrd: any;
}

export class CreatinineCompute {
    constructor() {

    }

    compute(formData: ImcDataType): CockroftGaultAndMDRDDataType {

        let cockroftGault: any;
        let mdrd: any;
        let m1: any;
        let m2: any;
        let createUnite: any;
        let creat: any;
        let slidePercMdrd: any;
        let paraCock: any;
        let slidePercCock: any;
        let slideClassCock: any;
        let slideClassMdrd: any;
        let paraMdrd: any;
        let creat2: any;

        // COCKROFT FORMULE 2 (creatinimie en µmol/L)
        const k = (formData.sex === 'H') ? 1.23 : 1.04;

        if (formData.creatinimieType === 'mg/L') {
            creat = (formData.creatinimie / 10) * 88.4;
        } else {
            creat = formData.creatinimie;
        }
        cockroftGault = (((140 - (formData.age) / creat) * formData.weight * k));
        // console.log(cockroftGault)

        // COCKROFT FORMULE 1 (creatinimie en mg/dL)
        cockroftGault = round2(cockroftGault);

        m1 = m2 = 1;

        if (formData.sex == 'F') {
            m1 = 0.742;
        }

        if (formData.originAfro === true) {
            m2 = 1.212;
        }
        
        // MDRD FORMULE 2 (creatinimie en µmol/L)
        if (parseInt(createUnite, 2)) {
            creat2 = formData.creatinimie / 10;
        } else {
            creat2 = formData.creatinimie;
        }

        mdrd = 186 * Math.pow((creat2 * 0.0113), -1.154) * Math.pow(formData.age, -0.203) * m1 * m2;

        // MDRD FORMULE 1 (creatinimie en mg/dL)
        if (createUnite === 2) {
            mdrd = mdrd * Math.pow(88.5, -1.154);
        }
        mdrd = round2(mdrd);

        // Interpretations cockroft:
        slidePercCock = (cockroftGault / 120) * 100;
        if (slidePercCock < 10) {
            slidePercCock = 10;
        }
        if (slidePercCock > 90) {
            slidePercCock = 90;
        }

        if (cockroftGault <= 30) {
            slideClassCock = 'severe';
            paraCock = " Insuffisance rénale sévère";
        } else if (cockroftGault <= 60) {
            slideClassCock = 'modere';
            paraCock = "Insuffisance rénale modérée";
        } else if (cockroftGault <= 80) {
            slideClassCock = 'legere';
            paraCock = "Insuffisance rénale légère";
        } else {
            slideClassCock = 'normal';
            paraCock = "Valeurs normales";
        }
        // return paraCock;
        // return slideClassCock;
        // return slidePercCock;


        //interpretation MDRD
        slidePercMdrd = (mdrd / 120) * 100;
        if (slidePercMdrd < 10) {
            slidePercMdrd = 10;
        }
        if (slidePercMdrd > 90) {
            slidePercMdrd = 90;
        }

        if (mdrd <= 30) {
            slideClassMdrd = 'severe';
            paraMdrd = " Insuffisance rénale sévère";
        } else if (mdrd <= 60) {
            slideClassMdrd = 'modere';
            paraMdrd = "Insuffisance rénale modérée";
        } else if (mdrd <= 80) {
            slideClassMdrd = 'legere';
            paraMdrd = "Insuffisance rénale légère";
        } else {
            slideClassMdrd = 'normal';
            paraMdrd = "Valeurs normales";
        }
        // return paraMdrd;
        // return slideClassMdrd;
        // return slidePercMdrd;

        // return cockroftGault;
        // return mdrd;

        return {
            cockroftGault: cockroftGault,
            mdrd: mdrd,
        }

    }
}
