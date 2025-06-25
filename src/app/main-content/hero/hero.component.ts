import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from '../../shared/header/translate.module';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, ...sharedTranslateImports],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('bgFillGithub') bgFillGithub!: ElementRef;
  @ViewChild('bgFillLinkedin') bgFillLinkedin!: ElementRef;
  @ViewChild('bgFillEmail') bgFillEmail!: ElementRef;
  hovered = false;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}

  /**
   * Angular lifecycle hook called after the component's view has been fully initialized.
   * Initializes GSAP animations for the waving hand and background fills, and sets up navigation to fragments.
   */
  ngAfterViewInit() {
    gsap.set('.wav-hand', { x: 50, duration: 0.8, rotation: 0, opacity: 0 });
    this.setBackgroundFillGh();
    this.setBackgroundFillLi();
    this.setBackgroundFillEm();
    this.navigate();
  }

  /**
   * Subscribes to route fragment changes and scrolls smoothly to the corresponding element if present.
   */
  navigate() {
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

  /**
   * Sets the initial background fill for the GitHub element to 0% height.
   */
  setBackgroundFillGh() {
    gsap.set(this.bgFillGithub.nativeElement, {
      height: '0%',
      duration: 0.4,
      ease: 'power2.out',
    });
  }

  /**
   * Sets the initial background fill for the LinkedIn element to 0% height.
   */
  setBackgroundFillLi() {
    gsap.set(this.bgFillLinkedin.nativeElement, {
      height: '0%',
      duration: 0.4,
      ease: 'power2.out',
    });
  }

  /**
   * Sets the initial background fill for the Email element to 0% height.
   */
  setBackgroundFillEm() {
    gsap.set(this.bgFillEmail.nativeElement, {
      height: '0%',
      duration: 0.4,
      ease: 'power2.out',
    });
  }

  /**
   * Handles hover event: animates the waving hand and toggles welcome text opacity.
   */
  putHover() {
    this.hovered = true;
    gsap.fromTo(
      '.wav-hand',
      { x: 50, duration: 0.8, rotation: 0, opacity: 0 },
      { rotation: 360, x: 190, duration: 0.8, opacity: 1, ease: 'back' }
    );
    gsap.to('.world-welc', { opacity: 0, duration: 0.4 });
    gsap.to('.name-welc', { opacity: 1, duration: 0.4 });
  }

  /**
   * Handles mouse leave event: reverses the waving hand animation and toggles welcome text opacity.
   */
  deleteHover() {
    this.hovered = false;
    gsap.fromTo(
      '.wav-hand',
      { x: 190, duration: 0.6, rotation: 0, opacity: 1 },
      { rotation: -360, x: 50, duration: 0.6, opacity: 0 }
    );
    gsap.to('.name-welc', { opacity: 0, duration: 0.4 });
    gsap.to('.world-welc', { opacity: 1, duration: 0.4 });
  }

  /**
   * Fills the background of the specified element type using GSAP animation.
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
   * Unfills the background of the specified element type using GSAP animation.
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
