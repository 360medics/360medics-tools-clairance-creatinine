namespace Model {
    export interface ImcDataType {
        birthYear: number;
        age: number;
        weight: number;
        height: number;
        creatinimie: number;
        creatinimieType: 'µmol/L' | 'mg/L';
        sex: 'H' | 'F';
        originAfro: boolean;   
    }

    export interface ImcResultDataType {
        imc: any;
        sliderLabel: string;
        sliderPercentage: number;
    }

    export interface CreatinineComputeType {
    }

    export interface CockroftGaultAndMDRDDataType {
        cockroftGault: any;
        mdrd: any;
    }
}