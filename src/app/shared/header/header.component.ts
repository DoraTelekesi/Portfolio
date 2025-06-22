import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from './translate.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, ...sharedTranslateImports],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('aboutDrawnLine') aboutDrawnLine!: ElementRef<HTMLImageElement>;
  @ViewChild('skillsDrawnLine') skillsDrawnLine!: ElementRef<HTMLImageElement>;
  @ViewChild('projectDrawnLine')
  projectDrawnLine!: ElementRef<HTMLImageElement>;
  @ViewChild('contactDrawnLine')
  contactDrawnLine!: ElementRef<HTMLImageElement>;
  @ViewChild('en') en!: ElementRef<HTMLImageElement>;
  @ViewChild('de') de!: ElementRef<HTMLImageElement>;
  @ViewChild('toggleBtn') toggleBtn!: ElementRef<HTMLImageElement>;

  language: string = 'en';
  status: 'english' | 'german' = 'english';

  currentLang: 'en' | 'de' = 'en';

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService
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
}

// 'polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)' - from center to left and right
