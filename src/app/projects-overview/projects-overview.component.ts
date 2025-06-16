import { Component, QueryList, ViewChildren } from '@angular/core';
import { ProjectItemComponent } from './project-item/project-item.component';
import { gsap } from 'gsap';
@Component({
  selector: 'app-projects-overview',
  standalone: true,
  imports: [ProjectItemComponent],
  templateUrl: './projects-overview.component.html',
  styleUrl: './projects-overview.component.scss',
})
export class ProjectsOverviewComponent {
  
}
