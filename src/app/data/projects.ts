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
      { name: 'n8n', img: 'assets/icon/n8n_icon.svg' },
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
  {
    id: 'Dabubble',
    title: 'Dabubble',
    description: 'PROJECTS.DABUBBLE.TEXT_1',
    implementation: 'PROJECTS.DABUBBLE.TEXT_2',
    tools: [
      { name: 'HTML', img: 'assets/icon/HTML.svg' },
      { name: 'CSS', img: 'assets/icon/CSS.svg' },
      { name: 'TypeScript', img: 'assets/icon/Ts.svg' },
      { name: 'Angular', img: 'assets/icon/Angular_2.svg' },
      { name: 'Firebase', img: 'assets/icon/Firebase.svg' },
      { name: 'Material Design', img: 'assets/icon/Material_Design.svg' },
    ],
    toolsImgs: [
      'assets/icon/Js.svg',
      'assets/icon/HTML.svg',
      'assets/icon/CSS.svg',
    ],
    imageUrl: 'assets/img/dabubble.jpg',
    liveLink: 'https://www.dora-telekesi.com/Dabubble/index.html',
    repoLink: 'https://github.com/DoraTelekesi/Dabubble',
  },
];
