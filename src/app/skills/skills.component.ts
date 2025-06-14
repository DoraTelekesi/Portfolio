import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements AfterViewInit {
  lineRotated = false;
  currentImage = 0;
  imageCache: {} = {};
  peelOffImagesOpen = [
    'assets/img/sticker-1.png',
    'assets/img/sticker-2.png',
    'assets/img/sticker-3.png',
  ];
  peelOffImagesClose = [
    'assets/img/sticker-3.png',
    'assets/img/sticker-2.png',
    'assets/img/sticker-1.png',
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

  // loadImages(arr: []) {
  //   arr.forEach((path: any) => {
  //     let img = new Image();
  //     img.src = path;
  //     this.imageCache[path] = img;
  //   });
  // }
}
