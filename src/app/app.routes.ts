import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { MainContentComponent } from './main-content/main-content.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';

export const routes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'Projects/:id', component: ProjectDetailComponent },
];
