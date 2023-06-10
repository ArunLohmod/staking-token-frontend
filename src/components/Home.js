import { ethers } from "ethers";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ stakingToken }) => {
  const navigate = useNavigate();
  const [stakeInput, setStakeInput] = useState();
  const [unstakeInput, setUnstakeInput] = useState();

  const stakeTokens = async () => {
    if ((stakeInput < 0) | isNaN(stakeInput)) {
      alert("Use a valid input!");
      return;
    }
    try {
      const input = await ethers.utils.parseEther(stakeInput);
      const tx = await stakingToken.stake(input);
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

  const unstakeTokens = async () => {
    if ((unstakeInput < 0) | isNaN(unstakeInput)) {
      alert("Use a valid input!");
      return;
    }
    try {
      const input = await ethers.utils.parseEther(unstakeInput);
      const tx = await stakingToken.unstake(input);
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

  const redeemTokens = async () => {
    try {
      const tx = await stakingToken.redeem();
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
            <h1 className="my-3 text-2xl text-gray-500">Stake Your Token</h1>
          </div>
          <div>
            <div className="mb-6">
              <input
                type="number"
                name="staking-input"
                placeholder="Tokens to stake"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                onChange={(e) => {
                  setStakeInput(e.target.value);
                }}
              />

              <button
                className="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none mt-2"
                onClick={stakeTokens}
              >
                Stake
              </button>
            </div>

            <div className="mb-6">
              <input
                type="number"
                name="unstaking-input"
                placeholder="Tokens to stake"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                onChange={(e) => {
                  setUnstakeInput(e.target.value);
                }}
              />

              <button
                className="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none mt-2"
                onClick={unstakeTokens}
              >
                Unstake
              </button>
            </div>

            <div className="w-full flex flex-row justify-around mt-8">
              <button
                className=" basis-1/3 px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
                onClick={redeemTokens}
              >
                Redeem
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
