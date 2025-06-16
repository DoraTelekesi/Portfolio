import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { gsap } from 'gsap';
@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss',
})
export class ProjectItemComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() imageAlt: string = '';
  @Input() imageExtraClass: string = '';

  isUnderlined = false;
  isFloated = false;
  hovered: boolean = false;
  private floatIntervalId: any;
  private floatTween: gsap.core.Tween | null = null;


  ngAfterViewInit(): void {
    gsap.set('.title-underline', {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    this.animateUnderline();
    gsap.set('.join-img', { y: 0, x: 0 });
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
      y: 90,
      duration: 1,
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

  applyHover(type: string) {
    if (type === 'spooky-img') {
      this.hovered = true;
      gsap.set('.spooky-img', {
        scale: 1.2,
        duration: 0.5,
      });
    } else if (type === 'dabubble-img') {
      this.hovered = true;
      gsap.set('.dabubble-img', {
        scale: 1.2,
        duration: 0.5,
      });
    } else if (type === 'join-img') {
      this.hovered = true;
      if (this.floatTween) {
        this.floatTween.kill();
        this.floatTween = null;
      }

      // gsap.set('.join-img', { y: 50, x: 0 });
      gsap.set('.join-img', {
        y: 50,
        scale: 1.2,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto', // avoids conflicts with floatTween
        immediateRender: false, // makes GSAP wait before rendering
      });
    }
  }
  removeHover(type: string) {
    if (type === 'spooky-img') {
      this.hovered = false;
      gsap.set('.spooky-img', {
        scale: 1,
        duration: 0.5,
      });
    } else if (type === 'dabubble-img') {
      this.hovered = false;
      gsap.set('.dabubble-img', {
        scale: 1,
        duration: 0.5,
      });
    } else if (type === 'join-img') {
      this.hovered = false;
      // gsap.set('.join-img', { y: 0, x: 0 });
      gsap.set('.join-img', {
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
        immediateRender: false,
      });
      this.floatingAnimation();
    }
  }

  onEvent(event: any) {
    event.stopPropagation();
  }
}
