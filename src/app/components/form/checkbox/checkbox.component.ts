import { Subscription }                 from 'rxjs';
import { QueryList, ContentChildren }   from '@angular/core';
import { Input, Output, Component }     from '@angular/core';
import { EventEmitter }                 from '@angular/core';
import { OnInit, AfterViewInit }        from '@angular/core';
import { CheckboxEmitter }              from './checkbox.emitter';

@Component({
    selector: 'checkbox',
    styleUrls: ['./checkbox.component.scss'],
    template: `<div class="checkbox" (click)="onClick($event)" [ngClass]="(true === selected) ? 'selected' : ''">
        <div class="knob"></div>
        <div class="label"><ng-content></ng-content></div>
    </div>`,
})
export class CheckboxComponent
{
    @Input('value') value: any;
    selected: boolean = false;

    constructor(private emitter: CheckboxEmitter) {

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
