import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export function clickAnim() {
    return trigger('clickAnim', [
        state('start', style({
            transform: 'rotate(0deg) scale(1)'
        })),
        transition('* => start', [
            style({ transform: 'rotate(-16deg) scale(1.6)' }),
            animate (300)
        ])
    ])
}
