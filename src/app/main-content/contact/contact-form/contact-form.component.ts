import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgIf } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sharedTranslateImports } from '../../../shared/header/translate.module';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [NgClass, NgIf, FormsModule, ...sharedTranslateImports],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  hoveredSectionName = false;
  hoveredSectionEmail = false;
  hoveredSectionDescription = false;
  privacyChecked = false;
  @Output() formSubmitted = new EventEmitter<any>();
  dataSent = false;
  contactData = {
    name: '',
    email: '',
    message: '',
  };
  nameTouched = false;
  nameFocused = false;
  nameValid = false;
  emailFocused = false;
  emailTouched = false;
  emailValid = false;
  messageValid = false;
  messageFocused = false;
  messageTouched = false;
  invalidMessageBackup = '';
  invalidEmailBackup = '';
  showInvalidEmailError = false;
  showInvalidMessageError = false;
  mailTest = true; // if still needed here
  http = inject(HttpClient);
  post = {
    endPoint: 'https://dora-telekesi.com/sendMail.php',
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
   * Handles the form submission event.
   * Marks all form controls as touched, checks validity, and sends data via HTTP POST if not in mailTest mode.
   * If in mailTest mode, simulates sending data.
   * @param ngForm The NgForm instance representing the contact form.
   */
  onSubmit(ngForm: NgForm) {
    ngForm.control.markAllAsTouched();
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            this.onDataSend(ngForm);
          },
          error: (error) => {
            console.error(error);
            this.dataSent = false;
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      this.onDataSend(ngForm);
    }
  }

  /**
   * Handles actions after form data is sent successfully.
   * Emits the formSubmitted event, shows a success message for 2 seconds, resets the form, and clears input flags.
   * @param ngForm The NgForm instance representing the contact form.
   */
  onDataSend(ngForm: NgForm) {
    this.formSubmitted.emit(ngForm);
    this.dataSent = true;
    setTimeout(() => {
      this.dataSent = false;
    }, 2000);
    ngForm.resetForm();
    this.resetInputFlags();
  }

  /**
   * Resets all input focus and touched flags to false.
   */
  resetInputFlags() {
    this.nameTouched = false;
    this.nameFocused = false;
    this.messageFocused = false;
    this.messageTouched = false;
    this.emailFocused = false;
    this.emailTouched = false;
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
   * Checks if the name input is valid.
   * @returns True if the name is not empty, false otherwise.
   */
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
   * Checks if all input fields are valid and privacy is checked.
   * @returns True if all validations pass, false otherwise.
   */
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

  /**
   * Handles input change event on the name input, sets nameValid to true if valid.
   */
  onNameInputChange() {
    if (this.contactData.name && this.isNameValid()) {
      this.nameValid = true;
    }
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

  /**
   * Handles blur event on the name input, sets touched state.
   */
  onNameBlur() {
    this.nameFocused = false;
    this.nameTouched = true;
  }

  /**
   * Handles focus event on the name input.
   */
  onNameFocus() {
    this.nameFocused = true;
  }

  /**
   * Navigates to the Privacy Policy page.
   */
  goToPrivacyPolicy() {
    this.router.navigate(['privacy-policy']);
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
}
