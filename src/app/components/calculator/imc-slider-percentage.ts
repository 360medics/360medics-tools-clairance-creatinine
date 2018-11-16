import { round2 } from './round2';

export function imcSliderPercentage(imc, seuilMin, seuilMax, percentMin, percentMax): number
{
    let value: number;
    let percent: any;
    
    percent = round2((imc - seuilMin) / (seuilMax - seuilMin))
    value = percentMin + (percent * (percentMax - percentMin))

    return (value > 98) ? 98 : value
}
