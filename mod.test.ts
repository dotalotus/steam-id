import { assertEquals, normalizeSteamID, Unwrap } from "./deps.test.ts";

Deno.test("fn.normalizeSteamID > throw error on improper ID3 format", () => {
  assertEquals(normalizeSteamID("U:15156666") instanceof Error, true);
});

Deno.test("NormalizeSteamID function > Throws error when given improperly formatted ID3", () => {
  assertEquals(normalizeSteamID("U:15156666") instanceof Error, true);
});

Deno.test("NormalizeSteamID function > Does not throw error when given properly formatted ID3", () => {
  assertEquals(normalizeSteamID("U:1:291312264") instanceof Error, false);
});

Deno.test("NormalizeSteamID function > Normalizes SteamID3 to correct SteamID", () => {
  const result = normalizeSteamID("U:1:100758751");
  assertEquals(
    Unwrap(result).id,
    "STEAM_0:1:50379375",
  );
});
Deno.test("NormalizeSteamID function > Retains original SteamID3 when normalizing", () =>
  assertEquals(
    Unwrap(normalizeSteamID("U:1:100758751")).id3,
    "U:1:100758751",
  ));
Deno.test("NormalizeSteamID function > Normalizes SteamID3 to correct SteamID32", () =>
  assertEquals(
    Unwrap(normalizeSteamID("U:1:100758751")).id32,
    "100758751",
  ));
Deno.test("NormalizeSteamID function > Normalizes SteamID3 to correct SteamID64", () =>
  assertEquals(
    Unwrap(normalizeSteamID("U:1:100758751")).id64,
    "76561198061024479",
  ));

Deno.test("NormalizeSteamID function > Normalizes SteamID32 to correct SteamID", () =>
  assertEquals(
    Unwrap(normalizeSteamID("221531503")).id,
    "STEAM_0:1:110765751",
  ));
Deno.test("NormalizeSteamID function > Normalizes SteamID32 to correct SteamID3", () =>
  assertEquals(
    Unwrap(normalizeSteamID("221531503")).id3,
    "U:1:221531503",
  ));
Deno.test("NormalizeSteamID function > Retains original SteamID32 when normalizing", () =>
  assertEquals(
    Unwrap(normalizeSteamID("221531503")).id32,
    "221531503",
  ));
Deno.test("NormalizeSteamID function > Normalizes SteamID32 to correct SteamID64", () =>
  assertEquals(
    Unwrap(normalizeSteamID("221531503")).id64,
    "76561198181797231",
  ));

Deno.test("NormalizeSteamID function > Normalizes SteamID64 to correct SteamID", () =>
  assertEquals(
    Unwrap(normalizeSteamID("76561198068690005")).id,
    "STEAM_0:1:54212138",
  ));
Deno.test("NormalizeSteamID function > Normalizes SteamID64 to correct SteamID3", () =>
  assertEquals(
    Unwrap(normalizeSteamID("76561198068690005")).id3,
    "U:1:108424277",
  ));
Deno.test("NormalizeSteamID function > Normalizes SteamID64 to correct SteamID32", () =>
  assertEquals(
    Unwrap(normalizeSteamID("76561198068690005")).id32,
    "108424277",
  ));
Deno.test("NormalizeSteamID function > Retains original SteamID64 when normalizing", () =>
  assertEquals(
    Unwrap(normalizeSteamID("76561198068690005")).id64,
    "76561198068690005",
  ));
