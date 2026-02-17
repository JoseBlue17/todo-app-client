import { useInfiniteQuery } from '@tanstack/react-query';
import { Http } from '@/config/http';
import { type AxiosResponseError, useShowError } from '@/hooks';
import type { Todo } from '@/interfaces';
import { useEffect } from 'react';

const PAGE_SIZE = 10;

export function useGetTodos() {
  const { showError } = useShowError();

  const query = useInfiniteQuery<Todo[], AxiosResponseError>({
    queryKey: ['TASKS'],
    queryFn: ({ pageParam }) => {
      return Http.get<{ tasks: Todo[] }>('/tasks', {
        params: { cursor: pageParam, size: PAGE_SIZE },
      }).then(({ data }) => data.tasks || []);
    },
    getNextPageParam: lastPage => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return lastPage[lastPage.length - 1]?._id;
    },
    initialPageParam: undefined,
    staleTime: 0,
  });

  useEffect(() => {
    if (query.isError && query.error) {
      showError(query.error);
    }
  }, [query.isError, query.error, showError]);

  return {
    todos: query.data?.pages.flat() || [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isError: query.isError,
  };
}
