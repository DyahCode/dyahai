import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { idlFactory as website_backend_idl,website_backend,canisterId } from "../../../declarations/website_backend";
import { idlFactory as ledger_idl } from "../../../declarations/dyahai_token";
import { idlFactory as ledgerIndex_idl , dyahai_token_index } from "../../../declarations/dyahai_token_index";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import { usePopup } from "./PopupProvider";
import { fetchBalance } from "../hooks/wallet";
import { PlugLogin, CreateActor } from "ic-auth";

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

  const whitelist = [process.env.CANISTER_ID_WEBSITE_BACKEND];

  const host =
    process.env.DFX_NETWORK == "ic"
      ? "https://icp0.io"
      : "http://localhost:5000";

  useEffect(() => {
    (async () => {
      await checkConnection();
    })();
  }, []);

  const checkingPlugInstalled = async () => {
    if (!window.ic?.plug) {
      hidePopup();
      setTimeout(() => {
        showPopup({
          title: "Plug Wallet Not Detected",
          message: "To continue, you need to install Plug Wallet. Please download and install it from the Chrome Web Store, then refresh this page to connect your wallet.",
          type: "default",
          extend: "plugInstruction",
          leftLabel: "Login",
          onLeft: () => { Login() },
        });
      }, 100);
      return false;
    }
    return true;
  };
  const checkConnection = async () => {
    const isConnected = await window.ic?.plug?.isConnected();
    console.log("Plug wallet connected:", isConnected);

    if (isConnected) {
      await initPlug();
    }
  };

  const initPlug = async () => {
    const authclient = await PlugLogin(whitelist, host);
    console.log("PlugLogin userObject:", authclient);
    console.log("provider authclient:", authclient.provider);
    setAuthClient(authclient);
    await buildActor(authclient);
    setIsLoggedIn(true);
    setLoading(false);
    console.log("set Log In");

    const principal = authclient.principal;
    setPrincipalId(principal);
    console.log("User principal ID:", principal);
    window.ic.plug.onExternalDisconnect(() => {
      setAuthClient(null);
      setPrincipalId("");
      setAccountId("");
      setIsLoggedIn(false);
      setCredit(0);
      setActor(null);
      setActorLedger(null);
      setActorIndex(null);
      setAuthClient(null);
      window.location.href = "/";
    });
  };

  const buildActor = async (authclient = authClient) => {
    const newActor = await CreateActor(authclient.agent, website_backend_idl, process.env.CANISTER_ID_WEBSITE_BACKEND);
    console.log("Actor created:", newActor);

    const newActorLedger = await CreateActor(authclient.agent, ledger_idl, process.env.CANISTER_ID_DYAHAI_TOKEN);
    console.log("ActorLedger created:", newActorLedger);

    const newActorIndex = await CreateActor(authclient.agent, ledgerIndex_idl, process.env.CANISTER_ID_DYAHAI_TOKEN_INDEX);
    console.log("ActorIndex created:", newActorIndex);
    setActor(newActor);
    setActorLedger(newActorLedger);
    setActorIndex(newActorIndex);

    await getAccountId(authclient);

    await refreshCredit(newActor, authclient);
  };
  const getAccountId = async (authclient = authClient) => {
    const principal = Principal.fromText(authclient.principal);
    // const principal = await window.ic.plug.agent.getPrincipal();
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
      await customActor.initialize_credit();
      const balance = await fetchBalance(authclient);
      setCredit(Number(balance));
      const getTier = await website_backend.get_tier(authclient.principal);
      setTier(getTier);
    } catch (error) {
      console.error("Failed to refresh credit:", error);
    }
  };

  const TopupCredit = async (amount, type = "credit", credit = 0, plan = "") => {
    if (!actor || !window.ic?.plug) {
      return { success: false, error: "No actor or Plug wallet available" };
    }

    try {
      const result = await window.ic.plug.requestTransfer({
        to: canisterId,
        amount,
      });

      console.log("✅ Plug transfer result:", result);
      const validate_transaction = await actor.get_tx_summary(
        result.height,
        0,
        type,
        String(credit),
        plan
      );

      const summary = JSON.parse(validate_transaction);

      await refreshCredit();

      return {
        success: true,
        data: {
          blockHeight: result.height,
          summary,
        },
      };
    } catch (error) {
      return {
        success: false,
        status: "exception",
        error,
      };
    }
  };
  const Login = useCallback(async () => {
    const installed = await checkingPlugInstalled();
    if (!installed) return;

    await initPlug();
  }, []);

  const Logout = useCallback(async () => {
    if (window.ic?.plug) {
      await window.ic.plug.disconnect();
      setPrincipalId("");
      setIsLoggedIn(false);
      setCredit(0);
      setActor(null);
      setActorLedger(null);
      setActorIndex(null);
      setAuthClient(null);
      window.location.href = "/";
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
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
        dyahai_token_index,
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
