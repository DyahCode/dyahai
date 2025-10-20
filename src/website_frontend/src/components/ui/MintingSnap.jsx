import React, { useState} from "react";
import { Box } from "../layout/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "./Button";
import { usePopup } from "../../provider/PopupProvider";
import { MintNft } from "../../hooks/wallet";
import { BurnTokens } from "../../hooks/wallet";
import PaymentSnap from "./PaymentSnap";

const schema = Yup.object().shape({
  itemName: Yup.string()
    .trim()
    .required("Please input item name!")
    .min(3, "Item name must be at least 3 characters")
    .max(20, "Item name cannot exceed 20 characters"),
  itemDescription: Yup.string()
    .trim()
    .required("Please input item description!")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 100 characters"),
});

const MintingSnap = ({
  showMintingSnap,
  setShowMintingSnap,
  actor,
  principalId,
  minting,
  setMinting,
  authClient,
  actorLedger,
  credit,
  refreshCredit
}) => {
  // Popup State
  const { showPopup, hidePopup } = usePopup();
  // Payment Snap State
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [showInvoice, setShowInvoice] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      itemName: "",
      itemDescription: "",
    },
  });


  const burning = async () => {
    setShowInvoice(true);
    setPaymentStatus("processing");

    const message = "Burned 1 DYA to Minting NFT";
    if (authClient.provider !== "Plug") {

      return new Promise((resolve, reject) => {
        showPopup({
          title: "Confirm Transaction",
          message: 'Are you sure you want to burn 1 DYA to mint this NFT?',
          extend: "message",
          extendMessage: 
            {
              Type : 'Burn Token',
              Amount: "1 DYA",
              To: `${process.env.MINTER_PRINCIPAL_ID}`,
              Memo: `${message}`,
            },
          
          type: "default",
          leftLabel: "REJECT",
          onLeft: async () => {
            hidePopup();
            resolve(null);
            setPaymentStatus("failed");
          },
          rightLabel: "APPROVE",
          onRight: async () => {
            hidePopup();
            try {
              const burn = await BurnTokens(actorLedger, message);
              resolve(burn);
            } catch (err) {
              reject(err);
            }
          },
          onClose: async () => {
            hidePopup();
            resolve(null);
            setPaymentStatus("failed");
          },
        });
      });
    } else {
      const burn = await BurnTokens(actorLedger,message);
      return burn;
    }
  };

  const handleFormSubmit = async (data) => {
    setShowMintingSnap(false);
    const burn = await burning();
    console.log("Burn: ", burn);

    if (!burn || !burn.Ok) {
      setPaymentStatus("failed");
      return;
    }
    
    setPaymentStatus("success");
    
    const result = await MintNft(actor, principalId, {
      id: minting.id,
      name: data.itemName,
      description: data.itemDescription,
      url: minting.assets.url,
      mime: minting.assets.mime,
    });

    if (result.Ok) {
      setMinting((prev) => ({
        ...prev,
        is_minted: true,
        is_public: true,
        name: data.itemName,
        description: data.itemDescription,
      }));

      
      showPopup({
        title: "NFT Minted",
        message: `The NFT has been minted successfully.<br>Nft ID: ${Number(result.id)}`,
        type: "success",
        leftLabel: "Done",
        onLeft: () => hidePopup(),
      });
      await refreshCredit(actor,authClient);
    }
  };

  return (
    <>
      {showMintingSnap && (
        <section className="flex w-full h-full justify-center items-center fixed inset-0 bg-black/20 z-[999] backdrop-blur-sm text-white">
          <div className="relative max-w-[55rem] min-h-[16rem] w-[90%] flex flex-col justify-center items-center text-center rounded-xl opacity-95 hover:opacity-100 transition-opacity duration-200 bg-primaryColor overflow-hidden shadow-[0.063em_0.75em_1.563em_rgba(0,0,0,0.78)]">
            {/* Close Button */}
            <div className="flex w-full justify-end items-center p-4">
              <button
                  onClick={() => setShowMintingSnap(false)}
                  className="p-1 rounded-full aspect-square bg-transparent group hover:bg-neutral-800/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 cursor-pointer text-white/50 group-hover:text-white/80 stroke-[2px] fill-none"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
            </div>

            <div className="w-full flex flex-col">
              <div className="w-full flex flex-col md:flex-row gap-4 p-6">
                {/* Preview */}
                <div className="md:w-1/3 w-full  flex flex-col gap-4">
                  <p className="text-lg text-start">Preview</p>
                  <div className="w-40 aspect-square">
                    <img src={minting.assets.url} alt="Preview" />
                  </div>
                </div>

                {/* Form */}
                <Box className="md:w-2/3 w-full gap-4" padding>
                  <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="flex flex-col gap-4 w-full"
                  >
                    {/* Item Name */}
                    <div className="flex flex-col gap-2 justify-center items-start">
                      <label htmlFor="itemName">Item Name*</label>
                      <input
                        id="itemName"
                        type="text"
                        {...register("itemName")}
                        placeholder="Input your item name"
                        className="w-full p-2 rounded-md border border-white/30 bg-transparent text-white focus:outline-none focus:border-white transition"
                      />
                      {errors.itemName && (
                        <p className="text-sm text-red-500 font-medium">
                          {errors.itemName.message}
                        </p>
                      )}
                    </div>

                    {/* Stock */}
                    <div className="w-full flex flex-col gap-2">
                      <p className="w-full text-start">Stock</p>
                      <p className="w-full text-start">Single Item</p>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2 justify-center items-start">
                      <label htmlFor="itemDescription">Description*</label>
                      <p className="text-sm text-start font-medium">
                        The description will be included on the item's detail
                        page. Markdown syntax is supported.
                      </p>
                      <textarea
                        id="itemDescription"
                        {...register("itemDescription")}
                        className="border-2 rounded-md border-white/30 bg-transparent w-full h-32 p-2"
                        placeholder="Provide a detailed description of your item"
                      />
                      {errors.itemDescription && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.itemDescription.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button type="primary" centering className="w-full">
                      Minting
                    </Button>
                  </form>
                </Box>
              </div>
            </div>
          </div>
        </section>
      )}
      <PaymentSnap
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
        showInvoice={showInvoice}
        setShowInvoice={setShowInvoice}
        authClient={authClient}
      />
    </>
  );
};

export default MintingSnap;
