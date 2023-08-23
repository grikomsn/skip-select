import type { MatchSorterOptions } from "match-sorter";
import { matchSorter } from "match-sorter";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useMemo, useState } from "react";

interface WrapMatchSorterProps<TData> {
  data: TData[];
  options?: MatchSorterOptions<TData>;
  children: ChildrenFn<TData>;
}

/**
 * Wrapper component around {@link matchSorter} with provided `query` state for filtering.
 *
 * @example
 * ```tsx
 * const data = [...];
 *
 * return (
 *   <WrapMatchSorter data={data}>
 *     {({ query, setQuery, filtered, original }) => (
 *       <>
 *         <Input value={query} onChange={(e) => setQuery(e.target.value)} />
 *         <Table data={filtered} columns={columns} />
 *       </>
 *     )}
 *   </WrapMatchSorter>
 * );
 * ```
 */
export const WrapMatchSorter = <TData,>({ data, options, children }: WrapMatchSorterProps<TData>) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return data;
    return matchSorter(data, query, options);
  }, [data, options, query]);

  return children({
    query,
    setQuery,
    filtered,
    original: data,
  });
};

type ChildrenFn<TData> = (args: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  filtered: TData[];
  original: TData[];
}) => ReactNode;
