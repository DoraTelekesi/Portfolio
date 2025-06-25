import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { MainContentComponent } from './main-content/main-content.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ImpressumComponent } from './impressum/impressum.component';

export const routes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'Projects/:id', component: ProjectDetailComponent },
  { path: 'legal-notice', component: ImpressumComponent },
];

RouterModule.forRoot(routes, {
  anchorScrolling: 'enabled', // enables fragment scrolling
  scrollOffset: [0, 64], // optional, if you have a fixed header (e.g. 64px tall)
  scrollPositionRestoration: 'enabled', // restores scroll position when navigating back
});
