import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from '../../shared/header/translate.module';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [...sharedTranslateImports],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent implements AfterViewInit {
  isUnderlined = false;

  /**
   * Lifecycle hook that is called after Angular has fully initialized a component's view.
   * Initializes the underline animation and scrolls to a fragment if present in the route.
   */
  ngAfterViewInit(): void {
    gsap.set('.underline', {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    this.animateUnderline();
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100); // short delay ensures DOM is ready
        }
      }
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private viewportScroller: ViewportScroller,
    private scrollService: ScrollService
  ) {}

  goToSection(section: string) {
    this.scrollService.scrollToSection(section);
  }
  /**
   * Animates the underline element using GSAP with a repeating yoyo effect.
   */
  animateUnderline() {
    gsap.to('.underline', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 2,
      ease: 'power2.out',
      repeat: -1,
      yoyo: true,
    });
  }
}
