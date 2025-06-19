import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 'Spooky-Town',
    title: 'Spooky Town',
    description:
      'Jump, tun and throw game based on object-orientated approach. Help Skeleton Warrior to find coins and bottles to fight against the enemies.',
    implementation:
      "In the 'El Pollo Loco' project, I developed an engaging jump-and-run game based on object-oriented programming. Players take on the role of Pepe, navigating through various levels to collect coins and Tabasco salsa while battling crazy chickens. I used JavaScript to implement the gamemechanics, focusing on an object-oriented design to create characters andtheir interactions. The game features interactive gameplay elements,challenging boss fights, and lively sound effects that enhance the overallexperience. Through close collaboration with other developers, I was able to continuously improve and adapt the game.",
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
    description:
      'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories. ',
    implementation:
      'Short text that describes your role or the workflow for this specific project. Let a recruiter know more about your knowledge and ability to work independently or collaboratively in a structured way.',
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
    description:
      'This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.',
    implementation:
      'Short text that describes your role or the workflow for this specific project. Let a recruiter know more about your knowledge and ability to work independently or collaboratively in a structured way.',
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
