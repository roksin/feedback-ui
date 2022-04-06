import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService<T> {
  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
  }

  loader(typeOfComponent: Type<T>): ComponentRef<T> {
    // new component reference from the component
    const ref: ComponentRef<T> =
      this.componentFactoryResolver.resolveComponentFactory(typeOfComponent).create(this.injector);

    // inside the ng component tree
    this.appRef.attachView(ref.hostView);

    // Get DOM element from component
    const domElem = (ref.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    // Append DOM element to the body
    document.body.appendChild(domElem);
    ref.changeDetectorRef.detectChanges();

    return ref;
  }
}
