import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { NgIf, Location } from '@angular/common';
import { gsap } from 'gsap';
import { PROJECTS } from '../../data/projects';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
  projects?: typeof PROJECTS = PROJECTS;
  project?: Project;
  isUnderlined = false;
  @ViewChild('titleRef') titleElement!: ElementRef;
  width!: number;
  height!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.project = this.projectService.getProjectById(id || '');
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.width = this.titleElement.nativeElement.offsetWidth;
      if (this.width < 200 || this.width > 400) {
        this.height = 20;
      }
    });

    gsap.set('.title-underline', {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    this.animateUnderline();
  }

  animateUnderline() {
    gsap.to('.title-underline', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 2,
      ease: 'power2.out',
      repeat: -1,
      yoyo: true,
    });
  }

  goBack() {
    this.location.back();
  }

  nextProject() {
    let currentPath = this.location.path();
    console.log(currentPath);
    let currentId = currentPath.split('/').pop();
    if (this.projects) {
      let currentIndex = this.projects?.findIndex((p) => p.id === currentId);
      console.log(currentIndex);
      let nextIndex = (currentIndex + 1) % this.projects?.length;
      console.log(nextIndex);
      let nextProjectId = this.projects[nextIndex].id;
      this.router.navigate(['/Projects', nextProjectId]);
    }
  }
}
