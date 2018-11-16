


export type ClairanceInput = {
    birthYear: number;
    year: number;
    age: any;
    weight: number;
    height: number;
    creatinimie: number;
    creatinimieType: 'µmol/L' | 'mg/L';
    sex: 'H' | 'F';
    origin: boolean;
    res: number;
    resultat: number;

    cockroft: any;
    m1: number;
    m2: number;
    coef: number;
    createUnite: any;
    creat: any;
    creaumol: any;
    creat2: any;
    MDRD: any;
    slidePercCock: number;
    slideClassCock: any;
    paraCock: any;
    slidePercMdrd: any;
    slideClassMdrd: any;
    paraMdrd: any;
}

export function clairanceCalculator(data: ClairanceInput) {

}