import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { sharedTranslateImports } from '../../../shared/header/translate.module';

@Component({
  selector: 'app-reference-item',
  standalone: true,
  imports: [NgStyle, ...sharedTranslateImports],
  templateUrl: './reference-item.component.html',
  styleUrl: './reference-item.component.scss',
})
export class ReferenceItemComponent {
  imageUrl: string = '';
  specialId!: string;
  hovered: boolean = false;

  name: string = 'Dora';
  profession: string = '';
  refText: string = '';

  references: {
    name: string;
    profession: string;
    refText: string;
    imageUrl: string;
  }[] = [
    {
      name: 'Noah Velickovic',
      profession: 'Frontend Developer',
      refText: 'REFERENCES.TEXT_1',
      imageUrl: 'assets/img/reference-sticker-1.png',
    },
    {
      name: 'Abbas Al Mahmoud',
      profession: 'Frontend Developer',
      refText: 'REFERENCES.TEXT_2',
      imageUrl: 'assets/img/reference-sticker-2.png',
    },
    {
      name: 'David Braun',
      profession: 'Frontend Developer',
      refText: 'REFERENCES.TEXT_3',
      imageUrl: 'assets/img/reference-sticker-1.png',
    },
  ];
  zIndex: number[] = [9, 3, 1];
  zIndexImg: number[] = [1, 1, 1];

  currentSticker = 0;
  hoveredIndex: number | null = null;

  constructor(private translate: TranslateService) {}

  getRotation(index: number): number {
    let rotations = [-5, 0, 5];
    return rotations[index % rotations.length];
  }

  getZIndex(index: number): number {
    return this.zIndex[index % this.zIndex.length];
  }

  applyHover(index: number) {
    this.zIndex[index] = 9;
    this.currentSticker = index;
    this.hovered = true;
    this.zIndexImg[index] = 999;
  }

  removeHover(index: number) {
    this.currentSticker = index;
    this.zIndex[index] = 1;
    this.hovered = false;
    this.zIndexImg[index] = 1;
  }

  getZIndexImg(index: number) {
    return this.zIndexImg[index % this.zIndexImg.length];
  }
}
