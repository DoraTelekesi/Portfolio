import {
  Component,
  ViewChild,
  ElementRef,
  inject,
  NgModule,
} from '@angular/core';
import {
  EmailValidator,
  FormGroup,
  FormsModule,
  NgForm,
  NgModel,
} from '@angular/forms';
import { gsap } from 'gsap';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgIf } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  hovered = false;
  hoveredSectionName = false;
  hoveredSectionEmail = false;
  hoveredSectionDescription = false;
  privacyChecked = false;
  // placeholderTextMessage = 'Hello Dora...';

  @ViewChild('legalDrawnLine')
  legalDrawnLine!: ElementRef<HTMLImageElement>;

  ngAfterViewInit(): void {
    gsap.set('.arrow', {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    this.animateArrow();
    gsap.set(this.legalDrawnLine.nativeElement, {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
  }

  // updatePlaceholder(text: string) {
  //   this.placeholderTextMessage = 'Hello Dora, I am interested in...';
  // }

  putHover() {
    this.hovered = true;
    gsap.to(this.legalDrawnLine.nativeElement, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.2,
      ease: 'power2.out',
    });
  }

  deleteHover() {
    this.hovered = false;
    gsap.to(this.legalDrawnLine.nativeElement, {
      clipPath: 'inset(0% 100% 0% 0%)', // hide from top
      duration: 0.2,
      ease: 'power2.in',
    });
  }

  putHoverGitHub() {
    gsap.fromTo(
      '.github-icon',
      { x: 0, duration: 0.8, rotation: 0, opacity: 0 },
      { rotation: 360, x: 100, duration: 0.8, opacity: 1, ease: 'back' }
    );
  }

  removeHoverGitHub() {
    gsap.fromTo(
      '.github-icon',
      { x: 100, duration: 0.8, rotation: 0, opacity: 1 },
      { rotation: -360, x: 0, duration: 0.8, opacity: 0 }
    );
  }
  putHoverLinkedin() {
    gsap.fromTo(
      '.linkedin-icon',
      { x: 0, duration: 0.8, rotation: 0, opacity: 0 },
      { rotation: 360, x: 100, duration: 0.8, opacity: 1, ease: 'back' }
    );
  }

  removeHoverLinkedin() {
    gsap.fromTo(
      '.linkedin-icon',
      { x: 100, duration: 0.8, rotation: 0, opacity: 1 },
      { rotation: -360, x: 0, duration: 0.8, opacity: 0 }
    );
  }
  putHoverEmail() {
    gsap.fromTo(
      '.email-icon',
      { x: 0, duration: 0.8, rotation: 0, opacity: 0 },
      { rotation: 360, x: 100, duration: 0.8, opacity: 1, ease: 'back' }
    );
  }

  removeHoverEmail() {
    gsap.fromTo(
      '.email-icon',
      { x: 100, duration: 0.8, rotation: 0, opacity: 1 },
      { rotation: -360, x: 0, duration: 0.8, opacity: 0 }
    );
  }

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

  animateArrow() {
    gsap.to('.arrow', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 2,
      ease: 'power2.out',
      repeat: -1,
      yoyo: true,
    });
  }

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  http = inject(HttpClient);

  mailTest = true;

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

  // Email Validation
  emailFocused = false;
  emailTouched = false;
  emailValid = false;
  invalidEmailBackup = ''; // store invalid email temporarily
  showInvalidEmailError = false;

  onEmailBlur() {
    this.emailFocused = false;
    this.emailTouched = true;

    if (!this.isEmailValid()) {
      if (this.contactData.email) {
        // Invalid but user typed something
        this.invalidEmailBackup = this.contactData.email; // save it
        this.contactData.email = ''; // clear input to show error message
        this.showInvalidEmailError = true; // flag to show invalid email message
      }
    } else {
      // valid email or empty
      this.invalidEmailBackup = '';
      this.showInvalidEmailError = false;
    }
  }

  onEmailFocus() {
    this.emailFocused = true;
    // Restore invalid email if we have it and the input is empty (due to blur clearing)
    if (this.showInvalidEmailError && !this.contactData.email) {
      this.contactData.email = this.invalidEmailBackup;
    }
  }

  onEmailInputChange() {
    if (!this.contactData.email) {
      this.invalidEmailBackup = '';
      this.showInvalidEmailError = false;
    }
  }
  isEmailValid(): boolean {
    // Simple email regex validation
    if (!this.contactData.email) {
      return false; // empty is invalid for this logic
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.contactData.email);
  }

  //Message Validation
  messageValid = false;
  showInvalidMessageError = false;
  invalidMessageBackup = '';
  messageFocused = false;
  messageTouched = false;


  onMessageFocus() {
    this.messageFocused = true;
    if (this.showInvalidMessageError && !this.contactData.message) {
      this.contactData.message = this.invalidMessageBackup;
    }
  }
  onMessageInputChange() {
    if (!this.contactData.message) {
      this.invalidEmailBackup = '';
      this.showInvalidEmailError = false;
    }
  }

  onMessageBlur() {
    this.messageFocused = false;
    this.messageTouched = true;

    if (!this.isMessageValid()) {
      if (this.contactData.message) {
        // Invalid but user typed something
        this.invalidMessageBackup = this.contactData.message; // save it
        this.contactData.message = ''; // clear input to show error message
        this.showInvalidMessageError = true; // flag to show invalid email message
      }
    } else {
      // valid email or empty
      this.invalidMessageBackup = '';
      this.showInvalidMessageError = false;
    }
  }

  isMessageValid(): boolean {
    if (!this.contactData.message) {
      return false;
    }
    return this.contactData.message.length > 15;
  }

  //Name Validation

  nameFocused = false;
  nameTouched = false;

  onNameBlur() {
    this.nameFocused = false;
    this.nameTouched = true;
  }
  onNameFocus() {
    this.nameFocused = true;
  }
}
