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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, ...sharedTranslateImports],
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

  closeRespMenu() {
    this.respMenuOpened = false;
  }
  openRespMenu() {
    this.respMenuOpened = true;
  }

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
        console.log('Current URL:', this.currentUrl);
        console.log(this.currentUrl.includes('Projects'));
      });
  }
  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private router: Router
  ) {
    const savedLang = localStorage.getItem('lang');
    const savedStatus = localStorage.getItem('status') as 'english' | 'german';
    if (savedStatus) {
      this.status = savedStatus;
    }

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

  onToggleLanguage(): void {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
    this.translate.use(this.currentLang);
    localStorage.setItem('lang', this.currentLang);
  }

  ngAfterViewInit() {
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
    const savedX = localStorage.getItem('toggleX');
    if (savedX) {
      gsap.set(this.toggleBtn.nativeElement, { x: parseFloat(savedX) });
    }
    // Initialize clip-paths to hidden using GSAP
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
  putHoverAbout() {
    gsap.to(this.aboutDrawnLine.nativeElement, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // fully visible
      duration: 0.2,
      ease: 'power2.out',
    });
  }

  deleteHoverAbout() {
    gsap.to(this.aboutDrawnLine.nativeElement, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', // hide from top
      duration: 0.2,
      ease: 'power2.in',
    });
  }

  putHover(type: string) {
    const lineMap: { [key: string]: ElementRef } = {
      skillsDrawnLine: this.skillsDrawnLine,
      projectDrawnLine: this.projectDrawnLine,
      contactDrawnLine: this.contactDrawnLine,
    };

    const element = lineMap[type];
    if (!element) return;
    gsap.to(element.nativeElement, {
      clipPath: 'inset(0% 0% 0% 0%)', // fully visible
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  deleteHover(type: string) {
    const lineMap: { [key: string]: ElementRef } = {
      skillsDrawnLine: this.skillsDrawnLine,
      projectDrawnLine: this.projectDrawnLine,
      contactDrawnLine: this.contactDrawnLine,
    };

    const element = lineMap[type];
    if (!element) return;

    gsap.to(element.nativeElement, {
      clipPath: 'inset(0% 100% 0% 0%)', // hide from top
      duration: 0.3,
      ease: 'power2.in',
    });
  }

  putHoverEnglish() {
    gsap.to('.img-en', {
      clipPath: 'polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)', // fully visible
      duration: 0.2,
      ease: 'power2.out',
    });
  }

  deleteHoverEnglish() {
    gsap.to('.img-en', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', // hide from top
      duration: 0.2,
      ease: 'power2.in',
    });
  }

  putHoverGerman() {
    gsap.to('.img-de', {
      clipPath: 'polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)', // fully visible
      duration: 0.2,
      ease: 'power2.out',
    });
  }

  deleteHoverGerman() {
    gsap.to('.img-de', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', // hide from top
      duration: 0.2,
      ease: 'power2.in',
    });
  }

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

// 'polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)' - from center to left and right
