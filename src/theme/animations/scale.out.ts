import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';

export function scaleOut(duration: number) {
    return trigger('scaleOut', [
        state('in', style({
            transform: 'scale(1)'
        })),
        transition('void => *', [
            style({ transform: 'scale(1.2)' }),
            animate (duration)
        ])
    ])
}
