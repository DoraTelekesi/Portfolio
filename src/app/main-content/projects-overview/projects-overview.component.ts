import { Component, QueryList, ViewChildren } from '@angular/core';
import { ProjectItemComponent } from './project-item/project-item.component';
import { gsap } from 'gsap';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from '../../shared/header/translate.module';
@Component({
  selector: 'app-projects-overview',
  standalone: true,
  imports: [ProjectItemComponent, ...sharedTranslateImports],
  templateUrl: './projects-overview.component.html',
  styleUrl: './projects-overview.component.scss',
})
export class ProjectsOverviewComponent {
  projectlist = [
    {
      id: 'Spooky-Town',
      title: 'Spooky Town',
      description: 'PROJECTS_OVERVIEW.SPOOKY_TEXT',
      img: 'assets/img/SpookyTown.png',
      imgClass: 'spooky-img',
      imgId: 'spooky-img',
      path: 'Projects/Spooky-Town',
    },
    {
      id: 'Join',
      title: 'Join',
      description: 'PROJECTS_OVERVIEW.JOIN_TEXT',
      img: 'assets/img/Join.png',
      imgClass: 'join-img',
      imgId: 'join-img',
      path: 'Join',
    }
  ];
  constructor(private translate: TranslateService) {}
  isUnderlined = false;

  /**
   * Angular lifecycle hook called after the component's view has been fully initialized.
   * Sets the initial state of the title underline and starts the underline animation.
   */
  ngAfterViewInit(): void {
    gsap.set('.title-underline', {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    this.animateUnderline();
  }

  /**
   * Animates the title underline using GSAP with a repeating yoyo effect.
   */
  animateUnderline() {
    gsap.to('.title-underline', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 2,
      ease: 'power2.out',
      repeat: -1,
      yoyo: true,
    });
  }
}
