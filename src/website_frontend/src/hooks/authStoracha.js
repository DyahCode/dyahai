import * as Client from '@storacha/client'
import { StoreMemory } from '@storacha/client/stores/memory'
import * as Proof from '@storacha/client/proof'
import { Signer } from '@storacha/client/principal/ed25519'
import { CID } from 'multiformats/cid'

let clientInstance = null;

export const getStorachaClient = async () => {
    if (clientInstance) return clientInstance;
    const principal = Signer.parse(process.env.STORACHA_API_KEY);
    const store = new StoreMemory();
    const client = await Client.create({
        principal,
        store,
        space: {
            name: "my-space",
            enableIndex: true,
        },
    });

    const proof = await Proof.parse(process.env.STORACHA_PROOF);
    const space = await client.addSpace(proof);
    await client.setCurrentSpace(space.did());
    clientInstance = client;
    return client;
};

export const uploadBlobToStoracha = async (file) => {
    const client = await getStorachaClient();
    const result = await client.uploadFile(file);
    return result;
};

export const removeAllContentFromStoracha = async () => {
    const client = await getStorachaClient();
    const contents = await client.capability.upload.list();
    if (contents.size === 0) {
        return;
    }

    for (const content of contents.results) {
        const rootBytes = content.root["/"];
        const rootLink = CID.decode(rootBytes).link();
        try {
            await client.remove(rootLink, { shards: true });
            console.log("deleted content from storacha");
        } catch (error) {
        }
    }
};
export const removeContentFromStoracha = async (id) => {
    const client = await getStorachaClient();
    const rootLink = CID.parse(id).link();
    try {
        console.log("deleting content from storacha");
        await client.remove(rootLink, { shards: true });
        console.log("content has been deleted from storacha");
    } catch (error) {
    }
};