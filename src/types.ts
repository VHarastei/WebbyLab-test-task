export interface Actor {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type MovieFormat = 'VHS' | 'DVD' | 'Blu-ray';

export interface ShortMovie {
  id: number;
  title: string;
  year: number;
  format: MovieFormat;
  createdAt: string;
  updatedAt: string;
}

export interface FullMovie extends ShortMovie {
  actors: Actor[];
}

export enum Status {
  SUCCESS = 'SUCCESS',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}

export enum ResultCodes {
  SUCCESS = 1,
  ERROR = 0,
}

export interface User {
  email: string;
  token: string;
}
