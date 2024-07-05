import { createThirdwebClient, defineChain, getContract } from "thirdweb";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export const client = createThirdwebClient({
  clientId: CLIENT_ID as string,
});

export const chain = defineChain(11155111);

const contractAddress = "0xa0208a600b2091807043a6Adf277911212F4aA79";
const contractAbi = [
  {
    type: "constructor",
    name: "",
    inputs: [
      {
        type: "uint256",
        name: "_startingPrice",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_discountRate",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_duration",
        internalType: "uint256",
      },
      {
        type: "string",
        name: "_auctionItem",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "AuctionEnded",
    inputs: [
      {
        type: "address",
        name: "buyer",
        indexed: false,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amount",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "Refund",
    inputs: [
      {
        type: "address",
        name: "buyer",
        indexed: false,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amount",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "buy",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getPrice",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTime",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "seller",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address payable",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setSold",
    inputs: [
      {
        type: "bool",
        name: "_sold",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "sold",
    inputs: [],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
] as const;

export const CONTRACT = getContract({
  client: client,
  chain: chain,
  address: contractAddress,
  abi: contractAbi,
});
