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
    setInterval(() => {
      if (this.isUnderlined == false) {
        gsap.to('.underline', {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.6,
          ease: 'power2.out',
        });
        this.isUnderlined = true;
      } else if (this.isUnderlined == true) {
        gsap.to('.underline', {
          clipPath: 'inset(0% 100% 0% 0%)',
          duration: 0.6,
          ease: 'power2.out',
        });
        this.isUnderlined = false;
      }
    }, 3000);
  }
}
