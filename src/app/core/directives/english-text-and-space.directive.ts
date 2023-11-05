import { Directive, ElementRef, HostListener, } from '@angular/core';

@Directive({
    selector: '[englishTextAndSpace]'
})
export class EnglishTextDirective {
    private regex: RegExp = new RegExp(/^[a-zA-Z\s]*$/);
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];
    constructor (private el: ElementRef) {
    }
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        let current: string = this.el.nativeElement.value;
        let next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }
    // constructor (elem: ElementRef, renderer: Renderer) {
    // renderer.listen(elem.nativeElement, 'keydown', (event) => {

    //     if ([46, 8, 9, 27, 13, 110, 190, 36, 95].indexOf(event.keyCode) !== -1 ||
    //         // Allow: Ctrl+A
    //         (event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
    //         // Allow: Ctrl+C
    //         (event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
    //         // Allow: Ctrl+V
    //         (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
    //         // Allow: Ctrl+X
    //         (event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
    //         // Allow: home, end, left, right
    //         (event.keyCode >= 35 && event.keyCode <= 39)) {
    //         // let it happen, don't do anything
    //         return;
    //     }
    //     var regex = new RegExp(PatternRegularEx.UserNamePattern);
    //     if (!regex.test(event.key))
    //         event.preventDefault();
    // })
}
