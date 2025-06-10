import { Component } from '@angular/core';
import { gsap } from 'gsap';

import { CustomEase } from 'gsap/CustomEase';
// CustomBounce requires CustomEase
import { CustomBounce } from 'gsap/CustomBounce';

gsap.registerPlugin(CustomEase, CustomBounce);
CustomBounce.create('myBounce', {
  strength: 0.2,
  squash: 2,
  squashID: 'myBounce-squash',
});

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  hovered = false;

  putHover() {
    this.hovered = true;
    gsap.fromTo(
      '.wav-hand',
      { x: 154, duration: 0.6, rotation: 0, opacity: 0 },
      { rotation: 360, x: 210, duration: 0.6, opacity: 1, ease: 'myBounce' }
    );
    gsap.to('.world-welc', { opacity: 0, duration: 0.4 });
    gsap.to('.name-welc', { opacity: 1, duration: 0.4 });
  }

  deleteHover() {
    this.hovered = false;
    gsap.fromTo(
      '.wav-hand',
      { x: 220, duration: 0.6, rotation: 0, opacity: 1 },
      { rotation: -360, x: 128, duration: 0.6, opacity: 0 }
    );
    gsap.to('.name-welc', { opacity: 0, duration: 0.4 });
    gsap.to('.world-welc', { opacity: 1, duration: 0.4 });
  }
}
