import { assertEquals, normalizeSteamID, Unwrap } from "./deps.test.ts";

Deno.test("fn.normalizeSteamID > throw error on improper ID3 format", () => {
  assertEquals(normalizeSteamID("U:15156666") instanceof Error, true);
});

Deno.test("fn.normalizeSteamID > don't throw error on proper ID3 format", () => {
  assertEquals(normalizeSteamID("U:1:291312264") instanceof Error, false);
});

Deno.test("fn.SteamID3 normalization > SteamID", () => {
  const result = normalizeSteamID("U:1:100758751");
  assertEquals(
    Unwrap(result).id,
    "STEAM_0:1:50379375",
  );
});
Deno.test("fn.SteamID3 normalization > SteamID3", () =>
  assertEquals(
    Unwrap(normalizeSteamID("U:1:100758751")).id3,
    "U:1:100758751",
  ));
Deno.test("fn.SteamID3 normalization > SteamID32", () =>
  assertEquals(
    Unwrap(normalizeSteamID("U:1:100758751")).id32,
    "100758751",
  ));
Deno.test("fn.SteamID3 normalization > SteamID64", () =>
  assertEquals(
    Unwrap(normalizeSteamID("U:1:100758751")).id64,
    "76561198061024479",
  ));

Deno.test("fn.SteamID32 normalization > SteamID", () =>
  assertEquals(
    Unwrap(normalizeSteamID("221531503")).id,
    "STEAM_0:1:110765751",
  ));
Deno.test("fn.SteamID32 normalization > SteamID3", () =>
  assertEquals(
    Unwrap(normalizeSteamID("221531503")).id3,
    "U:1:221531503",
  ));
Deno.test("fn.SteamID32 normalization > SteamID32", () =>
  assertEquals(
    Unwrap(normalizeSteamID("221531503")).id32,
    "221531503",
  ));
Deno.test("fn.SteamID32 normalization > SteamID64", () =>
  assertEquals(
    Unwrap(normalizeSteamID("221531503")).id64,
    "76561198181797231",
  ));

Deno.test("fn.SteamID64 normalization > SteamID", () =>
  assertEquals(
    Unwrap(normalizeSteamID("76561198068690005")).id,
    "STEAM_0:1:54212138",
  ));
Deno.test("fn.SteamID64 normalization > SteamID3", () =>
  assertEquals(
    Unwrap(normalizeSteamID("76561198068690005")).id3,
    "U:1:108424277",
  ));
Deno.test("fn.SteamID64 normalization > SteamID32", () =>
  assertEquals(
    Unwrap(normalizeSteamID("76561198068690005")).id32,
    "108424277",
  ));
Deno.test("fn.SteamID64 normalization > SteamID64", () =>
  assertEquals(
    Unwrap(normalizeSteamID("76561198068690005")).id64,
    "76561198068690005",
  ));
