const handleRequest =
  (errorHandler: (error: unknown) => void) => async (tryHandler: () => Promise<void>) => {
    try {
      await tryHandler();
    } catch (error) {
      errorHandler(error);
    }
  };

export default { handleRequest };
