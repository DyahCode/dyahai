import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { idlFactory as website_backend_idl } from "../../../declarations/website_backend";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import { usePopup } from "./PopupProvider";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { showPopup, hidePopup } = usePopup();

  const [loading, setLoading] = useState(true);
  const [principalId, setPrincipalId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credit, setCredit] = useState(0);
  const [actor, setActor] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [tier, setTier] = useState(null);

  const whitelist = [process.env.CANISTER_ID_WEBSITE_BACKEND];

  const host =
    process.env.DFX_NETWORK == "ic"
      ? "https://icp0.io"
      : "http://localhost:5000";

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await window.ic?.plug?.isConnected();
      const hasAgent = window.ic?.plug?.agent;

      if (isConnected && hasAgent) {
        await buildActor();
        setIsLoggedIn(true);

        const principal = await window.ic.plug.agent.getPrincipal();
        setPrincipalId(principal.toText());
      }
      setLoading(false);
    };

    checkConnection();
  }, []);

  const initPlug = async () => {
    if (!window.ic?.plug) {
      return;
    }
    const connected = await window.ic.plug.isConnected();
    if (!connected) {
      await window.ic.plug.requestConnect({
        whitelist,
        host: host,
        onConnectionUpdate: async () => {
          await buildActor()
        },
      });
    }

    await buildActor();
    setIsLoggedIn(true);

    const principal = await window.ic.plug.agent.getPrincipal();
    setPrincipalId(principal.toText());

    window.ic.plug.onExternalDisconnect(() => {
      setPrincipalId("");
      setAccountId("");
      setIsLoggedIn(false);
      setCredit(0);
      setActor(null);
      window.location.href = "/";
    });
  };

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
  };

  const buildActor = async () => {
    const newActor = await window.ic.plug.createActor({
      canisterId: process.env.CANISTER_ID_WEBSITE_BACKEND,
      interfaceFactory: website_backend_idl,
    });

    setActor(newActor);
    await getAccountId(newActor);

    await refreshCredit(newActor);
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
    } catch (error) { }
  };

  const TopupCredit = async (amount, type = "credit", credit = 0, plan = "") => {
    if (!actor || !window.ic?.plug) {
      return { success: false, error: "No actor or Plug wallet available" };
    }

    try {
      const canisterPrincipalStr = await actor.get_account_id_for_canister();
      const result = await window.ic.plug.requestTransfer({
        to: canisterPrincipalStr,
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
