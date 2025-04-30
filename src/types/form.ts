export type FormState<T, Q> =
  | { success: T; error?: never }
  | {
      success?: never;
      error: Partial<Record<keyof Q, string[] | undefined>> & { root?: string };
    };
