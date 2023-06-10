import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

const Mint = ({ stakingToken }) => {
  const navigate = useNavigate();
  const [mintInput, setMintInput] = useState();

  const mintTokens = async () => {
    if ((mintInput < 0) | isNaN(mintInput)) {
      alert("Use valid number");
      return;
    }
    try {
      const tx = await stakingToken.mint({
        value: ethers.utils.parseEther(mintInput),
      });

      await tx.wait();
      navigate("/my-info");
    } catch (error) {
      if (error.error) {
        alert(error.error.message);
      } else {
        console.log(error);
        alert("some error occurred!");
      }
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="max-w-xl p-5 mx-auto my-10 bg-white rounded-md shadow-lg">
          <div className="text-center">
            <h1 className="my-3 text-xl text-gray-500">
              Mint 100000 Tokens per ETH
            </h1>
          </div>
          <div>
            <div className="mb-6">
              <input
                type="number"
                name="mint-input"
                placeholder="amount of ETH"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                onChange={(e) => {
                  setMintInput(e.target.value);
                }}
              />

              <button
                className="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none mt-2"
                onClick={mintTokens}
              >
                Mint
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mint;
