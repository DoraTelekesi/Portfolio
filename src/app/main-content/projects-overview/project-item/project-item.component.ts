import { NgClass } from '@angular/common';

import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  ElementRef,
  SimpleChanges,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from '../../../shared/header/translate.module';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [NgClass, RouterModule, ...sharedTranslateImports],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss',
})
export class ProjectItemComponent implements AfterViewInit {
  @Input() project = {
    id: 'Spooky-Town',
    title: 'Spooky Town',
    description: 'PROJECTS_OVERVIEW.SPOOKY_TEXT',
    img: 'assets/img/SpookyTown.png',
    imgClass: 'spooky-img',
    imgId: 'spooky-img',
    path: 'Projects/Spooky-Town',
  };
  translatedDescription = '';
  isFloated = false;
  hoveredImg: boolean = false;
  public floatIntervalId: any;
  public floatTween: gsap.core.Tween | null = null;
  @ViewChild('imageElement', { static: true })
  imageElement!: ElementRef<HTMLImageElement>;

  /**
   * Angular lifecycle hook called when any data-bound property of a directive changes.
   * Updates the translated description if the project input changes.
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      this.setTranslatedDescription();
    }
  }

  /**
   * Angular lifecycle hook called after the component's view has been fully initialized.
   * Sets the initial state of the title underline, starts the floating animation, and sets the translated description.
   */
  ngAfterViewInit(): void {
    gsap.set('.title-underline', {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    this.floatingAnimation();
    this.setTranslatedDescription();
  }

  constructor(private translate: TranslateService) {}

  /**
   * Sets the translated description for the project using ngx-translate.
   * @private
   */
  private setTranslatedDescription() {
    this.translate
      .get(this.project.description)
      .subscribe((res) => (this.translatedDescription = res));
  }

  /**
   * Handles mouse enter event on the project image.
   * Animates the image scale up.
   */
  onImageEnter() {
    this.hoveredImg = true;
    const el = this.imageElement.nativeElement;
    gsap.killTweensOf(el);
    let scaleValue = 1.1;
    let duration = 0.25;
    this.stopFloatingAnimation();
    this.animateHover(el, scaleValue, duration);
  }

  /**
   * Animates the hover effect on the image.
   * @param el The image element to animate.
   * @param sV The scale value to animate to.
   * @param d The duration of the animation.
   */
  animateHover(el: HTMLImageElement, sV: number, d: number) {
    gsap.to(el, {
      scale: sV,
      d,
      ease: 'power2.out',
    });
  }

  /**
   * Handles mouse leave event on the project image.
   * Animates the image scale down and restarts floating animation for join image.
   */
  onImageLeave() {
    requestAnimationFrame(() => {
      const el = this.imageElement.nativeElement;
      const isHovered =
        el.matches(':hover') || el.parentElement?.matches(':hover');
      if (isHovered) return;
      this.hoveredImg = false;
      gsap.killTweensOf(el);
      gsap.to(el, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.inOut',
      });
      if (this.project.imgId === 'join-img') {
        this.floatingAnimation();
      }
    });
  }

  /**
   * Returns the native image element.
   * @returns The native HTMLImageElement.
   */
  getImageElement(): HTMLImageElement {
    return this.imageElement.nativeElement;
  }

  /**
   * Starts the floating animation for the join image.
   */
  floatingAnimation() {
    this.floatUp();
  }

  /**
   * Stops the floating animation and resets the join image position.
   */
  stopFloatingAnimation() {
    clearInterval(this.floatIntervalId);
    if (this.floatTween) {
      this.floatTween.kill();
      this.floatTween = null;
    }
    if (this.project.imgId === 'join-img') {
      gsap.to(this.imageElement.nativeElement, {
        y: -30,
        x: 0,
        duration: 0.1,
        ease: 'power0.out',
      });
    }
  }

  /**
   * Animates the join image floating up and down infinitely.
   */
  floatUp() {
    if (this.project.imgId !== 'join-img') return;
    if (this.floatTween) {
      this.floatTween.kill();
    }
    this.floatTween = gsap.to(this.imageElement.nativeElement, {
      y: 40,
      duration: 2,
      ease: 'back.inOut',
      yoyo: true,
      repeat: -1,
    });
  }

  /**
   * Stops event propagation for the given event.
   * @param event The event to stop propagation for.
   */
  onEvent(event: any) {
    event.stopPropagation();
  }
}
