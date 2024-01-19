export type InputProps = {
  name: string;
  type: string;
  value: string;
  placeholder: string;
  onChange(name: string, value: string): void;
  className: string;
  error?: string;
};
