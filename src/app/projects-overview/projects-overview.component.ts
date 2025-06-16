import { Component } from '@angular/core';
import { ProjectItemComponent } from './project-item/project-item.component';


@Component({
  selector: 'app-projects-overview',
  standalone: true,
  imports: [ProjectItemComponent],
  templateUrl: './projects-overview.component.html',
  styleUrl: './projects-overview.component.scss'
})
export class ProjectsOverviewComponent {

}
