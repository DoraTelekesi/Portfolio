import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 'Spooky-Town',
    title: 'Spooky Town',
    description: 'PROJECTS.SPOOKY.TEXT_1',
    implementation: 'PROJECTS.SPOOKY.TEXT_2',
    tools: [
      { name: 'JavaScript', img: 'assets/icon/Js.svg' },
      { name: 'HTML', img: 'assets/icon/HTML.svg' },
      { name: 'CSS', img: 'assets/icon/CSS.svg' },
    ],
    toolsImgs: [
      'assets/icon/Js.svg',
      'assets/icon/HTML.svg',
      'assets/icon/CSS.svg',
    ],
    imageUrl: 'assets/img/SpookyTown.png',
    liveLink: 'https://www.dora-telekesi.com/Spooky-Town/index.html',
    repoLink: 'https://github.com/DoraTelekesi/Spooky-Town',
  },
  {
    id: 'Join',
    title: 'Join',
    description: 'PROJECTS.JOIN.TEXT_1',
    implementation: 'PROJECTS.JOIN.TEXT_2',
    tools: [
      { name: 'JavaScript', img: 'assets/icon/Js.svg' },
      { name: 'HTML', img: 'assets/icon/HTML.svg' },
      { name: 'CSS', img: 'assets/icon/CSS.svg' },
      { name: 'Firebase', img: 'assets/icon/Firebase.svg' },
    ],
    toolsImgs: [
      'assets/icon/Js.svg',
      'assets/icon/HTML.svg',
      'assets/icon/CSS.svg',
    ],
    imageUrl: 'assets/img/Join-2.jpg',
    liveLink: 'https://www.dora-telekesi.com/Join/index.html',
    repoLink: 'https://github.com/DoraTelekesi/Join',
  },
];
