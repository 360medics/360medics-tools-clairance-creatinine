import { Subscription }                 from 'rxjs';
import { QueryList, ContentChildren }   from '@angular/core';
import { Input, Output, Component }     from '@angular/core';
import { EventEmitter }                 from '@angular/core';
import { CheckboxEmitter }              from './checkbox.emitter';
import { CheckboxComponent }            from './checkbox.component';

@Component({
    selector: 'checkbox-group',
    styleUrls: ['./checkbox.group.component.scss'],
    template: `<div class="checkbox-group"><ng-content></ng-content></div>`,
    providers: [CheckboxEmitter],
})
export class CheckboxGroupComponent
{
    @Output('onSelect') onSelect = new EventEmitter();
    @ContentChildren(CheckboxComponent) checkboxes: QueryList<CheckboxComponent>;

    private subscription: Subscription = null;
    private values: Array<any> = [];

    constructor(private emitter: CheckboxEmitter) {
        this.subscription = this.emitter.subscribe((e: any) => {
            const target = e.self;
            target.toggle();

            if (target.isSelected()) {
                this.addValue(target.getValue())
            } else {
                this.removeValue(target.getValue())
            }

            this.onOptionSelected(this.values);
        });
    }

    onOptionSelected(value: any) {
        this.onSelect.emit(value);
    }

    addValue(value: any) {
        if (this.values.indexOf(value) === -1) {
            this.values.push(value)
        }
    }

    removeValue(value: any) {
        const index = this.values.indexOf(value);
        if (index > -1) {
            this.values.splice(index, 1)
        }
    }
}
