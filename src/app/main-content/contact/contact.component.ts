import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { gsap } from 'gsap';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from '../../shared/header/translate.module';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ...sharedTranslateImports,
    ContactFormComponent,
    RouterModule,
    FooterComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  hovered = false;
  showLogMsg = false;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Angular lifecycle hook called after the component's view has been fully initialized.
   * Animates the arrow and sets its initial clipPath using GSAP.
   */
  ngAfterViewInit(): void {
    this.animateArrow();
    gsap.set('.arrow', {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
  }

  /**
   * Handles the form submission event from the contact form.
   * Displays a log message for 2 seconds after the form is submitted.
   * @param data The data submitted from the form.
   */
  onFormSubmitted(data: any) {
    this.showLogMsg = true;
    setTimeout(() => {
      this.showLogMsg = false;
    }, 2000);
  }

  /**
   * Animates the arrow element using GSAP with a repeating yoyo effect.
   */
  animateArrow() {
    gsap.to('.arrow', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 2,
      ease: 'power2.out',
      repeat: -1,
      yoyo: true,
    });
  }

  // /**
  //  * Navigates to the legal notice page.
  //  */
  // goToLegalNotice() {
  //   this.router.navigate(['legal-notice']);
  // }
}
