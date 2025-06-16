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
  hovered = false;
  spookyHovered = false;
  dabubbleHovered = false;
  private floatIntervalId: any;
  private floatTween: gsap.core.Tween | null = null;
  joinBtnHovered: boolean = false;
  spookyBtnHovered: boolean = false;
  dabubbleBtnHovered: boolean = false;

  ngAfterViewInit(): void {
    gsap.set('.title-underline', {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    this.animateUnderline();
    gsap.set('.pr-img', { y: 0, x: 0 });
    this.floatingAnimation();
  }

  floatingAnimation() {
    this.floatUp();
  }

  stopFloatingAnimation() {
    clearInterval(this.floatIntervalId);
    if (this.floatTween) {
      this.floatTween.kill();
    }
    gsap.set('.join-img', {
      y: 0,
      x: 0,
      duration: 0.5,
      ease: 'power0.out',
    });
  }

  floatUp() {
    this.floatTween = gsap.to('.join-img', {
      y: 40,
      duration: 2,
      ease: 'back.inOut',
      yoyo: true,
      repeat: -1,
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

  //Join image
  applyHover() {
    this.hovered = true;
    if (this.floatTween) {
      this.floatTween.kill();
      this.floatTween = null;
    }
    gsap.set('.join-img', { y: 50, x: 0 });
    gsap.to('.join-img', {
      scale: 1.2,
      duration: 0.5,
      ease: 'power2.out',
    });
  }

  removeHover() {
    this.hovered = false;
    gsap.set('.join-img', { y: 0, x: 0 });
    gsap.to('.join-img', {
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
    this.floatingAnimation();
  }
  // Dabubble img
  applyHoverDabubble() {
    this.dabubbleHovered = true;
    gsap.to('.dabubble-img', {
      scale: 1.2,
      duration: 0,
    });
  }

  removeHoverDabubble() {
    this.dabubbleHovered = false;
    gsap.to('.dabubble-img', {
      scale: 1,
      duration: 0,
    });
  }
  // Spooky image
  applyHoverSpooky() {
    this.spookyHovered = true;
    gsap.to('.spooky-img', {
      scale: 1.2,
      duration: 0,
    });
  }
  removeHoverSpooky() {
    this.spookyHovered = false;
    gsap.to('.spooky-img', {
      scale: 1,
      duration: 0,
    });
  }
  //Project detail buttons

  hoverBtnJoin() {
    this.joinBtnHovered = true;
    this.stopFloatingAnimation();
    this.applyHover();
  }

  hoverBtnSpooky() {
    if (this.spookyBtnHovered === false) {
      this.spookyBtnHovered = true;
      this.applyHoverSpooky();
    } else {
      this.spookyBtnHovered = false;
      this.removeHoverSpooky();
    }
  }

  // hoverBtnDabubble() {
  //   this.dabubbleBtnHovered = true;
  //   this.removeHoverDabubble();
  // }
}
