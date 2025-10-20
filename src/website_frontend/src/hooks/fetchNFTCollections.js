import { fetchAllCollections, fetchUserCollections } from "./wallet";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory, canisterId } from "../../../declarations/nft";

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


async function CreateAnonAgent(host) {
  const agent = HttpAgent.create({
    host: host,
    shouldFetchRootKey: process.env.DFX_NETWORK !== "ic",

  });
  return agent;
}
/**
 * Fetch NFT 
 * @returns {Promise<Array>} 
 */
export const fetchAllNFT = async () => {
  const host =
    process.env.DFX_NETWORK === "ic"
      ? "https://icp0.io"
      : "http://localhost:5000";

  const anonimAgent = await CreateAnonAgent(host);
  const actor = Actor.createActor(idlFactory, {
    agent: anonimAgent,
    canisterId: canisterId
  });
  try {
    const allResponse = await fetchAllCollections(actor);

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
 * Fetch NFT user 
 * @param {Object} userNFT 
 * @returns {Promise<Array>} 
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


