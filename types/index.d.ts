export interface Video {
  id?: number;
  name: string;
  url: string;
  isPlaying?: boolean;
}

export interface PlayAllParams {
  page: number;
  videoEls: HTMLVideoElement[];
}
