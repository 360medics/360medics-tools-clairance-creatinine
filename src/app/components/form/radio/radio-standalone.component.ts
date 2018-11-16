import { Subscription }                 from 'rxjs';
import { QueryList, ContentChildren }   from '@angular/core';
import { Input, Output, Component }     from '@angular/core';
import { EventEmitter }                 from '@angular/core';
import { OnInit, AfterViewInit }        from '@angular/core';

@Component({
    selector: 'radio-standalone',
    styleUrls: ['./radio.component.scss'],
    template: `<div class="radio standalone" (click)="select($event)" [ngClass]="(true === selected) ? 'selected' : ''">
        <div class="knob"></div>
    </div>`,
})
export class RadioStandaloneComponent
{
    @Input('value') value: any;
    @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter();
    @Input('selected') selected: boolean = false;

    constructor() {

    }

    select(e: any)
    {
        const self = this;
        this.selected = !this.selected;

        const returnValue = (true === this.selected) ? this.value : false;
        this.onSelect.emit(returnValue);
    }

    getValue() {
        return this.value;
    }

    isSelected() {
        return (true === this.selected) ? true : false;
    }
}
