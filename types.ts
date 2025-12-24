
export enum Speaker {
  Male = 'Carlos',
  Female = 'Elena'
}

export interface PodcastGenerationResult {
  audioUrl: string;
  transcript: string;
  fileName: string;
}

export interface AppState {
  isProcessing: boolean;
  error: string | null;
  result: PodcastGenerationResult | null;
  progressMessage: string;
}
