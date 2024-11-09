import { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { website_backend } from "../../../declarations/website_backend";

export const useAuth = () => {
  const [authClient, setAuthClient] = useState(null);
  const [principalId, setPrincipalId] = useState('');
  const [iiUrl, setIiUrl] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credit, setCredit] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const initializeAuthClient = async () => {
      const client = await AuthClient.create();
      if (isMounted) setAuthClient(client);

      const savedPrincipalId = localStorage.getItem('principalId');
      if (savedPrincipalId && isMounted) {
        setPrincipalId(savedPrincipalId);
        setIsLoggedIn(true);

        const principalBalance = await website_backend.getBalance(savedPrincipalId);
        if (isMounted) setCredit(principalBalance.toString());
      }
    };

    initializeAuthClient();

    const intervalId = setInterval(async () => {
      if (principalId) {
        const principalBalance = await website_backend.getBalance(principalId);
        if (isMounted) setCredit(principalBalance.toString());
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [principalId]);

  useEffect(() => {
    const network = process.env.DFX_NETWORK;
    const urlMap = {
      local: `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`,
      ic: `https://${process.env.II_CANISTER_ID}.ic0.app`,
    };
    setIiUrl(urlMap[network] || `https://${process.env.II_CANISTER_ID}.dfinity.network`);
  }, []);

  const Login = async () => {
    if (!authClient) throw new Error('AuthClient belum terinisialisasi');
    authClient.login({
      identityProvider: iiUrl,
      onSuccess: async () => {
        const principal = await authClient.getIdentity().getPrincipal().toText();
        setPrincipalId(principal);
        setIsLoggedIn(true);
        localStorage.setItem('principalId', principal);
        await website_backend.initializeCredit(principal);
        const balance = await website_backend.getBalance(principal);
        setCredit(balance.toString());
        window.location.href = '/';
      },
    });
  };

  const Logout = () => {
    authClient.logout();
    setIsLoggedIn(false);
    setPrincipalId('');
    setCredit(0);
    localStorage.removeItem('principalId');
    window.location.href = '/';
  };

  return { authClient, principalId, credit, iiUrl, isLoggedIn, Login, Logout };
};
