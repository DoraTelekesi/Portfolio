import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ActivatedRoute } from '@angular/router';
import { sharedTranslateImports } from '../../shared/header/translate.module';
import { ScrollService } from '../../services/scroll.service';
import { SplitText, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(SplitText, ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [...sharedTranslateImports],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('bgFillGithub') bgFillGithub!: ElementRef;
  @ViewChild('bgFillLinkedin') bgFillLinkedin!: ElementRef;
  @ViewChild('bgFillEmail') bgFillEmail!: ElementRef;
  hovered = false;
  @ViewChild('titleWrapper', { static: false }) titleWrapper!: ElementRef;
  @ViewChild('titleWrapper2', { static: false }) titleWrapper2!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private scrollService: ScrollService
  ) {}

  /**
   * Navigates smoothly to the specified section using the ScrollService.
   * @param section The section ID or name to scroll to.
   */
  goToSection(section: string) {
    this.scrollService.scrollToSection(section);
  }

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
    this.splitTitleFirstRow();
    this.splitTitleSecondRow();
    setTimeout(() => this.changeTextTitleFirst(), 50);
    setTimeout(() => this.changeTextTitleSecond(), 50);
  }

  /**
   * Splits the first row of the title into individual character spans and animates them using GSAP.
   * Adds classes to each character and triggers the timeline animation.
   */
  splitTitleFirstRow() {
    requestAnimationFrame(() => {
      const split = SplitText.create('.t-1', { type: 'chars' });
      split.chars.forEach((char, i) => {
        char.classList.add('char-span', `char-${i}`, 'letter');
        gsap.set(char, { y: 0, opacity: 1, rotation: 0 });
      });
      const tl = gsap.timeline({ paused: true });
      this.createTimelineFirst(split, tl);
      tl.play();
      tl.eventCallback('onComplete', () => {
        this.onAnimationCompleteFirst();
      });
      this.createScrollTriggerFirst(tl);
    });
  }

  /**
   * Creates a GSAP timeline animation for the first row of split title characters.
   * @param split The SplitText instance containing character elements.
   * @param tl The GSAP timeline instance.
   */
  createTimelineFirst(split: any, tl: any) {
    tl.from(split.chars, {
      y: -300,
      autoAlpha: 0,
      stagger: 0.2,
      rotation: 'random(-180,180)',
      ease: 'back.out',
      duration: 1,
    });
  }

  /**
   * Callback executed when the first row animation completes. Adds a class and clears transform on the first character.
   */
  onAnimationCompleteFirst() {
    document.querySelector('.t-1')?.classList.add('hover-ready');
    const char0 = document.querySelector('.char-0') as HTMLElement;
    if (char0) {
      gsap.set(char0, { clearProps: 'transform' });
    }
  }

  /**
   * Creates a ScrollTrigger for the first row title animation.
   * @param tl The GSAP timeline instance.
   */
  createScrollTriggerFirst(tl: any) {
    ScrollTrigger.create({
      trigger: '.t-1',
      start: 'top 80%',
      end: 'bottom top',
      onLeave: () => tl.pause(0),
      onEnterBack: () => tl.restart(),
    });
  }

  /**
   * Changes the text case for each letter in the first row title and sets a data-alt attribute.
   */
  changeTextTitleFirst() {
    const letters = this.titleWrapper.nativeElement.querySelectorAll('.letter');
    letters.forEach((el: HTMLElement) => {
      const original = el.textContent?.trim() || '';
      const altCase =
        original === original.toUpperCase()
          ? original.toLowerCase()
          : original.toUpperCase();
      el.setAttribute('data-alt', altCase);
    });
  }

  /**
   * Splits the second row of the title into individual character spans and animates them using GSAP.
   * Adds classes to each character and triggers the timeline animation.
   */
  splitTitleSecondRow() {
    let split = SplitText.create('.t-2', { type: 'chars' });
    const tl = gsap.timeline({ paused: true });
    this.createTimelineSecond(split, tl);
    split.chars.forEach((char, i) => {
      const original = char.textContent || '';
      char.classList.add('char-span', `char-${i}`, 'letter');
    });
    tl.play();
    tl.eventCallback('onComplete', () => {
      this.onAnimationCompleteSecond();
    });
    this.createScrollTriggerSecond(tl);
  }

  /**
   * Creates a GSAP timeline animation for the second row of split title characters.
   * @param split The SplitText instance containing character elements.
   * @param tl The GSAP timeline instance.
   */
  createTimelineSecond(split: any, tl: any) {
    tl.from(split.chars, {
      y: 300,
      autoAlpha: 0,
      stagger: 0.2,
      rotation: 'random(-180,180)',
      ease: 'back.out',
      duration: 1,
    });
  }

  /**
   * Callback executed when the second row animation completes. Adds a class and clears transform on the first character.
   */
  onAnimationCompleteSecond() {
    document.querySelector('.t-2')?.classList.add('hover-ready');
    const char0 = document.querySelector('.char-0') as HTMLElement;
    if (char0) {
      gsap.set(char0, { clearProps: 'transform' });
    }
  }

  /**
   * Creates a ScrollTrigger for the second row title animation.
   * @param tl The GSAP timeline instance.
   */
  createScrollTriggerSecond(tl: any) {
    ScrollTrigger.create({
      trigger: '.t-2',
      start: 'top 80%',
      end: 'bottom top',
      onLeave: () => tl.pause(0),
      onEnterBack: () => tl.restart(),
    });
  }

  /**
   * Changes the text case for each letter in the second row title and sets a data-alt attribute.
   */
  changeTextTitleSecond() {
    const letters2 =
      this.titleWrapper2.nativeElement.querySelectorAll('.letter');
    letters2.forEach((el: HTMLElement) => {
      const original = el.textContent?.trim() || '';
      const altCase =
        original === original.toUpperCase()
          ? original.toLowerCase()
          : original.toUpperCase();
      el.setAttribute('data-alt', altCase);
    });
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
