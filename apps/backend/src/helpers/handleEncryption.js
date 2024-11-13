import bcrypt from "bcrypt";

export const encryption = {
  async encrypt(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  },

  async compare(password, hash) {
    const match = await bcrypt.compare(password, hash);
    return match;
  },
};
