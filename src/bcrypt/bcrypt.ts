import * as bcrypt from 'bcrypt';

export async function encodeStr(str: string, salt_round: number = 10) {
  const salt: string = await bcrypt.genSalt(salt_round);
  return bcrypt.hash(str, salt);
}

export async function compareStrWithHash(str: string, hash: string) {
  return bcrypt.compare(str, hash);
}
