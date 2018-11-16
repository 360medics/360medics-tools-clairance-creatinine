import { Component }     from '@angular/core';
import { ToastService }         from './toast.service';

@Component({
    selector: 'toast-component',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
})
export class ToastComponent
{
    constructor(public toaster: ToastService)
    {

    }
}
