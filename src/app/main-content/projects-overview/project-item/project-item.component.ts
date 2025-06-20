import { NgClass } from '@angular/common';

import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [NgClass, RouterModule],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss',
})
export class ProjectItemComponent implements AfterViewInit {
  @Input() project = {
    id:"Spooky-Town",
    title: 'Spooky Town',
    description:
      'Jump, tun and throw game based on object-orientated approach. Help Skeleton Warrior to find coins and bottles to fight against the enemies.',
    img: 'assets/img/SpookyTown.png',
    imgClass: 'spooky-img',
    imgId: 'spooky-img',
    path:'Projects/Spooky-Town'
  };

  isFloated = false;
  hoveredImg: boolean = false;
  public floatIntervalId: any;
  public floatTween: gsap.core.Tween | null = null;

  @ViewChild('imageElement', { static: true })
  imageElement!: ElementRef<HTMLImageElement>;

  ngAfterViewInit(): void {
    gsap.set('.title-underline', {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    this.floatingAnimation();
  }

  onImageEnter() {
    this.hoveredImg = true;
    const el = this.imageElement.nativeElement;
    gsap.killTweensOf(el); // Kill any existing scale tweens on this element
    let scaleValue = 1.1; // Apply custom scale based on ID
    let duration = 0.2;
    if (this.project.imgId === 'spooky-img') {
      scaleValue = 1.15;
      duration = 0.25;
    } else if (this.project.imgId === 'dabubble-img') {
      scaleValue = 1.2;
      duration = 0.3;
    } else if (this.project.imgId === 'join-img') {
      this.stopFloatingAnimation();
      scaleValue = 1.1;
      duration = 0.2;
    }
    this.animateHover(el, scaleValue, duration);
  }

  animateHover(el: HTMLImageElement, sV: number, d: number) {
    gsap.to(el, {
      scale: sV,
      d,
      ease: 'power2.out',
    });
  }

  onImageLeave() {
    this.hoveredImg = false;
    const el = this.imageElement.nativeElement;
    gsap.killTweensOf(el); // Stop any current scale tweens
    gsap.to(el, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.inOut',
    });
    if (this.project.imgId === 'join-img') {
      this.floatingAnimation();
    }
  }

  getImageElement(): HTMLImageElement {
    return this.imageElement.nativeElement;
  }

  floatingAnimation() {
    this.floatUp();
  }

  stopFloatingAnimation() {
    clearInterval(this.floatIntervalId);
    if (this.floatTween) {
      this.floatTween.kill();
    }
    gsap.to('.join-img', {
      y: 0,
      x: 0,
      duration: 0.1,
      ease: 'power0.out',
    });
  }

  floatUp() {
    this.floatTween = gsap.to('.join-img', {
      y: 80,
      duration: 2,
      ease: 'back.inOut',
      yoyo: true,
      repeat: -1,
    });
  }

  onEvent(event: any) {
    event.stopPropagation();
  }
}
