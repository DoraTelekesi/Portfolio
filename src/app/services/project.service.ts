import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { PROJECTS } from '../data/projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  getProjects(): Project[] {
    return PROJECTS;
  }

  getProjectById(id: string): Project | undefined {
    return PROJECTS.find((p) => p.id === id);
  }
  constructor() {}
}
