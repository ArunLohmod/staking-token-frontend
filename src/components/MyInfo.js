import { BigNumber, ethers } from "ethers";
import React, { useState, useEffect } from "react";

const MyInfo = ({ stakingToken, account }) => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState();

  const getInfo = async () => {
    const [totalStake, lastUpdateTime, totalRewards] =
      await stakingToken.getYourDetails();
    const balance = await stakingToken.balanceOf(account);

    const info = {
      totalStake: String(totalStake),
      lastUpdateTime: String(lastUpdateTime),
      totalRewards: String(totalRewards),
      balance: String(balance),
    };

    setInfo(info);
    setLoading(false);
  };

  useEffect(() => {
    getInfo();
  }, [info]);

  if (loading) {
    return <h1 className="text-2xl text-center mt-48">⌛ Loading Items...</h1>;
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="max-w-4xl p-5 mx-auto my-10 bg-white rounded-md shadow-lg">
          <div className="text-center">
            <h1 className="my-3 text-xl text-gray-500">My Info</h1>
            <p className="text-gray-400">
              Token is 18 decimals, but just showing 2 decimal places
            </p>
          </div>
          <div className="w-full flex flex-row justify-around mt-8">
            <div className="px-4 py-4 text-white bg-indigo-500 rounded-md text-center  focus:bg-indigo-600 focus:outline-none">
              {/* Total Staked Amount - {ethers.utils.formatUnits(info.totalStake)} */}
              Total Staked Amount :{" "}
              {Number(
                ethers.utils.formatUnits(
                  BigNumber.from(String(info.totalStake))
                )
              ).toFixed(2)}
            </div>
            <div className="px-4 py-4 text-white bg-indigo-500 rounded-md text-center  focus:bg-indigo-600 focus:outline-none">
              Last Update At : {info.lastUpdateTime}
            </div>
            <div className="px-4 py-4 text-white bg-indigo-500 rounded-md text-center  focus:bg-indigo-600 focus:outline-none">
              {/* Unclaimed Rewards - {ethers.utils.formatUnits(info.totalRewards)} */}
              Unclaimed Rewards :{" "}
              {Number(
                ethers.utils.formatUnits(
                  BigNumber.from(String(info.totalRewards))
                )
              ).toFixed(2)}
            </div>
          </div>
          <div className="w-full flex flex-row justify-around mt-8">
            <div className="px-4 py-4 text-white bg-indigo-500 rounded-md text-center  focus:bg-indigo-600 focus:outline-none">
              {/* Balance - {ethers.utils.formatUnits(info.balance)} */}
              Balance :{" "}
              {Number(
                ethers.utils.formatUnits(BigNumber.from(String(info.balance)))
              ).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyInfo;
