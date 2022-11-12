import { Coordinate } from './Coordinate';

interface Target {
  name: string;

  target: unknown;

  setup(): void;

  cleanup(): void;

  // Try to use more efficient code, even if it is not easy to read
  update(): Coordinate | null;
}

export type { Target };
