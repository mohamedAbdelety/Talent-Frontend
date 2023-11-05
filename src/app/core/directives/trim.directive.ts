// import { Directive, ElementRef, HostListener } from '@angular/core';

// @Directive({
//     selector: '[trim]'
// })
// export class TrimDirective {
//     // constructor (elem: ElementRef, renderer: Renderer) {
//     //     renderer.listen(elem.nativeElement, 'focusout', (event) => {
//     //         var value = elem.nativeElement.value.trim();
//     //         renderer.setElementProperty(elem.nativeElement, 'value', value);
//     //         elem.nativeElement.dispatchEvent(new Event("input"));
//     //     })
//     // }

//     constructor (private el: ElementRef) {
//         console.log('constructed InputTextFilterDirective');
//         (el.nativeElement as HTMLInputElement).value = '';
//     }

//     @HostListener('focusout')
//     focusout() {

//         // console.log('in change InputTextFilterDirective');
//         (this.el.nativeElement as HTMLInputElement).value.trim();
//         //  console.log(this.ngModel);
//     }

// }
import { Directive, HostBinding, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[trim]'
})

export class TrimDirective {
    constructor (private el: ElementRef) {
        (el.nativeElement as HTMLInputElement).value = '';
    }
    @HostListener('blur')
    applyTrim() {
        let ele = this.el.nativeElement as HTMLInputElement;
        if (typeof ele.value === 'string') {
            ele.value = ele.value.trim();
        }
    }
}