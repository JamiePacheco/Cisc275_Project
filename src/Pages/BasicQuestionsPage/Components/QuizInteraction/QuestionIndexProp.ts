export interface IndexState {
  setIndex: (index: number) => void;
  index: number;
  isProgressBarFull: boolean;
  length: number;
  setIsVisible: (isVisible: boolean) => void;
  setReviewIsVisible: (reviewIsVisible: boolean) => void;
}
