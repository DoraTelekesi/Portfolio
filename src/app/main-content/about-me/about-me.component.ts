import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent implements AfterViewInit {
  isUnderlined = false;
  ngAfterViewInit(): void {
    gsap.set('.underline', {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    this.animateUnderline();
  }

  animateUnderline() {
    gsap.to('.underline', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 2,
      ease: 'power2.out',
      repeat: -1,
      yoyo: true,
    });
  }
}
