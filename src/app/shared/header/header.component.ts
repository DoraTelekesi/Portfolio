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
  private routerSub = Subscription.EMPTY;
  respMenuOpened = false;

  /** Closes the responsive navigation menu */
  closeRespMenu() {
    this.respMenuOpened = false;
  }

  /** Opens the responsive navigation menu */
  openRespMenu() {
    this.respMenuOpened = true;
  }

  /** Lifecycle hook for component initialization */
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

  /** Cleanup when the component is destroyed */
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
    if (savedStatus) this.status = savedStatus;
    this.getTranslationStatusFromLocalStorage(savedLang);
  }

  /**
   * Scrolls to the given section using the scroll service and closes the menu
   * @param section Section ID or name to scroll to
   */
  goToSection(section: string) {
    this.scrollService.scrollToSection(section);
    this.respMenuOpened = false;
  }

  /**
   * Applies language preference from local storage
   * @param savedLang Previously saved language
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

  /** Toggles between English and German language */
  onToggleLanguage(): void {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
    this.translate.use(this.currentLang);
    localStorage.setItem('lang', this.currentLang);
  }

  /** Lifecycle hook after component view initialization */
  ngAfterViewInit() {
    this.serBackgroundFill();
    const savedX = localStorage.getItem('toggleX');
    if (savedX)
      gsap.set(this.toggleBtn.nativeElement, { x: parseFloat(savedX) });
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

  /** Initializes social icons background animation */
  serBackgroundFill() {
    ['bgFillGithub', 'bgFillLinkedin', 'bgFillEmail'].forEach((key) => {
      const element = this[key as keyof HeaderComponent] as ElementRef;
      gsap.set(element.nativeElement, {
        height: '0%',
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  }

  /** Initializes drawn line GSAP clip paths */
  setDrawnLineElements() {
    gsap.set(this.aboutDrawnLine.nativeElement, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    });
    [
      this.skillsDrawnLine,
      this.projectDrawnLine,
      this.contactDrawnLine,
    ].forEach((el) => {
      gsap.set(el.nativeElement, { clipPath: 'inset(0% 100% 0% 0%)' });
    });
    [this.en, this.de].forEach((el) => {
      gsap.set(el.nativeElement, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      });
    });
  }

  /** Hover animation for About section */
  putHoverAbout() {
    gsap.to(this.aboutDrawnLine.nativeElement, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 0.2,
      ease: 'power2.out',
    });
  }

  /** Reverses hover animation for About section */
  deleteHoverAbout() {
    gsap.to(this.aboutDrawnLine.nativeElement, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 0.2,
      ease: 'power2.in',
    });
  }

  /** Hover animation for line sections
   * @param type Drawn line section name
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

  /** Reverse animation for drawn lines
   * @param type Drawn line section name
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

  /** Hover effect for English toggle */
  putHoverEnglish() {
    gsap.to('.img-en', {
      clipPath: 'polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)',
      duration: 0.2,
      ease: 'power2.out',
    });
  }

  /** Unhover effect for English toggle */
  deleteHoverEnglish() {
    gsap.to('.img-en', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      ease: 'power2.in',
    });
  }

  /** Hover effect for German toggle */
  putHoverGerman() {
    gsap.to('.img-de', {
      clipPath: 'polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)',
      duration: 0.2,
      ease: 'power2.out',
    });
  }

  /** Unhover effect for German toggle */
  deleteHoverGerman() {
    gsap.to('.img-de', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 0.2,
      ease: 'power2.in',
    });
  }

  /**
   * Switches language and updates UI state
   * @param lang Language code: 'en' or 'de'
   */
  switchLanguage(lang: 'en' | 'de') {
    const isEnglish = lang === 'en';
    const x = isEnglish ? 0 : 30;
    this.status = isEnglish ? 'english' : 'german';
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    localStorage.setItem('status', this.status);
    localStorage.setItem('toggleX', x.toString());
    gsap.to('.toggle-btn', { x });
  }

  /**
   * Toggles the current language between English and German.
   * Updates translation service, language status, and persists the change in localStorage.
   * Also animates the toggle button position using GSAP.
   */
  toggleLanguage() {
    const newLang = this.status === 'german' ? 'en' : 'de';
    this.switchLanguage(newLang);
  }

  /** Animate background fill for social icon
   * @param type Element ref name
   */
  fillBackground(type: string) {
    const element = this[type as keyof HeaderComponent] as ElementRef;
    if (!element) return;
    gsap.to(element.nativeElement, {
      scaleX: 1,
      height: '100%',
      duration: 0.2,
      ease: 'power2.out',
    });
  }

  /** Animate background unfill for social icon
   * @param type Element ref name
   */
  unfillBackground(type: string) {
    const element = this[type as keyof HeaderComponent] as ElementRef;
    if (!element) return;
    gsap.to(element.nativeElement, {
      scaleX: 0,
      height: '0%',
      duration: 0.2,
      ease: 'power2.in',
    });
  }
}
