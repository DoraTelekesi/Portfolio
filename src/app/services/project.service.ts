import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { PROJECTS } from '../data/projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  /**
   * Returns the list of all projects.
   * @returns An array of Project objects.
   */
  getProjects(): Project[] {
    return PROJECTS;
  }

  /**
   * Returns a project by its ID.
   * @param id The ID of the project to retrieve.
   * @returns The Project object if found, otherwise undefined.
   */
  getProjectById(id: string): Project | undefined {
    return PROJECTS.find((p) => p.id === id);
  }
  constructor() {}
}
