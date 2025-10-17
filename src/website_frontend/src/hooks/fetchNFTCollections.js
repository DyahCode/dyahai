import { fetchAllCollections, fetchUserCollections } from "./wallet";

/**
 * Helper untuk parsing metadata NFT
 */
const parseNFTMetadata = (nftMeta) => {
  const obj = {};
  const fields = nftMeta;
  obj.id = fields.id;

  fields.metadata[0].forEach(([key, value]) => {
    if (key === "icrc7:metadata:uri:image") obj.image = value.Text;
    if (key === "icrc7:metadata:uri:name") obj.name = value.Text;
    if (key === "icrc7:metadata:uri:description") obj.description = value.Text;
    if (key === "icrc7:metadata:uri:mime") obj.mime = value.Text;
  });

  return obj;
};

/**
 * Fetch semua NFT dari wallet js
 * @returns {Promise<Array>} Daftar semua NFT
 */
export const fetchAllNFT = async () => {
  try {
    const allResponse = await fetchAllCollections();

    if (allResponse?.status && Array.isArray(allResponse?.metadata)) {
      return allResponse.metadata.map(parseNFTMetadata).reverse();
    }
    return [];
  } catch (err) {
    console.error("Failed to fetch allNFT:", err);
    return [];
  }
};

/**
 * Fetch NFT milik user yang sedang login
 * @param {Object} userNFT - client autentikasi pengguna
 * @returns {Promise<Array>} Daftar NFT milik user
 */
export const fetchUserNFT = async (userNFT) => {
  try {
    const userResponse = await fetchUserCollections(userNFT);

    if (userResponse?.status && Array.isArray(userResponse?.metadata)) {
      return userResponse.metadata.map(parseNFTMetadata).reverse();
    }
    return [];
  } catch (err) {
    console.error("Failed to fetch userNFT:", err);
    return [];
  }
};


