import { Component, Input } from '@angular/core';
import { ReferenceItemComponent } from './reference-item/reference-item.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [ReferenceItemComponent],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss',
})
export class ReferencesComponent {
  ngAfterViewInit(): void {
    gsap.set('.drawn-arrow', {
      clipPath: 'inset(0% 0% 0% 100%)',
    });
    this.animateArrow();
  }

  animateArrow() {
    gsap.to('.drawn-arrow', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 2,
      ease: 'power2.out',
      repeat: -1,
      yoyo: true,
    });
  }
}
