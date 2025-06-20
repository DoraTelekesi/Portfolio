import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  hovered = false;
  hoveredSectionName = false;
  hoveredSectionEmail = false;
  hoveredSectionDescription = false;
  isPpChecked = false;

  @ViewChild('legalDrawnLine')
  legalDrawnLine!: ElementRef<HTMLImageElement>;

  ngAfterViewInit(): void {
    gsap.set('.arrow', {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    this.animateArrow();
    gsap.set(this.legalDrawnLine.nativeElement, {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
  }

  putHover() {
    this.hovered = true;
    gsap.to(this.legalDrawnLine.nativeElement, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.2,
      ease: 'power2.out',
    });
  }

  deleteHover() {
    this.hovered = false;
    gsap.to(this.legalDrawnLine.nativeElement, {
      clipPath: 'inset(0% 100% 0% 0%)', // hide from top
      duration: 0.2,
      ease: 'power2.in',
    });
  }

  putHoverGitHub() {
    gsap.fromTo(
      '.github-icon',
      { x: 0, duration: 0.8, rotation: 0, opacity: 0 },
      { rotation: 360, x: 100, duration: 0.8, opacity: 1, ease: 'back' }
    );
  }

  removeHoverGitHub() {
    gsap.fromTo(
      '.github-icon',
      { x: 100, duration: 0.8, rotation: 0, opacity: 1 },
      { rotation: -360, x: 0, duration: 0.8, opacity: 0 }
    );
  }
  putHoverLinkedin() {
    gsap.fromTo(
      '.linkedin-icon',
      { x: 0, duration: 0.8, rotation: 0, opacity: 0 },
      { rotation: 360, x: 100, duration: 0.8, opacity: 1, ease: 'back' }
    );
  }

  removeHoverLinkedin() {
    gsap.fromTo(
      '.linkedin-icon',
      { x: 100, duration: 0.8, rotation: 0, opacity: 1 },
      { rotation: -360, x: 0, duration: 0.8, opacity: 0 }
    );
  }
  putHoverEmail() {
    gsap.fromTo(
      '.email-icon',
      { x: 0, duration: 0.8, rotation: 0, opacity: 0 },
      { rotation: 360, x: 100, duration: 0.8, opacity: 1, ease: 'back' }
    );
  }

  removeHoverEmail() {
    gsap.fromTo(
      '.email-icon',
      { x: 100, duration: 0.8, rotation: 0, opacity: 1 },
      { rotation: -360, x: 0, duration: 0.8, opacity: 0 }
    );
  }

  sectionHovered(section: string) {
    switch (section) {
      case 'name':
        this.hoveredSectionName = true;
        break;
      case 'email':
        this.hoveredSectionEmail = true;
        break;
      case 'description':
        this.hoveredSectionDescription = true;
        break;
    }
  }

  removeSectionHover(section: string) {
    switch (section) {
      case 'name':
        this.hoveredSectionName = false;
        break;
      case 'email':
        this.hoveredSectionEmail = false;
        break;
      case 'description':
        this.hoveredSectionDescription = false;
        break;
    }
  }

  animateArrow() {
    gsap.to('.arrow', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 2,
      ease: 'power2.out',
      repeat: -1,
      yoyo: true,
    });
  }

  checkPP() {
    if (!this.isPpChecked) {
      this.isPpChecked = true;
    } else {
      this.isPpChecked = false;
    }
  }
}
