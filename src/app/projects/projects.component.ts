import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements AfterViewInit {
  isUnderlined = false;
  isFloated = false;
  ngAfterViewInit(): void {
    gsap.set('.title-underline', {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    this.animateUnderline();
    gsap.set('.join-img', {
      y: 0,
      duration: 0,
    });
    this.floatingAnimation();
  }

  floatingAnimation() {
    setInterval(() => {
      if (this.isFloated === false) {
        this.isFloated = true;
        this.floatUp();
      } else if (this.isFloated === true) {
        this.isFloated = false;
        this.floatDown();
      }
    }, 2000);
  }

  floatUp() {
    gsap.to('.join-img', {
      y: 50,
      duration: 6,
      ease: 'power2.out',
    });
  }

  floatDown() {
    gsap.to('.join-img', {
      y: -20,
      duration: 6,
      ease: 'expo.out',
    });
  }
  animateUnderline() {
    setInterval(() => {
      if (this.isUnderlined == false) {
        this.lineVisible();
        this.isUnderlined = true;
      } else if (this.isUnderlined == true) {
        this.lineHidden();
      }
    }, 3000);
  }
  lineVisible() {
    gsap.to('.title-underline', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.6,
      ease: 'power2.out',
    });
  }

  lineHidden() {
    gsap.to('.title-underline', {
      clipPath: 'inset(0% 100% 0% 0%)',
      duration: 0.6,
      ease: 'power2.out',
    });
    this.isUnderlined = false;
  }
}
