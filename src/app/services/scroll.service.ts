import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private pendingFragment: string | null = null;
  constructor(private router: Router) {}

  scrollToSection(fragment: string): void {
    const currentUrlTree = this.router.parseUrl(this.router.url);
    const currentFragment = currentUrlTree.fragment;

    // If we are already on '/' and fragment is the same, just scroll manually
    if (this.router.url.startsWith('/') && currentFragment === fragment) {
      this.scrollToElement(fragment);
    } else {
      // Navigate to root with fragment (will trigger navigation event)
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

  private scrollToElement(fragment: string) {
    const el = document.getElementById(fragment);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
