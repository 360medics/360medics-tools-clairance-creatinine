import { Input, Component } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent
{
    @Input('id') id: string = null;
    @Input('disabled') disabled: boolean = false;
    @Input('loading') loading: boolean = false;
    @Input('loaderColor') loaderColor: 'white'|'red' = 'white';
}
