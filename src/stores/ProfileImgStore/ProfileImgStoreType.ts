export interface ProfileImgStoreType {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}

export interface SaveState {
  saveState: boolean;
  setSaveState: (saveState: boolean) => void;
}
