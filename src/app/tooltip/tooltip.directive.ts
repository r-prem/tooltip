import {
  ComponentFactoryResolver,
  Directive,
  HostListener,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {TooltipComponent} from "./tooltip.component";

@Directive({
  selector: '[toolTip]'
})
export class TooltipDirective implements OnInit{

  @Input() toolTip: string = '';
  position: string = 'top';
  elHeight:number = 0;
  elWidth:number = 0;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
  }


  @HostListener('mouseenter')
  onMouseEnter() {
    const dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);

    // Create an instance of the dynamic component
    const dynamicComponentRef = dynamicComponentFactory.create(this.viewContainerRef.injector);
    const dynamicComponentInstance = dynamicComponentRef.instance as TooltipComponent;
    dynamicComponentInstance.text = this.toolTip;

    // Attach the dynamic component to the view container
    this.viewContainerRef.insert(dynamicComponentRef.hostView);

  }

  @HostListener('mouseleave')
  onMouseLeave() {
    // implement functionality to remove tooltip
  }



}
