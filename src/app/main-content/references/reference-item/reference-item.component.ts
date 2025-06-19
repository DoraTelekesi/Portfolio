import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reference-item',
  standalone: true,
  imports: [NgStyle],
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
      name: 'Tobias Lange',
      profession: 'Frontend Developer',
      refText:
        "Karl really kept the team together with his great organization and clear communication. We wouldn't have got this far without his commitment.",
      imageUrl: 'assets/img/reference-sticker-1.png',
    },
    {
      name: 'Maria Schäfer',
      profession: 'Frontend Developer',
      refText:
        'It was a great pleasure to work with Karl. He knows how to push and encourage team members to present the best work possible, always adding something to brainstorm. Regarding the well-being of group members, he was always present and available to listen and help others, with a great sense of humor as well.',
      imageUrl: 'assets/img/reference-sticker-2.png',
    },
    {
      name: 'David Braun',
      profession: 'Frontend Developer',
      refText:
        'Karl was a top team colleague at DA. His positive commitment and willingness to take on responsibility made a significant contribution to us achieving our goals.',
      imageUrl: 'assets/img/reference-sticker-1.png',
    },
  ];
  zIndex: number[] = [9, 3, 1];
  zIndexImg: number[] = [1, 1, 1];

  currentSticker = 0;
  hoveredIndex: number | null = null;

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
