import { Subject, Subscription } from 'rxjs';

export class CheckboxEmitter
{
    private eventBus$: Subject<any> = new Subject();

    subscribe(next, error = () => {}, complete = () => {}): Subscription {
        return this.eventBus$.subscribe(next, error, complete);
    }

    next(event) {
        this.eventBus$.next(event);
    }
}
