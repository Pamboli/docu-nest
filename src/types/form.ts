export type FormState<T, Q> = {
  data?: T & { resetKey?: string };
  error?: Partial<Record<keyof Q, string[] | undefined>> & { root?: string };
};
