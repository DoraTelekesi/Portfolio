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
    liveLink: 'https://doratelekesi.github.io/Spooky-Town/',
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
    liveLink: 'https://doratelekesi.github.io/Join/',
    repoLink: 'https://github.com/DoraTelekesi/Join',
  },
  {
    id: 'DaBubble',
    title: 'DaBubble',
    description: 'PROJECTS.DABUBBLE.TEXT_1',
    implementation: 'PROJECTS.DABUBBLE.TEXT_2',
    tools: [
      { name: 'TypeScript', img: 'assets/icon/Ts.svg' },
      { name: 'HTML', img: 'assets/icon/HTML.svg' },
      { name: 'CSS', img: 'assets/icon/CSS.svg' },
      { name: 'Angular', img: 'assets/icon/Firebase.svg' },
      { name: 'Firebase', img: 'assets/icon/Firebase.svg' },
    ],
    toolsImgs: [
      'assets/icon/Ts.svg',
      'assets/icon/HTML.svg',
      'assets/icon/Firebase.svg',
    ],
    imageUrl: 'assets/img/dabubble.jpg',
    liveLink: 'https://doratelekesi.github.io/Spooky-Town/',
    repoLink: 'https://github.com/DoraTelekesi/Spooky-Town',
  },
];
