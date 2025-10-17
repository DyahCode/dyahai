import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { idlFactory as website_backend_idl, website_backend, canisterId } from "../../../declarations/website_backend";
import { idlFactory as ledger_idl } from "../../../declarations/dyahai_token";
import { idlFactory as ledgerIndex_idl} from "../../../declarations/dyahai_token_index";
import { idlFactory as nft_idl } from "../../../declarations/nft";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import { usePopup } from "./PopupProvider";
import { fetchBalance } from "../hooks/wallet";
import { PlugLogin, CreateActor } from "ic-auth";
import { IdbStorage, AuthClient } from "@dfinity/auth-client";
import { LedgerCanister } from "@dfinity/ledger-icp";
import { HttpAgent } from "@dfinity/agent";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { showPopup, hidePopup } = usePopup();

  const [loading, setLoading] = useState(true);
  const [principalId, setPrincipalId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credit, setCredit] = useState(0);
  const [authClient, setAuthClient] = useState(null);
  const [actor, setActor] = useState(null);
  const [actorIndex, setActorIndex] = useState(null);
  const [actorLedger, setActorLedger] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [tier, setTier] = useState(null);
  const [actorNft, setActorNft] = useState(null);
  const whitelist = [
    process.env.CANISTER_ID_WEBSITE_BACKEND, 
    process.env.CANISTER_ID_DYAHAI_TOKEN, 
    process.env.CANISTER_ID_DYAHAI_TOKEN_INDEX, 
    process.env.CANISTER_ID_NFT];
  const db = new IdbStorage({ dbName: "dyahai", storeName: "authclient", version: 1 });
  const host =
    process.env.DFX_NETWORK == "ic"
      ? "https://icp0.io"
      : "http://localhost:5000";

  useEffect(() => {
    (async () => {
      const method = await db.get("method");
      console.log("method", method);
      if (!method) {
        return;
      }
      await checkConnection(method);
    })();
  }, []);

  const checkConnection = async (method) => {
    let isConnected;
    if (method === "Plug") {
      const isInstalled = await checkingPlugInstalled(method);
      if (!isInstalled) {
        return;
      }
      isConnected = await window.ic?.plug?.isConnected();
    } else {
      const client = await AuthClient.create()
      isConnected = await client.isAuthenticated();
    }
    console.log("isConnected", isConnected);
    if (isConnected) {
      await initLogin(method);
      return;
    }
    Logout();
    return;
  };

  const initLogin = async (method) => {
    let authclient;
    if (method === "Plug") {
      authclient = await PlugLogin(whitelist, host);
      setAuthClient(authclient);
      await db.set("method", authclient.provider);
      await buildActor(authclient);
      window.ic.plug.onExternalDisconnect(async () => {
        await db.remove("method");
        setAuthClient(null);
        setPrincipalId("");
        setAccountId("");
        setIsLoggedIn(false);
        setCredit(0);
        setActor(null);
        setActorLedger(null);
        setActorIndex(null);
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      });
    } else {
      console.log("IdentityLogin");
      const client = await AuthClient.create();
      const isConnected = await client.isAuthenticated();
      if (!isConnected) {
        authclient = await IdentityLogin(client, host);
        setAuthClient(authclient);
        await db.set("method", authclient.provider);
      } else {
        const identity = client.getIdentity();
        const agent = new HttpAgent({
          identity: identity,
          host: host,

        });
        if (process.env.DFX_NETWORK != "ic") {
          await agent.fetchRootKey();
        }
        authclient = {
          principal: identity.getPrincipal().toText(),
          agent: agent,
          provider: "Internet Identity",
        };
        setAuthClient(authclient);
      }
      await buildActor(authclient);
    }
    setIsLoggedIn(true);
    setLoading(false);
    console.log("set Log In");
    const principal = authclient.principal;
    setPrincipalId(principal);
    console.log("User principal ID:", principal);
  };

  const IdentityLogin = async (client, host) => {
    return new Promise((resolve, reject) => {
      client.login({
        identityProvider:
          process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app"
            : `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:5000`,
        onSuccess: async () => {
          try {
            const identity = client.getIdentity();
            const agent = new HttpAgent({ identity, host });

            if (process.env.DFX_NETWORK !== "ic") {
              await agent.fetchRootKey();
            }

            resolve({
              principal: identity.getPrincipal().toText(),
              agent: agent,
              provider: "Internet Identity",
            });
          } catch (e) {
            reject(e);
          }
        },
        onError: (err) => {
          reject(err);
        },
      });
    });
  };

  const buildActor = async (authclient = authClient) => {
    const newActor = await CreateActor(authclient.agent, website_backend_idl, process.env.CANISTER_ID_WEBSITE_BACKEND);

    const newActorLedger = await CreateActor(authclient.agent, ledger_idl, process.env.CANISTER_ID_DYAHAI_TOKEN);

    const newActorIndex = await CreateActor(authclient.agent, ledgerIndex_idl, process.env.CANISTER_ID_DYAHAI_TOKEN_INDEX);

    const newActorNft = await CreateActor(authclient.agent, nft_idl, process.env.CANISTER_ID_NFT);
    setActorNft(newActorNft);

    setActor(newActor);
    setActorLedger(newActorLedger);
    setActorIndex(newActorIndex);
    console.log("All Actors created:");

    await getAccountId(authclient);

    await refreshCredit(newActor, authclient);
  };
  const getAccountId = async (authclient = authClient) => {
    const principal = Principal.fromText(authclient.principal);
    const clientAccountId = AccountIdentifier.fromPrincipal({
      principal: principal,
    });
    const canisterPrincipal = Principal.fromText(canisterId);
    const canisterAccountId = AccountIdentifier.fromPrincipal({
      principal: canisterPrincipal,
    });
    setClientId(clientAccountId.toHex());
    setAccountId(canisterAccountId.toHex());
  };


  const refreshCredit = async (customActor = actor, authclient = authClient) => {
    try {
      if (!customActor) return;
      const isNewUser = await customActor.initialize_credit();
      if (isNewUser) {
        setCredit(10);
      } else {
        const balance = await fetchBalance(authclient);
        setCredit(Number(balance));
      }
      const getTier = await website_backend.get_tier(authclient.principal);
      setTier(getTier);
    } catch (error) {
      console.error("Failed to refresh credit:", error);
    }
  };

  const TopupCredit = async (amount, type = "credit", credit = 0, plan = "") => {
    let result;
    if (authClient.provider === "Plug") {
      if (!actor || !window.ic?.plug) {
        return { status: "failed", error: "No actor or Plug wallet available" };
      }
      result = await window.ic.plug.requestTransfer({
        to: canisterId,
        amount,
      });
      console.log("result:", result);
      if (!result.height) {
        return { status: "failed", error: "Transfer failed" };
      }
    } else {
      const ledger = LedgerCanister.create(
        {
          agent: authClient.agent,
          canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai"
        });
      result = await ledger.transfer({
        to: AccountIdentifier.fromPrincipal({
          principal: Principal.fromText(canisterId),
        }),
        amount: BigInt(amount),
        fee: BigInt(10_000),
        createdAt: BigInt(Date.now() * 1_000_000),
      });
      console.log("result:", result);
      if (!result) {
        return { status: "failed", error: "Transfer failed" };
      }
    }
    try {
      const validate_transaction = await actor.get_tx_summary(
        authClient.provider === "Plug" ? result.height : result,
        0,
        type,
        String(credit),
        plan
      );

      const summary = JSON.parse(validate_transaction);

      await refreshCredit();

      return {
        status: "success",
        data: {
          blockHeight: authClient.provider === "Plug" ? result.height : result,
          summary,
        },
      };
    } catch (error) {
      return {
        status: "error",
        error: error,
      };
    }
  };
  const checkingPlugInstalled = async (method) => {
    if (!window.ic?.plug) {
      hidePopup();
      setTimeout(() => {
        showPopup({
          title: "Plug Wallet Not Detected",
          message: "To continue, you need to install Plug Wallet. Please download and install it from the Chrome Web Store, then refresh this page to connect your wallet.",
          type: "default",
          extend: "plugInstruction",
          leftLabel: "Login",
          onLeft: () => { Login(method) },
        });
      }, 100);
      return false;
    }
    return true;
  };
  const Login = useCallback(async (method) => {
    if (method === "Plug") {
      const installed = await checkingPlugInstalled(method);
      if (!installed) return;
    }
    await initLogin(method);
  }, []);

  const Logout = useCallback(async () => {
    if (await db.get("method") === "Plug") {
      await window.ic.plug.disconnect();

    } else {
      const client = await AuthClient.create()
      await client.logout();
    }
    await db.remove("method");
    setPrincipalId("");
    setIsLoggedIn(false);
    setCredit(0);
    setActor(null);
    setActorLedger(null);
    setActorIndex(null);
    setAuthClient(null);
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        db,
        authClient,
        actor,
        actorIndex,
        actorLedger,
        principalId,
        accountId,
        clientId,
        isLoggedIn,
        Login,
        Logout,
        credit,
        refreshCredit,
        TopupCredit,
        loading,
        tier,
        website_backend,
        actorNft,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
