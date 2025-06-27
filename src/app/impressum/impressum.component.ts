import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from '../shared/header/translate.module';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [...sharedTranslateImports, FooterComponent],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss',
})
export class ImpressumComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  /**
   * Navigates back to the root route and scrolls to the 'contact' fragment.
   */
  goBack() {
    this.router.navigate([''], { fragment: 'contact' });
  }
}
