import { LinkMeta } from "../types";
import regexpString from "./regexpString";

export type RecordsOutput = {
  mentions: string[];
  emoticons: string[];
  links: LinkMeta[];
};

export type RecordsOptions = {
  linkMetaFetcher?: (url: string) => Promise<LinkMeta>;
  acceptedEmoticons?: string[];
  cache?: Map<string, Promise<RecordsOutput>>;
};

const defaultLinkMetaFetcher = async (url: string): Promise<LinkMeta> => ({
  url,
  title: "",
});

/**
 * starts with an '@' and ends when hitting a non-word character.
 */
const MENTION_PATTERN = regexpString(/@[^\W]+/);
/**
 *  emoticons are alphanumeric strings, no longer than 15 characters, contained in parenthesis
 */
const EMOTICON_PATTERN = regexpString(/\([\w\d]{1,15}\)/);
const LINK_PATTERN = regexpString(
  /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
);
const COMBINED_PATTERN = new RegExp(
  `(?:(${MENTION_PATTERN})|(${EMOTICON_PATTERN})|(${LINK_PATTERN}))`,
  "ig"
);

const records = (
  message: string,
  options: RecordsOptions = {}
): Promise<RecordsOutput> => {
  const {
    cache,
    acceptedEmoticons,
    linkMetaFetcher: LinkMetaFetcher = defaultLinkMetaFetcher,
  } = options;

  const parse = async () => {
    // using sets to avoid duplicated values
    const mentions = new Set<string>();
    const emoticons = new Set<string>();
    const links = new Set<string>();

    if (message) {
      message.replace(
        COMBINED_PATTERN,
        (_: string, mention?: string, emoticon?: string, link?: string) => {
          if (mention) {
            // remove @ char
            mentions.add(mention.substring(1));
          } else if (emoticon) {
            if (!acceptedEmoticons || acceptedEmoticons.includes(emoticon)) {
              emoticons.add(
                // remove parentheses
                emoticon.substring(1, emoticon.length - 1)
              );
            }
          } else if (link) {
            links.add(link);
          }
          return "";
        }
      );
    }

    return {
      mentions: Array.from(mentions),
      emoticons: Array.from(emoticons),
      links: links.size
        ? await Promise.all(
            Array.from(links).map((link) => LinkMetaFetcher(link))
          )
        : [],
    };
  };

  let cacheItem = cache?.get(message);

  if (cacheItem) return cacheItem;

  cacheItem = parse();

  if (cache) {
    cache.set(message, cacheItem);
  }

  return cacheItem;
};

export default records;
