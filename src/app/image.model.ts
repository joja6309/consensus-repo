

export interface Image {
  url: string;
  name: string;
  filename : string;
  author: string;
  location: string;
  // tags: string [];
  uniqueId: number;
  
} 
export class ResponseImage implements Image
{
  url: string;
  name: string;
  filename: string;
  author: string;
  location: string;
  // tags: string [];
  uniqueId: number;
  constructor() {
    
  }
  
}
