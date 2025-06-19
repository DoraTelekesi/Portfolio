import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements AfterViewInit {
  lineRotated = false;
  currentImage = 0;
  imageCache: { [key: string]: HTMLImageElement } = {};
  img!: HTMLImageElement;
  showImage1: boolean = true;
  revealed = false;
  @ViewChildren('stickerImages') stickerImages!: QueryList<
    ElementRef<HTMLImageElement>
  >;

  peelOffImagesOpen = [
    'assets/img/sticker-1.png',
    'assets/img/sticker-2.png',
    'assets/img/sticker-3.png',
  ];

  ngAfterViewInit(): void {
    gsap.set('.skill-title-line', {
      rotation: 0,
      scale: 1,
      opacity: 1,
    });
    this.rotateDrawnLine();
  }

  rotateDrawnLine() {
    setInterval(() => {
      if (this.lineRotated == false) {
        gsap.to('.skill-title-line', {
          rotation: -45,
          scale: 0.5,
          opacity: 0,
          duration: 0.2,
          transformOrigin: 'right bottom',
        });
        this.lineRotated = true;
      } else if (this.lineRotated == true) {
        gsap.to('.skill-title-line', {
          rotation: 0,
          duration: 0.2,
          scale: 1,
          opacity: 1,
          transformOrigin: 'right bottom',
        });
        this.lineRotated = false;
      }
    }, 2000);
  }

  revealImages() {
    const images = this.stickerImages.toArray().map((el) => el.nativeElement);

    if (!this.revealed) {
      // Reveal: show image 2, then 3
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
      this.revealed = true;
    } else {
      // Un-reveal: hide image 3, then image 2
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
      this.revealed = false;
    }
  }
}
