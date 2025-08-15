import { Routes } from '@angular/router';

import { MainContentComponent } from './main-content/main-content.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'Projects/:id', component: ProjectDetailComponent },
  { path: 'legal-notice', component: ImpressumComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
];
