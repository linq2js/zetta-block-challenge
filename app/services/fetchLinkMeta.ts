import { LinkMeta } from "../types";
import { unfurl } from "unfurl.js";

export type FetchLinkMetaOptions = {
  cache?: Map<string, Promise<LinkMeta>>;
};

/**
 * this is simple util to fetch page info from specific URL. It works properly with the static rendering content, cannot work with dynamic rendering content
 * @param url
 * @param options
 * @returns
 */
const fetchLinkMeta = (
  url: string,
  options: FetchLinkMetaOptions = {}
): Promise<LinkMeta> => {
  const { cache } = options;
  let cacheItem = cache?.get(url);

  if (cacheItem) return cacheItem;

  cacheItem = unfurl(url)
    .then((meta) => ({ url, title: meta.title ?? "" }))
    // handle network error or the website cannot reach
    .catch(() => ({ url, title: "" }));

  if (cache) {
    cache.set(url, cacheItem);
  }

  return cacheItem;
};

export default fetchLinkMeta;
