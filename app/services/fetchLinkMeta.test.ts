import fetchLinkMeta from "./fetchLinkMeta";

test("should fetch page title properly #1", async () => {
  const url = "https://twitter.com/jdorfman/status/430511497475670016";
  const meta = await fetchLinkMeta(url);
  expect(meta.title).toBe(
    'Justin Dorfman on Twitter: "nice @littlebigdetail from @HipChat (shows hex colors when pasted in chat). http://t.co/7cI6Gjy5pq" / Twitter'
  );
}, 10000);

test("should fetch page title properly #2", async () => {
  const url = "http://www.nbcolympics.com";
  const meta = await fetchLinkMeta(url);
  expect(meta.title).toBe("Paris 2024 Olympic Games | NBC Olympics");
}, 10000);
