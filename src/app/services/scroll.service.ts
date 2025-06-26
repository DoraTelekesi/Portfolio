import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private pendingFragment: string | null = null;
  constructor(private router: Router) {}

  /**
   * Scrolls smoothly to the section with the given fragment identifier.
   * If already on the correct route and fragment, scrolls directly.
   * Otherwise, navigates to the root with the fragment and scrolls after navigation.
   * @param fragment The fragment identifier of the section to scroll to.
   */
  scrollToSection(fragment: string): void {
    const currentUrlTree = this.router.parseUrl(this.router.url);
    const currentFragment = currentUrlTree.fragment;
    if (this.router.url.startsWith('/') && currentFragment === fragment) {
      this.scrollToElement(fragment);
    } else {
      this.router.navigate(['/'], { fragment }).then(() => {
        this.router.events
          .pipe(
            filter((event) => event instanceof NavigationEnd),
            take(1)
          )
          .subscribe(() => {
            this.scrollToElement(fragment);
          });
      });
    }
  }

  /**
   * Scrolls smoothly to the DOM element with the given fragment ID if it exists.
   * @param fragment The fragment identifier of the element to scroll to.
   */
  private scrollToElement(fragment: string) {
    const el = document.getElementById(fragment);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
