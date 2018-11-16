import { Subject }                      from 'rxjs';
import { ElementRef, ViewChild }        from '@angular/core';
import { Input, Output, Component }     from '@angular/core';
import { HostListener, EventEmitter }   from '@angular/core';
import { OnInit }                       from '@angular/core';
import { FormValidator }                from '../form.validator';
import { debounceTime }                 from 'rxjs/operators';

@Component({
    selector: 'input-control',
    styleUrls: ['./input.component.scss'],
    template: `
        <div class="control" [ngClass]="klasses">
            <label *ngIf="(null !== label)" [innerText]="label"></label>
            <div class="input-container">
                <input #inputControl
                    autocomplete="off"
                    [attr.type]="type"
                    [attr.value]="value"
                    [attr.name]="name"
                    [attr.placeholder]="placeholder"
                    [attr.disabled]="(true === disabled) ? 'true' : null"
                    [ngClass]="(validation !== null) ? 'has-validation' : ''">
            </div>
        </div>`,
})
export class InputComponent implements OnInit
{
    valid: boolean = null;

    subject: Subject<any> = new Subject();
    @Input('klasses') klasses: string;
    @Input('type') type: string = 'text';
    @Input('name') name: string;
    @Input('label') label: string = null;
    @Input('placeholder') placeholder: string = null;
    @Input('disabled') disabled: boolean = false;
    @Input('validation') validation: FormValidator;
    @Input('width') width: string = 'auto';
    @Input('focus') focus: boolean;
    @Input() value: string | number;

    @Output() valueChange: EventEmitter<string | number> = new EventEmitter();
    @ViewChild('inputControl') input: ElementRef;

    constructor(private elem: ElementRef)
    {
        this.validation = null; // new FormValidator({})
        this.focus = false;
        this.klasses = '';
    }

    ngOnInit()
    {
        this.subject.pipe(debounceTime(250)).subscribe((e: any) => {
            if (this.validation !== null) {
                this.valid = this.validation.validate(this.name, e.inputValue)
                this.setKlasses()
            }

        })

        if (this.focus) {
            this.elem.nativeElement.querySelector('input').focus();
        }
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

    @HostListener('keyup', ['$event']) onKeyUp(e: any)
    {
        const element = e.target;
        const value = e.target.value;
        this.value = value;
        this.valueChange.emit(value);
        this.subject.next({inputName: e.target.name, inputValue: e.target.value});
    }

    getValue()
    {
        return this.value;
    }
}
