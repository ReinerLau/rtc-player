export interface Video {
  id?: number;
  name: string;
  url: string;
}

export interface PlayAllParams {
  page: number;
  elementList: HTMLVideoElement[];
}
