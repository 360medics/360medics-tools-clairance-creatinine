import { Input, Component }     from '@angular/core';
import { RadioEmitter }                 from './radio.emitter';

@Component({
    selector: 'radio',
    styleUrls: ['./radio.component.scss'],
    template: `<div class="radio" (click)="onClick($event)" [ngClass]="(true === selected) ? 'selected' : ''">
        <div class="knob"></div>
        <div class="label"><ng-content></ng-content></div>
    </div>`,
})
export class RadioComponent
{
    @Input('value') value: any;
    @Input('selected') selected: boolean = false;
    
    constructor(private emitter: RadioEmitter) {

    }

    onClick(e: any)
    {
        const self = this;
        this.emitter.next({ self: self, value: this.value, selected: this.selected });
    }

    toggle() {
        this.selected = !this.selected;
        return this;
    }

    select() {
        this.selected = true;
        return this;
    }

    unselect() {
        this.selected = false;
        return this;
    }

    getValue() {
        return this.value;
    }

    isSelected() {
        return (true === this.selected) ? true : false;
    }
}
