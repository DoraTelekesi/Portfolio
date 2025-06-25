import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { NgIf, Location } from '@angular/common';
import { gsap } from 'gsap';
import { PROJECTS } from '../../data/projects';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from '../../shared/header/translate.module';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [NgIf, ...sharedTranslateImports],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
  projects?: typeof PROJECTS = PROJECTS;
  project?: Project;
  isUnderlined = false;
  @ViewChild('titleRef') titleElement!: ElementRef;
  @ViewChild('underlineRef') underlineRef!: ElementRef;
  width!: number;
  height!: number;
  translatedDescription = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location,
    private translate: TranslateService
  ) {}

  /**
   * Sets the translated description for the current project using ngx-translate.
   * If no description is present, sets an empty string.
   * @private
   */
  private setTranslatedDescription() {
    if (this.project?.description) {
      this.translate
        .get(this.project.description)
        .subscribe((res) => (this.translatedDescription = res));
    } else {
      this.translatedDescription = '';
    }
  }

  /**
   * Angular lifecycle hook called on component initialization.
   * Fetches the project by ID from the route and resets the underline animation.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.project = this.projectService.getProjectById(id || '');
      setTimeout(() => {
        this.resetUnderlineAnimation();
      });
    });
  }

  /**
   * Angular lifecycle hook called when any data-bound property of a directive changes.
   * Updates the translated description if the project input changes.
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      this.setTranslatedDescription();
    }
  }

  /**
   * Angular lifecycle hook called after the component's view has been fully initialized.
   * Resets the underline animation and sets the translated description.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.resetUnderlineAnimation();
    });
    this.setTranslatedDescription();
  }

  /**
   * Resets the underline animation for the project title.
   * Sets the width and height for the underline and starts the animation.
   */
  resetUnderlineAnimation() {
    if (this.titleElement && this.titleElement.nativeElement) {
      this.width = this.titleElement.nativeElement.offsetWidth;
      if (this.width < 200 || this.width > 400) {
        this.height = 20;
      }
    }
    if (this.underlineRef && this.underlineRef.nativeElement) {
      gsap.killTweensOf(this.underlineRef.nativeElement);
      gsap.set(this.underlineRef.nativeElement, {
        clipPath: 'inset(0% 100% 0% 0%)',
      });
      this.animateUnderline();
    }
  }

  /**
   * Animates the underline element using GSAP with a repeating yoyo effect.
   */
  animateUnderline() {
    gsap.killTweensOf(this.underlineRef.nativeElement);

    gsap.to(this.underlineRef.nativeElement, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 2,
      ease: 'power2.out',
      repeat: -1,
      yoyo: true,
    });
  }

  /**
   * Navigates back to the root route and scrolls to the 'projects' fragment.
   */
  goBack() {
    this.router.navigate([''], { fragment: 'projects' });
  }

  /**
   * Navigates to the next project in the projects list.
   * If at the end, wraps to the first project.
   */
  nextProject() {
    let currentPath = this.location.path();
    let currentId = currentPath.split('/').pop();
    if (this.projects) {
      let currentIndex = this.projects?.findIndex((p) => p.id === currentId);
      let nextIndex = (currentIndex + 1) % this.projects?.length;
      let nextProjectId = this.projects[nextIndex].id;
      this.router.navigate(['/Projects', nextProjectId]);
    }
  }
}
