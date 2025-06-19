export interface Project {
  id: string;
  title: string;
  description: string;
  implementation: string;
  tools:Tool[];
  toolsImgs:string[];
  imageUrl: string;
  liveLink?: string;
  repoLink?: string;
}



export interface Tool {
  name: string;
  img: string;
}