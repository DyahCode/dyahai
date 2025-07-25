import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  idlFactory as website_backend_idl,
  canisterId as website_backend_id,
} from "../../../declarations/website_backend";
import {
  idlFactory as website_icp_ledger_idl,
  canisterId as website_icp_ledger_id,
} from "../../../declarations/icp_ledger";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [principalId, setPrincipalId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credit, setCredit] = useState(0);
  const [actor, setActor] = useState(null);
  // const [actoricp, setActoricp] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [tier, setTier] = useState(null);

  const whitelist = [process.env.CANISTER_ID_WEBSITE_BACKEND];

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await window.ic?.plug?.isConnected();
      const hasAgent = window.ic?.plug?.agent;
      if (isConnected && hasAgent) {
        const principal = await window.ic.plug.agent.getPrincipal();
        setPrincipalId(principal.toText());
        setIsLoggedIn(true);
        await buildActor();
      }
      setLoading(false);
    };
    checkConnection();
  }, []);

  const initPlug = async () => {
    console.log("🔌 initPlug jalan bang");
    if (!window.ic?.plug) {
      console.warn("🔌 Plug wallet extension not detected.");
      return;
    }
    const connected = await window.ic.plug.isConnected();
    console.log("🔌 Plug isConnected:", connected);

    if (!connected) {
      console.log("🔐 Not connected. Requesting connection...");
      await window.ic.plug.requestConnect({
        whitelist,
        host: "https://icp0.io",
        onConnectionUpdate: async () => {
          console.log("🔄 Account switched, rebuilding actor...");
        },
      });
    }

    const principal = await window.ic.plug.agent.getPrincipal();
    setPrincipalId(principal.toText());
    console.log("✅ Connected as:", principal.toText());

    window.ic.plug.onExternalDisconnect(() => {
      console.warn("🔌 Disconnected externally");
      setPrincipalId("");
      setAccountId("");
      setIsLoggedIn(false);
      setCredit(0);
      setActor(null);
      window.location.href = "/";
    });
    await buildActor();
    setIsLoggedIn(true);
  };

  const getAccountId = async (customActor = actor) => {
    if (!customActor) return;
    const principal = await window.ic.plug.agent.getPrincipal();
    const clientPrincipal = Principal.fromText(principal.toText());
    const clientAccountId = AccountIdentifier.fromPrincipal({
      principal: clientPrincipal,
    });
    const canisterPrincipalStr =
      await customActor.get_account_id_for_canister();
    const canisterPrincipal = Principal.fromText(canisterPrincipalStr);
    const canisterAccountId = AccountIdentifier.fromPrincipal({
      principal: canisterPrincipal,
    });
    setClientId(clientAccountId.toHex());
    setAccountId(canisterAccountId.toHex());
    console.log("Client Account Id mas :", clientAccountId.toHex());
    console.log("Client Canister Id mas :", canisterAccountId.toHex());
  };

  const buildActor = async () => {
    const newActor = await window.ic.plug.createActor({
      canisterId: process.env.CANISTER_ID_WEBSITE_BACKEND,
      interfaceFactory: website_backend_idl,
    });
    await new Promise((r) => setTimeout(r, 500));
    // const newActoricp = await window.ic.plug.createActor({
    //   canisterId: website_icp_ledger_id,
    //   interfaceFactory: website_icp_ledger_idl,
    // });

    setActor(newActor);
    // setActoricp(newActoricp);
    await getAccountId(newActor);
    console.log("🎭 Actor built:", newActor);
    // console.log("🎭 Actor built:", newActoricp);
    await refreshCredit(newActor);
  };

  const Login = useCallback(async () => {
    await initPlug();
  }, []);

  const Logout = useCallback(async () => {
    if (window.ic?.plug) {
      await window.ic.plug.disconnect();
      setPrincipalId("");
      setIsLoggedIn(false);
      setCredit(0);
      setActor(null);
      window.location.href = "/";
    }
  }, []);

  const refreshCredit = async (customActor = actor) => {
    try {
      if (!customActor) return;
      await customActor.initialize_credit();
      const balance = await customActor.get_balance();

      setCredit(Number(balance));
      const getTier = await customActor.get_tier();

      setTier(getTier);
      console.log("💰 Credit:", balance.toString());
      console.log("💰 Tier:", getTier);
    } catch (error) {
      console.error("⚠ Error refreshing credit:", error);
    }
  };

  const TopupCredit = async (amount, type = "credit", credit = 0, plan = "") => {
    if (!actor) return { success: false, error: "No actor available" };

    try {
      console.log("💳 Processing payment...");

      const memo = Math.floor(Date.now() / 1000);
      // const canisterPrincipalStr = await actor.get_account_id_for_canister();
      // const canisterPrincipal = Principal.fromText(canisterPrincipalStr);
      // const accountIdentifier = AccountIdentifier.fromPrincipal({
      //   principal: canisterPrincipal,
      // });
      // const toAccount = Array.from(accountIdentifier.toUint8Array());
      // const now = BigInt(Date.now()) * 1_000_000n;

      // const result = await actoricp.transfer({
      //   to: toAccount,
      //   fee: { e8s: 10_000n },
      //   memo: BigInt(memo),
      //   from_subaccount: [],
      //   created_at_time: [{ timestamp_nanos: now }],
      //   amount: { e8s: BigInt(amount) },
      // });

      // if (result.Err) {
      //   console.error("❌ Transfer failed:", result.Err);
      //   return {
      //     success: false,
      //     status: "transfer_failed",
      //     error: result.Err,
      //   };
      // }

      // console.log("✅ Transfer result:", result.Ok);

      const validate_transaction = await actor.get_tx_summary(
        26094431,
        memo,
        type,
        String(credit),
        plan
      );

      const summary = JSON.parse(validate_transaction);
      console.log("🧾 Transaction Summary:", summary);

      await refreshCredit();

      return {
        success: true,
        data: {
          blockHeight: result.Ok,
          summary,
        },
      };
    } catch (error) {
      console.error("⚠ Error during transaction:", error);
      return {
        success: false,
        status: "exception",
        error,
      };
    }
  };


  // useEffect(() => {
  //   const checkConnection = async () => {
  //     const isConnected = await window.ic?.plug?.isConnected();
  //     const hasAgent = window.ic?.plug?.agent;
  //     if (isConnected && hasAgent) {
  //       const principal = await window.ic.plug.agent.getPrincipal();
  //       setPrincipalId(principal.toText());
  //       setIsLoggedIn(true);
  //       await buildActor();
  //     }
  //     setLoading(false);
  //   };
  //   checkConnection();
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        actor,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};



// import { useEffect, useState } from 'react';
// import { website_backend } from '../../../declarations/website_backend';
// import { AuthClient } from '@dfinity/auth-client';
// import { Actor } from '@dfinity/agent';

// export const useAuth = () => {
//   const [authClient, setAuthClient] = useState(null);
//   const [principalId, setPrincipalId] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [credit, setCredit] = useState(0);

//   useEffect(() => {
//     createAuthClient();
//   }, []);

//   const createAuthClient = async () => {
//     const client = await AuthClient.create();
//     setAuthClient(client);
//     await onIdentityUpdate(client);
//   };

//   const identityProvider = () => {
//     const canisterId = process.env.CANISTER_ID_INTERNET_IDENTITY;
//     if (!canisterId) return '';

//     const network = process.env.DFX_NETWORK;
//     if (network === 'local') {
//       return `http://${canisterId}.localhost:4943`;
//     } else if (network === 'ic') {
//       return `https://${canisterId}.ic0.app`;
//     }
//     return `https://${canisterId}.dfinity.network`;
//   };

//   const onIdentityUpdate = async (client) => {
//     if (!client) return;
//     Actor.agentOf(website_backend)?.replaceIdentity(client.getIdentity());
//     const isAuth = await client.isAuthenticated();
//     if(isAuth) {
//       const principal = await client.getIdentity().getPrincipal().toText();
//       setPrincipalId(principal);
//       console.log("principal :", principal);
//       setIsLoggedIn(isAuth);
//       getData();
//     }
//   };

//   const Login = async () => {
//     if (!authClient) return;
//     await new Promise((resolve, reject) =>
//       authClient.login({
//         identityProvider: identityProvider(),
//         onSuccess: resolve,
//         onError: reject
//       })
//     );
//     await onIdentityUpdate(authClient);
//   };

//   const Logout = async () => {
//     if (!authClient) return;
//     await authClient.logout();
//     await onIdentityUpdate(authClient);
//     window.location.href = '/'
//   };

//   const getData = async () => {
//     try {
//       await website_backend.initialize_credit();
//       const balance = await website_backend.get_balance();
//       setCredit(balance);
//       console.log("credit :", balance.toString());
//     } catch (error) {
//       console.error('Error fetching balance:', error);
//     }
//   };

//   return { authClient, principalId, credit, isLoggedIn, Login, Logout, refreshCredit: getData };
// };

// // import { useEffect, useState } from 'react';
// // import { website_backend } from '../../../declarations/website_backend';
// // import { AuthClient } from '@dfinity/auth-client';
// // import { Actor } from '@dfinity/agent';

// // export const useAuth = () => {
// //   const [authClient, setAuthClient] = useState(null);
// //   const [principalId, setPrincipalId] = useState('');
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [credit, setCredit] = useState(0);

// //   useEffect(() => {
// //     createAuthClient();
// //   }, []);

// //   const createAuthClient = async () => {
// //     const client = await AuthClient.create();
// //     setAuthClient(client);
// //     await onIdentityUpdate(client);
// //     // console.log("principal :", principalId);
// //     // console.log("credit :", credit);
// //   };

// //   const identityProvider = () => {
// //     const canisterId = process.env.CANISTER_ID_INTERNET_IDENTITY;
// //     if (!canisterId) return '';

// //     const network = process.env.DFX_NETWORK;
// //     if (network === 'local') {
// //       return `http://${canisterId}.localhost:4943`;
// //     } else if (network === 'ic') {
// //       return `https://${canisterId}.ic0.app`;
// //     }
// //     return `https://${canisterId}.dfinity.network`;
// //   };

// //   const onIdentityUpdate = async (client) => {
// //     if (!client) return;
// //     Actor.agentOf(website_backend)?.replaceIdentity(client.getIdentity());
// //     const isAuth = await client.isAuthenticated();
// //     setIsLoggedIn(isAuth);
// //     if(isAuth) {
// //       handleSubmit();
// //       // const principal = await client.getIdentity().getPrincipal().toText();
// //       // setPrincipalId(principal);
// //     }
// //   };

// //   const Login = async () => {
// //     if (!authClient) return;
// //     await new Promise((resolve, reject) =>
// //       authClient.login({
// //         identityProvider: identityProvider(),
// //         onSuccess: resolve,
// //         onError: reject
// //       })
// //     );
// //     await onIdentityUpdate(authClient);
// //   };

// //   const Logout = async () => {
// //     if (!authClient) return;
// //     await authClient.logout();
// //     await onIdentityUpdate(authClient);
// //     window.location.href = '/'
// //   };

// //   const handleSubmit = async () => {
// //     try {
// //       console.log('feth principal....')
// //       await website_backend.initialize_credit();
// //       const balance = await website_backend.get_balance();
// //       setCredit(balance);
// //     } catch (error) {
// //       console.error('Error fetching balance:', error);
// //     }
// //   };

// //   return { authClient, principalId, credit, isLoggedIn, Login, Logout };
// // };
