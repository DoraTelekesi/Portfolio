import {
  Component,
  ViewChild,
  ElementRef,
  inject,
  OnInit,
  HostListener,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { gsap } from 'gsap';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgIf } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from '../../shared/header/translate.module';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass, ...sharedTranslateImports],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  hovered = false;
  hoveredSectionName = false;
  hoveredSectionEmail = false;
  hoveredSectionDescription = false;
  privacyChecked = false;
  @ViewChild('btnbox') btnbox!: ElementRef;
  @ViewChild('legalDrawnLine')
  legalDrawnLine!: ElementRef<HTMLImageElement>;
  width?: number;
  @HostListener('window:resize', ['$event'])

  /****
   * Handles window resize events and resets the rotate animation.
   * @param event The UIEvent triggered by window resize.
   */
  onResize(event: UIEvent) {
    // console.log('Window resized', (event.target as Window).innerWidth);
    this.resetRotateAnimation();
  }

  //Form validation
  messageValid = false;
  showInvalidMessageError = false;
  invalidMessageBackup = '';
  messageFocused = false;
  messageTouched = false;
  emailFocused = false;
  emailTouched = false;
  emailValid = false;
  invalidEmailBackup = '';
  showInvalidEmailError = false;
  nameFocused = false;
  nameTouched = false;
  nameValid = false;

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  http = inject(HttpClient);

  post = {
    endPoint: 'https://deineDomain.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

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
    gsap.set('.arrow', {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    this.animateArrow();
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
   * Angular lifecycle hook called on component initialization.
   * Triggers the resize handler to set initial state.
   */
  ngOnInit(): void {
    this.onResize({ target: window } as unknown as UIEvent);
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

  /**
   * Sets the hovered state for a specific section.
   * @param section The section name ('name', 'email', or 'description').
   */
  sectionHovered(section: string) {
    switch (section) {
      case 'name':
        this.hoveredSectionName = true;
        break;
      case 'email':
        this.hoveredSectionEmail = true;
        break;
      case 'description':
        this.hoveredSectionDescription = true;
        break;
    }
  }

  /**
   * Removes the hovered state for a specific section.
   * @param section The section name ('name', 'email', or 'description').
   */
  removeSectionHover(section: string) {
    switch (section) {
      case 'name':
        this.hoveredSectionName = false;
        break;
      case 'email':
        this.hoveredSectionEmail = false;
        break;
      case 'description':
        this.hoveredSectionDescription = false;
        break;
    }
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

  mailTest = false;

  /**
   * Handles form submission, validates the form, and sends data via HTTP POST.
   * @param ngForm The NgForm instance representing the contact form.
   */
  onSubmit(ngForm: NgForm) {
    ngForm.control.markAllAsTouched();
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
    }
  }

  /**
   * Handles blur event on the email input, validates the email, and manages error state.
   */
  onEmailBlur() {
    this.emailFocused = false;
    this.emailTouched = true;
    if (!this.isEmailValid()) {
      if (this.contactData.email) {
        this.invalidEmailBackup = this.contactData.email;
        this.contactData.email = '';
        this.showInvalidEmailError = true;
      }
    } else {
      this.invalidEmailBackup = '';
      this.showInvalidEmailError = false;
    }
  }

  /**
   * Handles focus event on the email input, restores invalid email if needed.
   */
  onEmailFocus() {
    this.emailFocused = true;
    if (this.showInvalidEmailError && !this.contactData.email) {
      this.contactData.email = this.invalidEmailBackup;
    }
  }

  /**
   * Handles input change event on the email input, resets error state if input is empty.
   */
  onEmailInputChange() {
    if (!this.contactData.email) {
      this.invalidEmailBackup = '';
      this.showInvalidEmailError = false;
    } else if (this.contactData.email && this.isEmailValid()) {
      this.emailValid = true;
    }
  }

  onNameInputChange() {
    if (this.contactData.name && this.isNameValid()) {
      this.nameValid = true;
    }
  }
  /**
   * Validates the email format.
   * @returns True if the email is valid, false otherwise.
   */
  isEmailValid(): boolean {
    if (!this.contactData.email) {
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.contactData.email);
  }

  /**
   * Handles focus event on the message input, restores invalid message if needed.
   */
  onMessageFocus() {
    this.messageFocused = true;
    if (this.showInvalidMessageError && !this.contactData.message) {
      this.contactData.message = this.invalidMessageBackup;
    }
  }

  /**
   * Handles input change event on the message input, resets error state if input is empty.
   */
  onMessageInputChange() {
    if (!this.contactData.message) {
      this.invalidEmailBackup = '';
      this.showInvalidEmailError = false;
    } else if (this.contactData.message && this.isMessageValid()) {
      this.messageValid = true;
    }
  }

  /**
   * Handles blur event on the message input, validates the message, and manages error state.
   */
  onMessageBlur() {
    this.messageFocused = false;
    this.messageTouched = true;
    if (!this.isMessageValid()) {
      if (this.contactData.message) {
        this.invalidMessageBackup = this.contactData.message;
        this.contactData.message = '';
        this.showInvalidMessageError = true;
      }
    } else {
      this.invalidMessageBackup = '';
      this.showInvalidMessageError = false;
    }
  }

  isNameValid(): boolean {
    if (!this.contactData.name) {
      return false;
    }
    return this.contactData.name.length > 0;
  }
  /**
   * Validates the message length.
   * @returns True if the message is longer than 15 characters, false otherwise.
   */
  isMessageValid(): boolean {
    if (!this.contactData.message) {
      return false;
    }
    return this.contactData.message.length > 15;
  }

  /**
   * Handles blur event on the name input, sets touched state.
   */
  onNameBlur() {
    this.nameFocused = false;
    this.nameTouched = true;
  }

  allInputValid(): boolean {
    if (
      this.isMessageValid() &&
      this.isNameValid() &&
      this.isEmailValid() &&
      this.privacyChecked
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Handles focus event on the name input.
   */
  onNameFocus() {
    this.nameFocused = true;
  }

  /**
   * Navigates to the legal notice page.
   */
  goToLegalNotice() {
    this.router.navigate(['legal-notice']);
  }

  /**
   * Navigates to the Privacy Policy page.
   */
  goToPrivacyPolicy() {
    this.router.navigate(['privacy-policy']);
  }
}
