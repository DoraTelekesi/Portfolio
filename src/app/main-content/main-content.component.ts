import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsOverviewComponent } from './projects-overview/projects-overview.component';
import { ReferencesComponent } from './references/references.component';
import { ContactComponent } from './contact/contact.component';


@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [HeroComponent, AboutMeComponent, SkillsComponent, ProjectsOverviewComponent, ReferencesComponent, ContactComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
