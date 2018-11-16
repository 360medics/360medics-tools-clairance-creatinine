import { Subscription }                 from 'rxjs';
import { QueryList, ContentChildren }   from '@angular/core';
import { Output, Component }     from '@angular/core';
import { EventEmitter }                 from '@angular/core';
import { OnInit, AfterViewInit }        from '@angular/core';
import { RadioEmitter }                 from './radio.emitter';
import { RadioComponent }               from './radio.component';

@Component({
    selector: 'radio-group',
    styleUrls: ['./radio.group.component.scss'],
    template: `<div class="radio-group"><ng-content></ng-content></div>`,
    providers: [RadioEmitter],
})
export class RadioGroupComponent implements OnInit, AfterViewInit
{
    @Output('onSelect') onSelect = new EventEmitter();
    @ContentChildren(RadioComponent) radios: QueryList<RadioComponent>;

    private subscription: Subscription = null;

    constructor(private emitter: RadioEmitter) {
        this.subscription = this.emitter.subscribe((e: any) => {
            const target = e.self;

            this.radios.forEach((radio, i) => { radio.unselect() })
            target.select()
            this.onOptionSelected(target.getValue());
        });
    }

    onOptionSelected(value: any) {
        this.onSelect.emit(value);
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }
}
