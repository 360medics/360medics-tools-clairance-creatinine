export namespace Model {
    export interface ImcDataType {
        birthYear: number;
        age: number;
        weight: number;
        height: number;
        creatinimie: number;
        creatinimieType: 'µmol/L' | 'mg/L';
        sex: any;
        originAfro: boolean;   
    }

    export interface ImcResultDataType {
        imc: any;
        sliderLabel: string;
        sliderPercentage: number;
    }

    // export interface CreatinineComputeType {
    // }

    // export interface CockroftGaultAndMDRDDataType {
    //     cockroftGault: any;
    //     mdrd: any;
    // }

    export interface CreatinineResultDataType {
        cockroftGault: any;
        mdrd: any;
    }

}
