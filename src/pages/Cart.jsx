import React, { useState } from "react";
import abi from "../shared/abis/Store.json";

import { ethers } from "ethers";

function Cart({ url, name, price }) {
  const contractAddress = "0xDBa03676a2fBb6711CB652beF5B7416A53c1421D";
  const contractABI = abi.abi;
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const buysProduct = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyProduct = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("buying coffee..");
        const coffeeTxn = await buyProduct.buysProduct(name ? name : "name", {
          value: ethers.utils.parseEther("2"),
        });

        await coffeeTxn.wait();

        console.log("mined ", coffeeTxn.hash);

        console.log("coffee purchased!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-wrapper">
      <div class="card">
        <div class="leftside">
          <img src={url} className="product" alt="Shoes" />
          <div className="left_side_text">
            <h1 className="it">{name}</h1>
            <h1 className="it">{price}</h1>
          </div>
        </div>
        <div class="rightside">
          <form action="">
            <h1 style={{ fontSize: "150%" }}>CheckOut</h1>
            <h2>Information</h2>
            <p>Name</p>
            <input type="text" class="inputbox" name="name" required />
            <p>Email</p>
            <input
              type="text"
              class="inputbox"
              name="email"
              id="email"
              required
            />
            <p>Address</p>
            <input
              type="text"
              class="inputbox"
              name="address"
              id="address"
              required
            />
          </form>
          <button
            class="bg-violet-900 h-12 w-full py-1 px-3 focus:outline-none hover:bg-violet-400  rounded-md text-lg mt-4 md:mt-3 mr-4 text-white"
            // onClick={}
          >
            CheckOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
