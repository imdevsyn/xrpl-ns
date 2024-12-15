"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Circle } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useAccount } from "wagmi";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { config } from "@/lib/wagmi";
import {
  ABI,
  CONTRACT_ADDRESS,
  XRP_ORACLE_ADDRESS,
  XRP_ORACLE_ABI,
} from "@/lib/constants";
import { parseEther } from "viem";
import { LoaderCircle } from "lucide-react";
import { Modal } from "./Modal";

export const NameSearch = () => {
  const { toast } = useToast();
  // const { data: hash, isPending, error, writeContract } = useWriteContract();
  const [loading, setLoading] = useState(false);
  const [loadingName, setLoadingName] = useState(false);
  const [txStatus, setTxStatus] = useState("reverted");
  const [txHash, setTxHash] = useState("");
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const [inputName, setInputName] = useState("");
  const [years, setYears] = useState(1);
  const [isAvailable, setIsAvailable] = useState(null);
  const [xrpPrice, setXrpPrice] = useState("");
  const REGISTRATION_FEE = 1;
  const increaseYears = () => setYears((prev) => prev + 1);
  const decreaseYears = () => {
    if (years > 1) {
      setYears((prev) => prev - 1);
    }
  };

  const calculateValue = (nameLength, period) => {
    let baseFee;

    if (nameLength > 0 && nameLength <= 3) {
      baseFee = REGISTRATION_FEE * 15;
    } else if (nameLength > 3 && nameLength <= 5) {
      baseFee = REGISTRATION_FEE * 10;
    } else if (nameLength > 5 && nameLength <= 9) {
      baseFee = REGISTRATION_FEE * 5;
    } else {
      baseFee = REGISTRATION_FEE;
    }
    return baseFee * period;
  };

  const handleChange = (event) => {
    const value = event.target.value.trim();
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setInputName(value);
    }
  };

  useEffect(() => {
    if (loadingName) {
      const timer = setTimeout(() => {
        setLoadingName(false);
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loadingName]);

  useEffect(() => {
    const interval = setInterval(getXrpPrice, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputName.length > 0) {
        checkAvailability();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [inputName]);

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (txStatus === "success") {
      setIsModalOpen(true);
    }
  }, [txStatus]);

  const checkAvailability = async () => {
    if (inputName.length > 0) {
      setLoadingName(true);
      setLoading(true);
      try {
        const availability = await readContract(config, {
          abi: ABI,
          address: CONTRACT_ADDRESS,
          functionName: "isAvailable",
          args: [inputName.toLowerCase()],
        });

        setIsAvailable(availability);
      } catch (error) {
        console.error("Error checking availability:", error.message);
        setIsAvailable(null);
      }
    }
  };

  const getXrpPrice = async () => {
    try {
      const price = await readContract(config, {
        abi: XRP_ORACLE_ABI,
        address: XRP_ORACLE_ADDRESS,
        functionName: "priceXRPUSDC",
      });
      setXrpPrice(price);
    } catch (error) {
      console.log(`Error while getting xrp price: ${error.message}`);
    }
  };

  const handleNameRegistry = async () => {
    if (isAvailable && inputName.length > 0) {
      setLoading(true);
      try {
        const nameLength = inputName.length;
        const totalValue = calculateValue(nameLength, years);

        const hash = await writeContract(config, {
          abi: ABI,
          address: CONTRACT_ADDRESS,
          functionName: "registerName",
          args: [inputName.toLowerCase(), years],
          value: parseEther(`${totalValue}`),
          account: address,
        });

        const { status } = await waitForTransactionReceipt(config, {
          hash: hash,
        });
        setTxStatus(status);
        setTxHash(hash);
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } finally {
        setName(inputName);
        setInputName("");
        setYears(1);
      }
      setLoading(false);
    } else if (inputName.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Name input is empty.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Name is not available.",
      });
    }
  };

  const formattedPrice = (price) => {
    price = Number(price) / 10000;
    const newPrice = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(price);

    return Number(newPrice);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="grid w-full max-w-md gap-1.5">
        <Label
          htmlFor="picture"
          className="flex tracking-tighter gap-2 items-center text-xl"
        >
          <Circle className="w-4 animate-pulse fill-black" />
          XRPL Names
        </Label>
        <Input
          id="picture"
          type="text"
          value={inputName}
          onChange={handleChange}
          placeholder="Search for your .xrpl name"
          className="h-20 p-6 bg-white text-gray-500 rounded-3xl tracking-tighter lg:text-2xl shadow-lg focus-visible:ring-0"
          autoComplete="off"
        />
        {loadingName ? (
          <div className="flex items-center justify-center mt-6 py-4 w-full h-[270px] rounded-3xl  border bg-white">
            <LoaderCircle className="animate-spin text-gray-500" />
          </div>
        ) : isAvailable && inputName != "" ? (
          <div className="flex flex-col mt-6 py-4 w-full h-full max-h-[270px] rounded-3xl  border bg-white">
            <div>
              <h2 className="px-4 text-gray-500">AVAILABLE</h2>
              <Separator className="my-4" />
            </div>
            <div className="flex flex-col gap-2 px-4">
              <div className="flex justify-between">
                <span>Name</span>
                <span>
                  {inputName ? `${inputName}.xrpl` : "perfectname.xrpl"}
                </span>
              </div>
              <div className="flex justify-between items-center space-x-4">
                <span>Time</span>
                <div className="flex gap-1 justify-between items-center">
                  <button
                    onClick={decreaseYears}
                    disabled={loading}
                    className="w-6 rounded-full bg-gray-300 hover:bg-gray-400 text-black focus:outline-none"
                  >
                    -
                  </button>
                  <span className="w-[70px] text-center">
                    {years} {years === 1 ? "year" : "years"}
                  </span>
                  <button
                    onClick={increaseYears}
                    disabled={loading}
                    className="w-6 rounded-full bg-gray-300 hover:bg-gray-400 text-black focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Price</span>
                <p className="flex gap-2 items-center">
                  <span className="text-gray-500 text-sm">
                    $
                    {formattedPrice(xrpPrice) *
                      calculateValue(inputName.length, years)}
                  </span>
                  {calculateValue(inputName.length, years)} XRP
                </p>
              </div>
              <div className="flex justify-end pt-6">
                <RainbowButton
                  className="w-full"
                  onClick={
                    isConnected
                      ? handleNameRegistry
                      : () => {
                          toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description:
                              "Connect your wallet before interacting.",
                          });
                        }
                  }
                  disabled={loading}
                >
                  {loading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Register name"
                  )}
                </RainbowButton>
              </div>
            </div>
          </div>
        ) : (
          !isAvailable &&
          inputName != "" && (
            <div className="flex flex-col mt-6 py-4 w-full max-h-[270px] rounded-3xl  border bg-white">
              <div className="flex justify-between items-center">
                <h2 className="px-4 text-gray-500">REGISTERED</h2>
                <h2 className="px-4 text-gray-500">{inputName}.xrpl</h2>
              </div>
            </div>
          )
        )}
      </div>

      {1 && (
        <Modal
          isOpen={1}
          onClose={handleCloseModal}
          txHash={txHash}
          name={name}
        />
      )}
    </div>
  );
};
