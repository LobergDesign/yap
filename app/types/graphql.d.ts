declare global {
  const useAsyncGql: <T = unknown>(
    query: string,
    opts?: Record<string, unknown>
  ) => AsyncGqlResult<T>
}

export {}
