import { Component, Input } from '@angular/core';
import { ReferenceItemComponent } from './reference-item/reference-item.component';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [ReferenceItemComponent],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss',
})
export class ReferencesComponent {}
