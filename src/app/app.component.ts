import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from './shared/header/translate.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    ...sharedTranslateImports,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Portfolio';
  showScrollToTop = false;
  hideButtonOnRoutes = [
    '/Projects/Spooky-Town',
    '/Projects/Join',
    '/Projects/DaBubble',
  ];
  currentRoute = '';

  constructor(private router: Router, private translate: TranslateService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  /**
   * HostListener for window scroll events.
   * Determines if the user has scrolled near the bottom of the page and toggles the visibility of the scroll-to-top button
   * based on the current route.
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 100;
    const isVisibleRoute = !this.hideButtonOnRoutes.includes(this.currentRoute);
    this.showScrollToTop = isBottom && isVisibleRoute;
  }

  /**
   * Smoothly scrolls the window to the top of the page.
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
