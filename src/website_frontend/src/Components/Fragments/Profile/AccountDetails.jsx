import React from "react";
import { useAuth } from "../../../Hooks/authHook";

const AccountDetails = () => {
  const { principalId } = useAuth();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="m-4 min-w-fit rounded-lg bg-slate-100 p-5">
      <p className="pb-2 pl-1 md:text-lg">
        <strong>Account Details</strong>
      </p>
      <div className="flex border-separate flex-col gap-1 rounded-lg border p-1">
        <div className="border-borderShade flex flex-col gap-y-2 rounded-md border border-opacity-20 p-2 text-sm md:flex-row md:text-base">
          <p className="md:w-1/3">
            <strong className="">Username</strong>
          </p>
          <p className="md:w-2/3">DyahAI</p>
        </div>
        <div className="border-borderShade flex flex-col gap-y-2 rounded-md border border-opacity-20 p-2 text-sm md:flex-row md:text-base">
          <p className="md:w-1/3">
            <strong>Principal ID</strong>
          </p>
          <p className="md:w-2/3">{principalId}</p>
        </div>
        <div className="border-borderShade flex flex-col gap-y-2 rounded-md border border-opacity-20 p-2 text-sm md:flex-row md:text-base">
          <p className="md:w-1/3">
            <strong>Create At</strong>
          </p>
          <p className="md:w-2/3">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
