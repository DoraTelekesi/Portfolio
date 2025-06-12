import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule],
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

  ngAfterViewInit() {
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
    console.log(element.nativeElement);
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
    console.log(this.status);
  }
  switchToGerman() {
    gsap.to('.toggle-btn', {
      x: 30,
    });
    this.status = 'german';
    console.log(this.status);
  }
}

// 'polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)' - from center to left and right
