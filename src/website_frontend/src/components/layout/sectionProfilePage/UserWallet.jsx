import { useState, useEffect } from "react";
import { useAuth } from "../../../provider/authProvider";
import { Box } from "../Container";
import { TransferToken } from "../../../hooks/wallet";
import { useNavigate } from "react-router-dom";
import { fetchUserNFT } from "../../../hooks/fetchNFTCollections";
import { TransferNft } from "../../../hooks/wallet";
import Button from "../../ui/Button";
import { usePopup } from "../../../provider/PopupProvider";
import * as Yup from "yup";

const tokenSchema = Yup.object().shape({
  receiver: Yup.string().required("Receiver is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be greater than 0")
    .typeError("Amount must be a number"),
});

const nftSchema = Yup.object().shape({
  nftReceiver: Yup.string().required("Receiver principal is required"),
});

const WalletPage = () => {
  const { credit,actor, actorLedger, actorNft, authClient, principalId, refreshCredit } = useAuth();
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [userNFT, setUserNFT] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [nftReceiver, setNftReceiver] = useState("");
  const [sendingNFT, setSendingNFT] = useState(false);
  const [transferTokenForm, setTransferTokenForm] = useState(false);
  const navigate = useNavigate();
  const { showPopup, hidePopup } = usePopup();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadNFTData = async () => {
      if (authClient) {
        try {
          const nfts = await fetchUserNFT(authClient);
          setUserNFT(nfts);
        } catch (err) {
          console.error("Failed to load NFTs:", err);
        }
      }
    };
    loadNFTData();
  }, [authClient]);

  const transferToken = async () => {
    try {
      setErrors({});
      await tokenSchema.validate({ receiver, amount }, { abortEarly: false });
    } catch (err) {
      if (err.inner) {
        const newErrors = {};
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      } else {
        console.error(err);
      }
      return;
    }

    try {
      setLoading(true);
      const trx = await TransferToken(actorLedger, receiver, Number(amount));
      if (trx.Ok) {
        await refreshCredit(actor,authClient);
        
      showPopup({
        title: "Transfer Success!",
        message: "Token send successfully.",
        type: "success",
        leftLabel: "Ok",
        onLeft: () => {
          hidePopup();
        },
      });

      } else {
        
      showPopup({
        title: "Transfer Failed!",
        message: "Token send failed.",
        type: "warning",
        leftLabel: "Ok",
        onLeft: () => {
          hidePopup();
        },
      });

      }
      console.log("Transaction result:", trx);

      showPopup({
        title: "Transfer Success!",
        message: "Token send successfully.",
        type: "warning",
        leftLabel: "Ok",
        onLeft: () => {
          hidePopup();
        },
      });

      setReceiver("");
      setAmount("");
    } catch (err) {
      console.error(err);

      showPopup({
        title: "Transfer failed!",
        message: "Transfer failed! See console for details.",
        type: "warning",
        leftLabel: "Ok",
        onLeft: () => {
          hidePopup();
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendNFT = async () => {
    try {
      setErrors({});
      await nftSchema.validate({ nftReceiver }, { abortEarly: false });
    } catch (err) {
      if (err.inner) {
        const newErrors = {};
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      } else {
        console.error(err);
      }
      return;
    }

    try {
      setSendingNFT(true);
      console.log("Sending NFT:", selectedNFT.id, "to", nftReceiver);

      const result = await TransferNft(actorNft, nftReceiver, selectedNFT.id);
      console.log("NFT transfer result:", result);

      showPopup({
        title: "Transfer Success!",
        message: "NFT sent successfully.",
        type: "warning",
        leftLabel: "Ok",
        onLeft: () => {
          hidePopup();
        },
      });

      setSelectedNFT(null);
      setNftReceiver("");

      // Refresh NFT list
      const nfts = await fetchUserNFT(authClient);
      setUserNFT(nfts);
    } catch (err) {
      console.error("Error sending NFT:", err);

      showPopup({
        title: "Transfer failed!",
        message: "Transfer failed! See console for details.",
        type: "warning",
        leftLabel: "Ok",
        onLeft: () => {
          hidePopup();
        },
      });
    } finally {
      setSendingNFT(false);
    }
  };

  return (
    <div className="max-h-[100%] overflow-y-auto">
      <div className="flex flex-col border border-borderShade border-opacity-40 rounded-xl bg-secondaryColor min-w-fit px-6 py-8">
        <p className="pb-2 pl-1 md:text-lg md:font-semibold text-neutral-300">
          Your Wallet
        </p>

        <div className="flex flex-col gap-1 rounded-lg mt-4">
          <div className="flex flex-col items-center text-white gap-4">
            <div className="bg-primaryColor/10 border border-borderShade p-2 flex items-center rounded-md w-full flex-col">
              <div className="w-full flex gap-4 items-end">
                <div className="w-[20%] flex flex-col gap-[1px]">
                  <span className="text-sm font-bold mb-3">Your Balance:</span>
                </div>
                <div className="flex-1 flex flex-col gap-[1px]">
                  <span className="text-sm font-bold mb-3">ID Principal:</span>
                </div>
              </div>
              <div className="w-full flex gap-4 items-start">
                <div className="w-[20%] bg-gray-700 rounded-sm flex justify-start px-2 py-1 items-center">
                  <span className="text-md font-bold">{credit} DYA</span>
                </div>
                <div className="flex-1 bg-gray-700 rounded-sm flex justify-start px-2 py-1 items-center">
                  <span className="text-md font-bold">{principalId}</span>
                </div>
              </div>
            </div>

            <div className="w-full flex max-lg:flex-col items-center justify-center gap-4">
              <Button
                type="primary"
                onClick={() => navigate("/topup")}
                withIcon
                centering
                className="w-full"
              >
                <div className="h-6 flex items-center justify-center text-center space-x-2">
                  <div className="w-6 h-fit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-full fill-none stroke-white "
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6zM15.5 12H12m0 0H8.5m3.5 0V8.5m0 3.5v3.5"
                      />
                    </svg>
                  </div>
                  <span>Topup Token</span>
                </div>
              </Button>
              <Button
                type="primary"
                onClick={() => setTransferTokenForm(true)}
                withIcon
                centering
                className="w-full"
              >
                <div className="h-6 flex items-center justify-center text-center space-x-2">
                  <div className="w-6 h-fit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-full fill-white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.04 2.323c1.016-.355 1.992.621 1.637 1.637l-5.925 16.93c-.385 1.098-1.915 1.16-2.387.097l-2.859-6.432l4.024-4.025a.75.75 0 0 0-1.06-1.06l-4.025 4.024l-6.432-2.859c-1.063-.473-1-2.002.097-2.387z" />
                    </svg>
                  </div>
                  <span>Transfer Token</span>
                </div>
              </Button>
            </div>

            <div className="w-full bg-primaryColor p-4 rounded-md border border-borderShade">
              <div className="overflow-y-auto max-h-[380px] md:max-h-[290px] pr-2">
                {userNFT.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No NFTs found.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {userNFT.map((nft) => (
                      <div
                        key={nft.id}
                        className="flex h-full w-full flex-col items-start justify-between border border-borderShade/40 transition-all duration-150 hover:border-borderShade/70 relative group rounded-md overflow-hidden cursor-pointer"
                      >
                        {nft.image ? (
                          <div className="flex flex-col items-center gap-3 ">
                            <img
                              className="w-full aspect-square object-cover"
                              src={nft.image}
                              alt={nft.name}
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3 rounded-md overflow-hidden">
                            No Image
                          </div>
                        )}

                        <div className="flex flex-col w-full">
                          <div className="flex w-full justify-between items-center py-4 px-2 text-md">
                            <h2 className="font-semibold">{nft.name}</h2>
                            <div className="flex justify-center items-center gap-0.5 text-white group-hover:text-accentColor ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                              >
                                <g fill="none" fillRule="evenodd">
                                  <path
                                    fill="currentColor"
                                    d="M10.823 2.393a1.5 1.5 0 0 1 2.355 0l6.603 8.368a2 2 0 0 1 0 2.478l-6.603 8.368a1.5 1.5 0 0 1-2.356 0L4.22 13.24a2 2 0 0 1 0-2.478l6.603-8.368Z"
                                  />
                                </g>
                              </svg>
                              <span className="font-medium"># {nft.id}</span>
                            </div>
                          </div>
                        </div>

                        <div className="h-full w-full absolute invisible group-hover:visible bg-primaryColor/60 flex justify-center items-center">
                          <button
                            onClick={() => setSelectedNFT(nft)}
                            className="rounded-full flex justify-center items-center aspect-square bg-accentColor/30 h-16 p-3 border-2 border-accentColor"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-full fill-accentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.04 2.323c1.016-.355 1.992.621 1.637 1.637l-5.925 16.93c-.385 1.098-1.915 1.16-2.387.097l-2.859-6.432l4.024-4.025a.75.75 0 0 0-1.06-1.06l-4.025 4.024l-6.432-2.859c-1.063-.473-1-2.002.097-2.387z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {selectedNFT && (
              <div className="flex w-full h-full justify-center items-center fixed inset-0 bg-black/70 z-[999] backdrop-blur-sm text-white">
                <Box className="min-w-[400px] p-8 rounded-md bg-primaryColor/80">
                  <div className="w-full flex justify-end">
                    <button
                      onClick={() => setSelectedNFT(null)}
                      className="flex justify-center items-center h-8 aspect-square font-bold text-lg"
                    >
                      X
                    </button>
                  </div>
                  <div className="flex w-full flex-col md:flex-row">
                    <div className="bg-secondaryColor flex justify-center items-center md:w-1/4 w-full">
                      <img
                        className="aspect-square rounded-md w-[180px] md:w-[80%]"
                        src={selectedNFT.image}
                        alt={selectedNFT.name}
                      />
                    </div>
                    <div className="p-8 bg-primaryColor flex-1 flex flex-col gap-4 w-full md:w-2/3">
                      <div className="flex font-bold text-3xl gap-2">
                        <h1>{selectedNFT.name}</h1>
                        <p>#{selectedNFT.id}</p>
                      </div>


                      <div className="flex flex-col justify-center items-start w-full gap-1">
                        <label htmlFor="principal">Receival Principal</label>
                        <input
                          id="principal"
                          type="text"
                          placeholder="Receiver Principal"
                          value={nftReceiver}
                          onChange={(e) => setNftReceiver(e.target.value)}
                          className="w-full bg-fontPrimaryColor/10 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accentColor/60 mb-1"
                        />
                        {errors.nftReceiver && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.nftReceiver}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-end space-x-3 w-full">
                        <Button
                          type="primary"
                          className="w-full"
                          onClick={handleSendNFT}
                          disabled={sendingNFT}
                          centering
                        >
                          {sendingNFT ? "Sending..." : "Send"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Box>
              </div>
            )}

            {transferTokenForm && (
              <div className="flex w-full h-full justify-center items-center fixed inset-0 bg-black/20 z-[999] backdrop-blur-sm text-white">
                <Box className="min-w-[700px] p-8 rounded-md bg-primaryColor/80">
                  <div className="flex justify-center items-center gap-4 flex-col">
                    <div className="w-full flex justify-end">
                      <button
                        onClick={() => setTransferTokenForm(false)}
                        className="flex justify-center items-center h-8 aspect-square font-bold text-lg"
                      >
                        X
                      </button>
                    </div>

                    <div className="flex flex-col justify-center items-start w-full gap-1">
                      <label htmlFor="principal">Receival Principal</label>
                      <input
                        type="text"
                        id="principal"
                        placeholder="Receiver Principal or Address"
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                        className="w-full bg-fontPrimaryColor/10 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accentColor/60"
                      />
                      {errors.receiver && (
                        <p className="text-red-400 text-xs pl-2">
                          {errors.receiver}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col justify-center items-start w-full gap-1">
                      <label htmlFor="amount">Amount</label>
                      <input
                        id="amount"
                        type="number"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-fontPrimaryColor/10 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accentColor/60"
                      />
                      {errors.amount && (
                        <p className="text-red-400 text-xs pl-2">
                          {errors.amount}
                        </p>
                      )}
                    </div>

                    <Button
                      type="primary"
                      className="w-full"
                      onClick={transferToken}
                      disabled={loading}
                      centering
                    >
                      {loading ? "Transferring..." : "Send Token"}
                    </Button>
                  </div>
                </Box>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
