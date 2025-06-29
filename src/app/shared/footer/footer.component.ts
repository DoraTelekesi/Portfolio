import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  HostListener,
} from '@angular/core';
import { gsap } from 'gsap';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from '../../shared/header/translate.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, ...sharedTranslateImports],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  hovered = false;
  @ViewChild('btnbox') btnbox!: ElementRef;
  @ViewChild('legalDrawnLine')
  legalDrawnLine!: ElementRef<HTMLImageElement>;
  width?: number;

  /****
   * Handles window resize events and resets the rotate animation.
   * @param event The UIEvent triggered by window resize.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.resetRotateAnimation();
  }

  /**
   * Angular lifecycle hook called on component initialization.
   * Triggers the resize handler to set initial state.
   */
  ngOnInit(): void {
    this.onResize({ target: window } as unknown as UIEvent);
  }

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Angular lifecycle hook called after the component's view has been fully initialized.
   * Initializes GSAP animations and resets the rotate animation.
   */
  ngAfterViewInit(): void {
    gsap.set(this.legalDrawnLine.nativeElement, {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    setTimeout(() => {
      this.resetRotateAnimation();
    });
  }

  /**
   * Resets the rotation animation by updating the width property based on the button box element.
   */
  resetRotateAnimation() {
    if (this.btnbox && this.btnbox.nativeElement) {
      this.width = this.btnbox.nativeElement.offsetWidth - 30;
    }
  }
  /**
   * Animates the legal drawn line when hovered.
   */
  putHover() {
    this.hovered = true;
    gsap.to(this.legalDrawnLine.nativeElement, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.2,
      ease: 'power2.out',
    });
  }

  /**
   * Reverses the legal drawn line animation when hover ends.
   */
  deleteHover() {
    this.hovered = false;
    gsap.to(this.legalDrawnLine.nativeElement, {
      clipPath: 'inset(0% 100% 0% 0%)', // hide from top
      duration: 0.2,
      ease: 'power2.in',
    });
  }

  /**
   * Animates the GitHub icon on hover.
   */
  putHoverGitHub() {
    gsap.fromTo(
      '.github-icon',
      { x: 0, duration: 0.8, rotation: 0, opacity: 0 },
      { rotation: 360, x: this.width, duration: 0.8, opacity: 1, ease: 'back' }
    );
  }

  /**
   * Reverses the GitHub icon animation when hover ends.
   */
  removeHoverGitHub() {
    gsap.fromTo(
      '.github-icon',
      { x: this.width, duration: 0.8, rotation: 0, opacity: 1 },
      { rotation: -360, x: 0, duration: 0.8, opacity: 0 }
    );
  }

  /**
   * Animates the LinkedIn icon on hover.
   */
  putHoverLinkedin() {
    gsap.fromTo(
      '.linkedin-icon',
      { x: 0, duration: 0.8, rotation: 0, opacity: 0 },
      { rotation: 360, x: this.width, duration: 0.8, opacity: 1, ease: 'back' }
    );
  }

  /**
   * Reverses the LinkedIn icon animation when hover ends.
   */
  removeHoverLinkedin() {
    gsap.fromTo(
      '.linkedin-icon',
      { x: this.width, duration: 0.8, rotation: 0, opacity: 1 },
      { rotation: -360, x: 0, duration: 0.8, opacity: 0 }
    );
  }

  /**
   * Animates the Email icon on hover.
   */
  putHoverEmail() {
    gsap.fromTo(
      '.email-icon',
      { x: 0, duration: 0.8, rotation: 0, opacity: 0 },
      { rotation: 360, x: this.width, duration: 0.8, opacity: 1, ease: 'back' }
    );
  }

  /**
   * Reverses the Email icon animation when hover ends.
   */
  removeHoverEmail() {
    gsap.fromTo(
      '.email-icon',
      { x: this.width, duration: 0.8, rotation: 0, opacity: 1 },
      { rotation: -360, x: 0, duration: 0.8, opacity: 0 }
    );
  }
}
