import { addMsg, Err, isErr } from "./deps.ts";

export default class SteamIdentifier {
  /** @description The standard Steam id format. STEAM_0:1:XXXXXXXX */
  id!: string;
  /** @description The user indicator id format, almost identicle to id32. U:1:XXXXXXXXX */
  id3!: string;
  /** @description The friend id format, a 32 bit integer. */
  id32!: string;
  /** @description The community id format, a 64 bit integer. */
  id64!: string;
  /**
   * @implements {normalizeSteamID}
   * @returns A SteamIdentifier object with all the SteamIdentifier values.
   */
  constructor(normalized: NormalizedSteamIdentifier) {
    Object.assign(this, normalized);
  }
  static from(steamid: string) {
    const result = normalizeSteamID(steamid);
    if (isErr(result)) {
      return addMsg(result, "Failed to normalize steamid given: " + steamid);
    }
    return new SteamIdentifier(result);
  }
  static fromID64(steamid: string) {
    const result = normalizeFromID32(steamid);
    if (isErr(result)) {
      return addMsg(result, "Failed to normalize steamid given: " + steamid);
    }
    return new SteamIdentifier(result);
  }
  static fromID32(steamid: string) {
    const result = normalizeFromID32(steamid);
    if (isErr(result)) {
      return addMsg(result, "Failed to normalize steamid given: " + steamid);
    }
    return new SteamIdentifier(result);
  }
}

export const ID0_REGEX = /^STEAM_0:*:*:*/;
export const ID3_REGEX = /^U:1:\d+$/;
export const MAGIC = 76561197960265728n;

export type NormalizedSteamIdentifier = {
  id: string;
  id3: string;
  id32: string;
  id64: string;
};

export function normalizeSteamID(
  steamid: string,
) {
  const is_id3 = ID3_REGEX.test(steamid);
  const is_numeric = !isNaN(Number(steamid));
  const is_id0 = ID0_REGEX.test(steamid);
  if (is_id0) {
    return Err("ID0 is not supported");
  }
  if (is_id3) {
    return normalizeFromID3(steamid);
  }
  if (is_numeric) {
    if (BigInt(steamid) < MAGIC) {
      return normalizeFromID32(steamid);
    }
    if (BigInt(steamid) > MAGIC) {
      return normalizeFromID64(steamid);
    }
  }
  return Err("Invalid Input");
}

export function normalizeFromID32(steamid: string) {
  return {
    id: convertID64toID(String(BigInt(steamid) + 76561197960265728n)),
    id3: `U:1:${steamid}`,
    id32: String(steamid),
    id64: String(BigInt(steamid) + 76561197960265728n),
  };
}
export function normalizeFromID64(steamid: string) {
  return {
    id: convertID64toID(steamid),
    id3: `U:1:${BigInt(steamid) - 76561197960265728n}`,
    id32: String(BigInt(steamid) - 76561197960265728n),
    id64: String(steamid),
  };
}
export function normalizeFromID3(steamid: string) {
  return normalizeFromID32(steamid.substring(4));
}
export function convertID64toID(steamid: string) {
  const bin = BigInt(steamid).toString(2).substring(1, 63).padStart(64, "0");
  const x = parseInt(bin.slice(0, 8), 2);
  const y = parseInt(bin.slice(63), 2);
  const z = parseInt(bin.slice(32, 63), 2);
  return `STEAM_${x}:${y}:${z}`;
}
