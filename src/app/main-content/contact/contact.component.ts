import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { CustomBounce } from 'gsap/CustomBounce';

gsap.registerPlugin(CustomEase, CustomBounce);
CustomBounce.create('myBounce', {
  strength: 0.3,
  squash: 0.2,
  squashID: 'myBounce-squash',
});

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Primary', completed: false, color: 'primary' },
      { name: 'Accent', completed: false, color: 'accent' },
      { name: 'Warn', completed: false, color: 'warn' },
    ],
  };
  hovered = false;
  allComplete: boolean = false;

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
  putHover() {
    this.hovered = true;

    gsap.to(this.legalDrawnLine.nativeElement, {
      clipPath: 'inset(0% 0% 0% 0%)', // fully visible
      duration: 0.2,
      ease: 'power2.out',
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

  deleteHover() {
    this.hovered = false;
    gsap.to(this.legalDrawnLine.nativeElement, {
      clipPath: 'inset(0% 100% 0% 0%)', // hide from top
      duration: 0.2,
      ease: 'power2.in',
    });
  }

  // putHover() {
  //   this.hovered = true;
  //   // gsap.fromTo(
  //   //   '.wav-hand',
  //   //   { x: 154, duration: 0.6, rotation: 0, opacity: 0 },
  //   //   { rotation: 360, x: 210, duration: 0.6, opacity: 1, ease: 'myBounce' }
  //   // );
  //   gsap.to('.legal', { opacity: 0, duration: 0.4 });
  //   gsap.to('.name-welc', { opacity: 1, duration: 0.4 });
  // }

  // deleteHover() {
  //   this.hovered = false;
  //   // gsap.fromTo(
  //   //   '.wav-hand',
  //   //   { x: 220, duration: 0.6, rotation: 0, opacity: 1 },
  //   //   { rotation: -360, x: 128, duration: 0.6, opacity: 0 }
  //   // );
  //   gsap.to('.name-welc', { opacity: 0, duration: 0.4 });
  //   gsap.to('.world-welc', { opacity: 1, duration: 0.4 });
  // }

  animateArrow() {
    gsap.to('.arrow', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 2,
      ease: 'power2.out',
      repeat: -1,
      yoyo: true,
    });
  }

  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return (
      this.task.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t) => (t.completed = completed));
  }
}
