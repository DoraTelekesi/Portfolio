import { Component, QueryList, ViewChildren } from '@angular/core';
import { ProjectItemComponent } from './project-item/project-item.component';
import { gsap } from 'gsap';
@Component({
  selector: 'app-projects-overview',
  standalone: true,
  imports: [ProjectItemComponent],
  templateUrl: './projects-overview.component.html',
  styleUrl: './projects-overview.component.scss',
})
export class ProjectsOverviewComponent {
  projectlist = [
    {
      id: 'Spooky-Town',
      title: 'Spooky Town',
      description:
        'Jump, tun and throw game based on object-orientated approach. Help Skeleton Warrior to find coins and bottles to fight against the enemies.',
      img: 'assets/img/SpookyTown.png',
      imgClass: 'spooky-img',
      imgId: 'spooky-img',
      path: 'Projects/Spooky-Town',
    },
    {
      id: 'Join',
      title: 'Join',
      description:
        'Task manager inspired by the Kanban System. Create and organize tasks, drag and drop function, assign users and categories.',
      img: 'assets/img/Join.png',
      imgClass: 'join-img',
      imgId: 'join-img',
      path: 'Join',
    },
    {
      id: 'DaBubble',
      title: 'Dabubble',
      description:
        'This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.',
      img: 'assets/img/dabubble.jpg',
      imgClass: 'dabubble-img',
      imgId: 'dabubble-img',
      path: 'DaBubble',
    },
  ];

  isUnderlined = false;

  ngAfterViewInit(): void {
    gsap.set('.title-underline', {
      clipPath: 'inset(0% 100% 0% 0%)',
    });
    this.animateUnderline();
  }

  animateUnderline() {
    gsap.to('.title-underline', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 2,
      ease: 'power2.out',
      repeat: -1,
      yoyo: true,
    });
  }
}
