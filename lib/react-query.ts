import { QueryClient } from "@tanstack/react-query";

/**
 * @see https://tanstack.com/query/v4/docs/react/reference/QueryClient
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 60 seconds (in ms)
    },
  },
});
