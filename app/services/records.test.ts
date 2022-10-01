import records from "../services/records";

test("nothing is parsed if the input message is null or empty", async () => {
  const input = "";
  const result = await records(input);

  expect(result).toEqual({ mentions: [], links: [], emoticons: [] });
});

test("should parse mentions properly", async () => {
  const input = "@chris you around?";
  const result = await records(input);

  expect(result).toEqual({ mentions: ["chris"], links: [], emoticons: [] });
});

test("should parse emoticons properly", async () => {
  const input = "Good morning! (megusta) (coffee) (over15charactersemoticon)";
  const result = await records(input);

  expect(result).toEqual({
    mentions: [],
    links: [],
    emoticons: ["megusta", "coffee"],
  });
});

test("should parse links properly", async () => {
  const input = "Olympics are starting soon; http://www.nbcolympics.com";
  const result = await records(input);

  expect(result).toEqual({
    mentions: [],
    links: [{ url: "http://www.nbcolympics.com", title: "" }],
    emoticons: [],
  });
});

test("should parse all components properly", async () => {
  const input =
    "@bob @john (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016";
  const result = await records(input);

  expect(result).toEqual({
    mentions: ["bob", "john"],
    links: [
      {
        url: "https://twitter.com/jdorfman/status/430511497475670016",
        title: "",
      },
    ],
    emoticons: ["success"],
  });
});
