import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/sectionHomePage/Hero";
import Feature from "../components/layout/sectionHomePage/Feature";
import Advantages from "../components/layout/sectionHomePage/Advantages";
import Gallery from "../components/layout/sectionHomePage/Gallery";
import About from "../components/layout/sectionHomePage/About";
import Footer from "../components/layout/sectionHomePage/Footer";
import { useAuth } from "../provider/authProvider";
const HomePage = () => {
  const { loading, credit, principalId, isLoggedIn, Login, Logout, tier } = useAuth();
  
  return (
    <>
      <div className="font-Poppins flex h-full w-full flex-col justify-center gap-y-40">
        <Navbar navbarStyle="primary" principalId={principalId} isLoggedIn={isLoggedIn} credit={credit} Login={Login} Logout={Logout} loading={loading} tier={tier} />
        <Hero />
        <Feature Login={Login} isLoggedIn={isLoggedIn}/>
        <Advantages />
        <Gallery />
        <About Login={Login} isLoggedIn={isLoggedIn}/>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;

// import { useEffect, useState } from 'react';
// import { website_backend } from '../../../declarations/website_backend';
// import { AuthClient } from '@dfinity/auth-client';
// import { Actor } from '@dfinity/agent';

// const HomePage = () => {
//     const [authClient, setAuthClient] = useState(null);
//     const [principalId, setPrincipalId] = useState('');
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [credit, setCredit] = useState(0);
    
//     useEffect(() => {
//       createAuthClient();
//     }, []);
  
    
//     const createAuthClient = async () => {
//       const client = await AuthClient.create();
//       setAuthClient(client);
//       await onIdentityUpdate(client);
//     };
    
//     const identityProvider = () => {
//       const canisterId = process.env.CANISTER_ID_INTERNET_IDENTITY;
//       if (!canisterId) return '';
  
//       const network = process.env.DFX_NETWORK;
//       if (network === 'local') {
//         return `http://${canisterId}.localhost:4943`;
//       } else if (network === 'ic') {
//         return `https://${canisterId}.ic0.app`;
//       }
//       return `https://${canisterId}.dfinity.network`;
//     };
  
//     const onIdentityUpdate = async (client) => {
//       if (!client) return;
//       Actor.agentOf(website_backend)?.replaceIdentity(client.getIdentity());
//       const isAuth = await client.isAuthenticated();
//       setIsLoggedIn(isAuth);
//       if(isAuth) {
//         handleSubmit();
//         const principal = await client.getIdentity().getPrincipal().toText();
//         setPrincipalId(principal);
//         console.log("principal :", principal);
//       }
//     };
  
//     const Login = async () => {
//       if (!authClient) return;
//       await new Promise((resolve, reject) => 
//         authClient.login({
//           identityProvider: identityProvider(),
//           onSuccess: resolve,
//           onError: reject
//         })
//       );
//       await onIdentityUpdate(authClient);
//     };
  
//     const Logout = async () => {
//       if (!authClient) return;
//       await authClient.logout();
//       await onIdentityUpdate(authClient);
//       window.location.href = '/'
//     };
  
//     const handleSubmit = async () => {
//       try {
//         console.log('feth principal....')
//         await website_backend.initialize_credit();
//         const balance = await website_backend.get_balance();
//         setCredit(balance);
//         console.log("credit :", balance);
//       } catch (error) {
//         console.error('Error fetching balance:', error);
//       }
//     };

//   return (
//     <main className='text-white'>
//       <div>
//       <img src="/logo2.svg" alt="DFINITY logo" />
//       <br />
//       <br />
//         {/* <button type="button" onClick={handleSubmit}>Click Me!</button> */}
//       <button type="button" onClick={Login}>Login</button>
//       <button type="button" onClick={Logout}>Logout</button>
//       <section id='credit'>{credit}</section>
//       <p id='isLoggin'>is login? : {isLoggedIn ? 'yes' : 'no'}</p>
//       </div>
//     </main>
//   );
// };

// export default HomePage;