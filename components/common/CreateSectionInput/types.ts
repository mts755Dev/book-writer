export type CreateSectionInputProps = {
  actionType: string;
  sectionId?: string;
  onClearHandler?(): void;
  addSectionHandler(action: string, value: string, id?: string): void;
};
