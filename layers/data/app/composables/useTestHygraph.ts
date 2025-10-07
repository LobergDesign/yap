export const useTestHygraph = async () => {
  const { data, error, status, pending } = useAsyncGql('TestHygraph')
  return { data, error, status, pending }
}
