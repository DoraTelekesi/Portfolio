import { CommonModule, NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { gsap } from 'gsap';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from './translate.module';
import { Subscription, filter } from 'rxjs';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, ...sharedTranslateImports],
})
export class HeaderComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('aboutDrawnLine') aboutDrawnLine!: ElementRef<HTMLImageElement>;
  @ViewChild('skillsDrawnLine') skillsDrawnLine!: ElementRef<HTMLImageElement>;
  @ViewChild('projectDrawnLine')
  projectDrawnLine!: ElementRef<HTMLImageElement>;
  @ViewChild('contactDrawnLine')
  contactDrawnLine!: ElementRef<HTMLImageElement>;
  @ViewChild('en') en!: ElementRef<HTMLImageElement>;
  @ViewChild('de') de!: ElementRef<HTMLImageElement>;
  @ViewChild('toggleBtn') toggleBtn!: ElementRef<HTMLImageElement>;
  @ViewChild('bgFillGithub') bgFillGithub!: ElementRef;
  @ViewChild('bgFillLinkedin') bgFillLinkedin!: ElementRef;
  @ViewChild('bgFillEmail') bgFillEmail!: ElementRef;
  language: string = 'en';
  status: 'english' | 'german' = 'english';
  currentLang: 'en' | 'de' = 'en';
  currentUrl: string = '';
  private routerSub = Subscription.EMPTY; // avoids the need for !
  respMenuOpened = false;

  /**
   * Closes the responsive menu.
   */
  closeRespMenu() {
    this.respMenuOpened = false;
  }

  /**
   * Opens the responsive menu.
   */
  openRespMenu() {
    this.respMenuOpened = true;
  }

  /**
   * Angular lifecycle hook called on component initialization.
   * Subscribes to router events to track the current URL.
   */
  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  /**
   * Angular lifecycle hook called when the component is destroyed.
   * Unsubscribes from the router subscription.
   */
  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private router: Router,
    private scrollService: ScrollService
  ) {
    const savedLang = localStorage.getItem('lang');
    const savedStatus = localStorage.getItem('status') as 'english' | 'german';
    if (savedStatus) {
      this.status = savedStatus;
    }
    this.getTranslationStatusFromLocalStorage(savedLang);
  }

  /**
   * Scrolls to the specified section using the ScrollService and closes the responsive menu.
   * @param section The section ID or name to scroll to.
   */
  goToSection(section: string) {
    this.scrollService.scrollToSection(section);
    this.respMenuOpened = false;
  }
  /**
   * Retrieves and sets the translation status from local storage.
   * @param savedLang The saved language code from local storage.
   */
  getTranslationStatusFromLocalStorage(savedLang: string | null) {
    if (savedLang === 'de') {
      localStorage.setItem('status', 'german');
      this.status = 'german';
      this.translate.use('de');
    } else {
      localStorage.setItem('status', 'english');
      this.status = 'english';
      this.translate.use('en');
    }
  }

  /**
   * Toggles the current language between English and German.
   */
  onToggleLanguage(): void {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
    this.translate.use(this.currentLang);
    localStorage.setItem('lang', this.currentLang);
  }

  /**
   * Angular lifecycle hook called after the component's view has been fully initialized.
   * Sets up background fills, drawn line elements, and handles fragment navigation.
   */
  ngAfterViewInit() {
    this.serBackgroundFill();
    const savedX = localStorage.getItem('toggleX');
    if (savedX) {
      gsap.set(this.toggleBtn.nativeElement, { x: parseFloat(savedX) });
    }
    this.setDrawnLineElements();
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    });
  }

  /**
   * Sets the initial background fill for social icons to 0% height.
   */
  serBackgroundFill() {
    gsap.set(this.bgFillGithub.nativeElement, {
      height: '0%',
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.set(this.bgFillLinkedin.nativeElement, {
      height: '0%',
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.set(this.bgFillEmail.nativeElement, {
      height: '0%',
      duration: 0.4,
      ease: 'power2.out',
    });
  }

  /**
   * Sets the initial state of the drawn line elements for navigation and language toggles.
   */
  setDrawnLineElements() {
    gsap.set(this.aboutDrawnLine.nativeElement, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    });
    gsap.set(this.skillsDrawnLine.nativeElement, {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    gsap.set(this.projectDrawnLine.nativeElement, {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    gsap.set(this.contactDrawnLine.nativeElement, {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    gsap.set(this.en.nativeElement, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    });
    gsap.set(this.de.nativeElement, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    });
  }

  /**
   * Animates the about section's drawn line on hover.
   */
  putHoverAbout() {
    gsap.to(this.aboutDrawnLine.nativeElement, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 0.2,
      ease: 'power2.out',
    });
  }

  /**
   * Reverses the about section's drawn line animation on hover out.
   */
  deleteHoverAbout() {
    gsap.to(this.aboutDrawnLine.nativeElement, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 0.2,
      ease: 'power2.in',
    });
  }

  /**
   * Animates the drawn line for the specified section on hover.
   * @param type The type of drawn line ('skillsDrawnLine', 'projectDrawnLine', or 'contactDrawnLine').
   */
  putHover(type: string) {
    const lineMap: { [key: string]: ElementRef } = {
      skillsDrawnLine: this.skillsDrawnLine,
      projectDrawnLine: this.projectDrawnLine,
      contactDrawnLine: this.contactDrawnLine,
    };

    const element = lineMap[type];
    if (!element) return;
    gsap.to(element.nativeElement, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  /**
   * Reverses the drawn line animation for the specified section on hover out.
   * @param type The type of drawn line ('skillsDrawnLine', 'projectDrawnLine', or 'contactDrawnLine').
   */
  deleteHover(type: string) {
    const lineMap: { [key: string]: ElementRef } = {
      skillsDrawnLine: this.skillsDrawnLine,
      projectDrawnLine: this.projectDrawnLine,
      contactDrawnLine: this.contactDrawnLine,
    };
    const element = lineMap[type];
    if (!element) return;
    gsap.to(element.nativeElement, {
      clipPath: 'inset(0% 100% 0% 0%)',
      duration: 0.3,
      ease: 'power2.in',
    });
  }

  /**
   * Animates the English language icon on hover.
   */
  putHoverEnglish() {
    gsap.to('.img-en', {
      clipPath: 'polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)',
      duration: 0.2,
      ease: 'power2.out',
    });
  }

  /**
   * Reverses the English language icon animation on hover out.
   */
  deleteHoverEnglish() {
    gsap.to('.img-en', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      ease: 'power2.in',
    });
  }

  /**
   * Reverses the English language icon animation on hover out.
   */
  putHoverGerman() {
    gsap.to('.img-de', {
      clipPath: 'polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)',
      duration: 0.2,
      ease: 'power2.out',
    });
  }

  /**
   * Reverses the German language icon animation on hover out.
   */
  deleteHoverGerman() {
    gsap.to('.img-de', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 0.2,
      ease: 'power2.in',
    });
  }

  /**
   * Switches the language to English and updates local storage and UI.
   */
  switchToEnglish() {
    gsap.to('.toggle-btn', {
      x: 0,
    });
    this.status = 'english';
    this.translate.use('en');
    localStorage.setItem('lang', 'en');
    localStorage.setItem('status', 'english');
    localStorage.setItem('toggleX', '0');
  }

  /**
   * Switches the language to German and updates local storage and UI.
   */
  switchToGerman() {
    this.status = 'german';
    this.translate.use('de');
    localStorage.setItem('lang', 'de');
    localStorage.setItem('status', 'german');
    localStorage.setItem('toggleX', '30');
    gsap.to('.toggle-btn', {
      x: 30,
    });
  }

  /**
   * Fills the background of the specified social icon using GSAP animation.
   * @param type The type of background fill ('bgFillGithub', 'bgFillLinkedin', or 'bgFillEmail').
   */
  fillBackground(type: string) {
    const lineMap: { [key: string]: ElementRef } = {
      bgFillGithub: this.bgFillGithub,
      bgFillLinkedin: this.bgFillLinkedin,
      bgFillEmail: this.bgFillEmail,
    };
    const element = lineMap[type];
    if (!element) return;
    gsap.to(element.nativeElement, {
      scaleX: 1,
      height: '100%',
      duration: 0.2,
      ease: 'power2.out',
    });
  }

  /**
   * Unfills the background of the specified social icon using GSAP animation.
   * @param type The type of background fill ('bgFillGithub', 'bgFillLinkedin', or 'bgFillEmail').
   */
  unfillBackground(type: string) {
    const lineMap: { [key: string]: ElementRef } = {
      bgFillGithub: this.bgFillGithub,
      bgFillLinkedin: this.bgFillLinkedin,
      bgFillEmail: this.bgFillEmail,
    };
    const element = lineMap[type];
    if (!element) return;
    gsap.to(element.nativeElement, {
      scaleX: 0,
      height: '0%',
      duration: 0.2,
      ease: 'power2.in',
    });
  }
}
