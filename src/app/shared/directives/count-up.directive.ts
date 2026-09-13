import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Animates a numeric counter from 0 to [countTo] once the host scrolls into
 * view. [countSuffix] is appended after the animation (e.g. '+', '/5').
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  @Input({ required: true }) countTo!: number;
  @Input() countSuffix = '';
  @Input() countDuration = 1400;
  @Input() countDecimals = 0;

  ngOnInit(): void {
    const node = this.el.nativeElement;
    node.textContent = `0${this.countSuffix}`;

    if (typeof IntersectionObserver === 'undefined') {
      // No IntersectionObserver support — animate right away rather than
      // leaving the counter stuck at 0.
      this.animate();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animate();
            this.observer?.unobserve(node);
          }
        });
      },
      // A low threshold (rather than 0.4) means large stat blocks still
      // trigger the count-up as soon as they enter the viewport, instead
      // of staying stuck at "0" until 40% of the element is on screen.
      { threshold: 0.1 }
    );
    this.observer.observe(node);

    // Safety net: if the element is already on screen but, for whatever
    // layout timing reason, the observer never fires, count up anyway
    // after a short delay so the number is never stuck at 0.
    setTimeout(() => {
      const rect = node.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (inViewport && node.textContent === `0${this.countSuffix}`) {
        this.animate();
        this.observer?.unobserve(node);
      }
    }, 1200);
  }

  private animate(): void {
    const node = this.el.nativeElement;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / this.countDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * this.countTo;
      node.textContent = `${value.toFixed(this.countDecimals)}${this.countSuffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
