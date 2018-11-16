declare var $: any;
import { Injectable }   from '@angular/core';

@Injectable()
export class ToastService
{
    private timer: any;
    private visible: boolean = false
    private contents: string
    private nativeElement: HTMLElement = null
    private FADE_OUT_TIME: any = 2700;

    constructor()
    {
        this.nativeElement = document.getElementById('toast')
    }

    select()
    {
        this.nativeElement = document.getElementById('toast')

        return this
    }

    isVisible()
    {
        return this.visible
    }

    getContents()
    {
        return this.contents
    }

    show(contents: string, timeout?: number, error?: boolean)
    {
        this.contents = contents
        this.visible = true

        $(this.nativeElement).fadeIn(250)

        if (this.timer !== null) {
            clearTimeout(this.timer)
        }

        let fadeAfter = (timeout) ? timeout : this.FADE_OUT_TIME

        this.timer = setTimeout(() => {
            this.dismiss()
        }, fadeAfter)

        return this
    }

    dismiss(e?: any)
    {
        if (e) { e.preventDefault() }

        $(this.nativeElement).fadeOut(250, () => {
            this.contents = null
            this.visible = false

            if (this.timer) {
                clearTimeout(this.timer)
            }
        })

        return this
    }
}
