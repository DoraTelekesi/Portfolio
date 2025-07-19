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
    link:string;
    linkIcon:string;
  }[] = [
    {
      name: 'Noah Velickovic',
      profession: 'Frontend Developer',
      refText: 'REFERENCES.TEXT_1',
      imageUrl: 'assets/img/reference-sticker-1.png',
      link:'https://github.com/OhVenic',
      linkIcon:'assets/icon/github-logo.png'
    },
    {
      name: 'Abbas Al Mahmoud',
      profession: 'Frontend Developer',
      refText: 'REFERENCES.TEXT_2',
      imageUrl: 'assets/img/reference-sticker-2.png',
      link:'https://www.linkedin.com/in/abbas-el-mahmoud/',
      linkIcon:'assets/icon/linkedin-s.png'
    },
    {
      name: 'Ramon Kunz',
      profession: 'Frontend Developer',
      refText: 'REFERENCES.TEXT_3',
      imageUrl: 'assets/img/reference-sticker-1.png',
      link:'https://www.linkedin.com/in/ramon-kunz-0565b0137/',
      linkIcon:'assets/icon/linkedin-s.png'
    },
  ];
  zIndex: number[] = [9, 3, 1];
  zIndexImg: number[] = [1, 1, 1];
  currentSticker = 0;
  hoveredIndex: number | null = null;

  constructor(private translate: TranslateService) {}

  /**
   * Returns the rotation angle for a sticker based on its index.
   * @param index The index of the sticker.
   * @returns The rotation angle in degrees.
   */
  getRotation(index: number): number {
    let rotations = [-5, 0, 5];
    return rotations[index % rotations.length];
  }

  /**
   * Returns the z-index for a sticker based on its index.
   * @param index The index of the sticker.
   * @returns The z-index value.
   */
  getZIndex(index: number): number {
    return this.zIndex[index % this.zIndex.length];
  }

  /**
   * Applies hover effects to a sticker, updating z-index and state.
   * @param index The index of the sticker being hovered.
   */
  applyHover(index: number) {
    this.zIndex[index] = 9;
    this.currentSticker = index;
    this.hovered = true;
    this.zIndexImg[index] = 999;
  }

  /**
   * Removes hover effects from a sticker, resetting z-index and state.
   * @param index The index of the sticker.
   */
  removeHover(index: number) {
    this.currentSticker = index;
    this.zIndex[index] = 1;
    this.hovered = false;
    this.zIndexImg[index] = 1;
  }

  /**
   * Returns the z-index for a sticker image based on its index.
   * @param index The index of the sticker image.
   * @returns The z-index value for the image.
   */
  getZIndexImg(index: number) {
    return this.zIndexImg[index % this.zIndexImg.length];
  }
}
