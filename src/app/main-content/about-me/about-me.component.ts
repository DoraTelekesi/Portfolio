import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [RouterLink],
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
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100); // short delay ensures DOM is ready
        }
      }
    });
  }
  constructor(private route: ActivatedRoute) {}
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
