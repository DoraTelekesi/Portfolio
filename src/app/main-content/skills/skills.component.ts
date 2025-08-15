import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChildren,
  ViewChild,
  QueryList,
  OnDestroy,
} from '@angular/core';
import { gsap } from 'gsap';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from '../../shared/header/translate.module';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ...sharedTranslateImports],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  lineRotated = false;
  currentImage = 0;
  imageCache: { [key: string]: HTMLImageElement } = {};
  img!: HTMLImageElement;
  showImage1: boolean = true;
  revealed = false;
  width!: number;
  private rotateInterval?: any;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}

  @ViewChildren('stickerImages') stickerImages!: QueryList<
    ElementRef<HTMLImageElement>
  >;
  @ViewChild('title') title!: ElementRef;

  peelOffImagesOpen = [
    'assets/img/sticker-1.png',
    'assets/img/sticker-2.png',
    'assets/img/sticker-3.png',
  ];

  /**
   * Angular lifecycle hook called after the component's view has been fully initialized.
   * Sets the initial state of the skill title line, starts the rotation animation, and handles fragment navigation.
   */
  ngAfterViewInit(): void {
    gsap.set('.skill-title-line', {
      rotation: 0,
      scale: 1,
      opacity: 1,
    });
    this.rotateDrawnLine();
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
   * Resets the rotation animation by updating the width property based on the title element.
   */
  resetRotateAnimation() {
    if (this.title && this.title.nativeElement) {
      this.width = this.title.nativeElement.offsetWidth;
    }
  }

  /**
   * Starts an interval that alternates the skill title line between faded and revealed states every 2 seconds.
   * Uses fadeDrawing and revealDrawing to animate the line.
   */
  rotateDrawnLine() {
    this.rotateInterval = setInterval(() => {
      if (this.lineRotated == false) {
        this.fadeDrawing();
        this.lineRotated = true;
      } else if (this.lineRotated == true) {
        this.revealDrawing();
        this.lineRotated = false;
      }
    }, 2000);
  }

  /**
   * Angular lifecycle hook called when the component is destroyed.
   * Cleans up the rotation interval to prevent memory leaks and GSAP errors.
   */
  ngOnDestroy(): void {
    if (this.rotateInterval) {
      clearInterval(this.rotateInterval);
    }
  }

  /**
   * Animates the skill title line to a faded, rotated, and scaled-down state.
   */
  fadeDrawing() {
    const element = document.querySelector('.skill-title-line');
    if (element) {
      gsap.to('.skill-title-line', {
        rotation: -45,
        scale: 0.5,
        opacity: 0,
        duration: 0.2,
        transformOrigin: 'right bottom',
      });
    }
  }

  /**
   * Animates the skill title line back to its original, fully visible state.
   */
  revealDrawing() {
    const element = document.querySelector('.skill-title-line');
    if (element) {
      gsap.to('.skill-title-line', {
        rotation: 0,
        duration: 0.2,
        scale: 1,
        opacity: 1,
        transformOrigin: 'right bottom',
      });
    }
  }

  /**
   * Toggles the reveal state of sticker images.
   * Reveals or hides additional stickers with animation.
   */
  revealImages() {
    const images = this.stickerImages.toArray().map((el) => el.nativeElement);
    if (!this.revealed) {
      this.showSticker(images);
      this.revealed = true;
    } else {
      this.removeSticker(images);
      this.revealed = false;
    }
  }

  /**
   * Animates hiding of the additional sticker images.
   * @param images Array of HTMLImageElement to animate.
   */
  removeSticker(images: HTMLImageElement[]) {
    gsap.to(images[2], {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        gsap.to(images[1], {
          opacity: 0,
          duration: 0.2,
        });
      },
    });
  }

  /**
   * Animates revealing of the additional sticker images.
   * @param images Array of HTMLImageElement to animate.
   */
  showSticker(images: HTMLImageElement[]) {
    gsap.to(images[1], {
      opacity: 1,
      duration: 0.2,
      onComplete: () => {
        gsap.to(images[2], {
          opacity: 1,
          duration: 0.2,
        });
      },
    });
  }
}
