import { Component, Input } from '@angular/core';
import { ReferenceItemComponent } from './reference-item/reference-item.component';
import { gsap } from 'gsap';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from '../../shared/header/translate.module';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [ReferenceItemComponent, ...sharedTranslateImports],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss',
})
export class ReferencesComponent {
  /**
   * Angular lifecycle hook called after the component's view has been fully initialized.
   * Sets the initial state of the drawn arrow and starts the arrow animation.
   */
  ngAfterViewInit(): void {
    gsap.set('.drawn-arrow', {
      clipPath: 'inset(0% 0% 0% 100%)',
    });
    this.animateArrow();
  }
  constructor(private translate: TranslateService) {}

  /**
   * Animates the drawn arrow using GSAP with a repeating yoyo effect.
   */
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
