import { Subject }                      from 'rxjs';
import { ElementRef, ViewChild }        from '@angular/core';
import { Input, Output, Component }     from '@angular/core';
import { HostListener, EventEmitter }   from '@angular/core';
import { OnInit }        from '@angular/core';
import { FormValidator }                from '../form.validator';
import { debounceTime }                 from 'rxjs/operators';

@Component({
    selector: 'textarea-control',
    styleUrls: ['./textarea.component.scss'],
    template: `
        <div class="control" [ngClass]="klasses">
            <label *ngIf="(null !== label)" [innerText]="label"></label>
            <div class="input-container">
                <span class="star-required" *ngIf="required"></span>
                <textarea #textareaControl
                    autocomplete="off"
                    [value]="value"
                    (valueChange)="onChange($event)"
                ></textarea>
            </div>
        </div>`,
        // encapsulation: ViewEncapsulation.None,
})
export class TextareaComponent implements OnInit
{
    klasses: string;
    valid: boolean = null;

    subject: Subject<any> = new Subject();
    @Input('name') name: string;
    @Input('label') label: string = null;
    @Input('placeholder') placeholder: string = null;
    @Input('disabled') disabled: boolean = false;
    @Input('required') required: boolean = false;
    @Input('validation') validation: FormValidator;
    @Input('width') width: string = 'auto';
    @Input() value: string | number;
    @Output() valueChange: EventEmitter<string | number> = new EventEmitter();
    @ViewChild('textareaControl') input: ElementRef;

    constructor()
    {
        this.validation = new FormValidator({})
    }

    onChange(e: any)
    {

    }

    ngOnInit()
    {
        this.subject.pipe(debounceTime(250)).subscribe((e: any) => {
            this.valid = this.validation.validate(this.name, e.inputValue);
            this.setKlasses()
        })
    }

    setKlasses()
    {
        if (null === this.valid) {
            this.klasses = '';
        }
        if (true === this.valid) {
            this.klasses = ' valid';
        }
        if (false === this.valid) {
            this.klasses = ' invalid';
        }
    }

    @HostListener('keyup', ['$event']) onKeyUp(e: any) {
        const element = e.target;
        const value = e.target.value;
        this.value = value;
        this.valueChange.emit(value);
        this.subject.next({ inputName: e.target.name, inputValue: e.target.value });
    }

    getValue()
    {
        return this.value;
    }
}
