export async function useUniformEnhancedComposition(parameters: Parameters<typeof useUniformComposition>[0]) {
  const reqFetch = useRequestFetch()
  const results = await useUniformComposition({
    ...parameters,
    enhance: async (composition) => {
      const { composition: enhancedComposition } = await reqFetch(
        "/api/enhance",
        {
          method: "POST",
          body: { composition }
        }
      );
      return enhancedComposition;
    },
  });

  return results;
}