import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Adds `.reveal` + toggles `.is-visible` when the host element scrolls into
 * view. Pairs with the `.reveal` / `.is-visible` utility classes in styles.scss.
 *
 * Usage: <div appReveal [revealDelay]="100">...</div>
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  @Input() revealDelay = 0;

  ngOnInit(): void {
    const node = this.el.nativeElement;
    node.classList.add('reveal');
    node.style.transitionDelay = `${this.revealDelay}ms`;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      // Respect reduced-motion preferences, and don't leave content
      // invisible forever on browsers without IntersectionObserver support.
      node.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add('is-visible');
            this.observer?.unobserve(node);
          }
        });
      },
      // threshold: 0.15 required 15% of the element's own area to be
      // visible before revealing it. For sections/images taller than the
      // viewport that ratio could never be reached, leaving them stuck at
      // opacity: 0 permanently. threshold: 0 fires as soon as even a
      // sliver is on screen, which fixes that "content never appears" bug.
      { threshold: 0, rootMargin: '0px 0px -5% 0px' }
    );
    this.observer.observe(node);

    // Extra safety net: if something still hasn't revealed shortly after
    // it's on screen (e.g. a layout/timing edge case), reveal it anyway
    // rather than leaving it permanently hidden.
    setTimeout(() => {
      const rect = node.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (inViewport) {
        node.classList.add('is-visible');
      }
    }, 1200);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
