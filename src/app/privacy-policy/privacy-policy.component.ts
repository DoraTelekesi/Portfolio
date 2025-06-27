import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from '../shared/header/translate.module';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent implements OnInit {
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
