"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
import {
  writeContract,
  waitForTransactionReceipt,
  readContract,
} from "@wagmi/core";
import { config } from "@/lib/wagmi";
import { ABI, CONTRACT_ADDRESS } from "@/lib/constants";
import { parseEther } from "viem";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";

export function Transfer({ price }: { price: number }) {
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState("reverted");
  const [txHash, setTxHash] = useState("");
  const [from, setFrom] = useState("");
  const [fromAvailability, setFromAvailability] = useState(false);
  const [toAvailability, setToAvailability] = useState(false);
  const [to, setTo] = useState("");
  const { toast } = useToast();

  const checkAvailability = async (name: string) => {
    try {
      const resolved = await readContract(config, {
        abi: ABI,
        address: CONTRACT_ADDRESS,
        functionName: "isAvailable",
        args: [name],
      });
      return resolved;
    } catch (error) {
      console.error(`Error while resolving name: ${(error as Error).message}`);
    }
  };

  const submitTransaction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const fromName = formData.get("from") as string;
    const toName = formData.get("to") as string;
    const amount = formData.get("value") as string;

    try {
      setLoading(true);

      const hash = await writeContract(config, {
        abi: ABI,
        address: CONTRACT_ADDRESS,
        functionName: "transferWithName",
        args: [fromName.toLowerCase(), toName.toLowerCase()],
        value: parseEther(String(amount)),
      });

      const { status } = await waitForTransactionReceipt(config, {
        hash: hash,
        
      });
      setTxHash(hash);
      setTxStatus(status);
      console.log(txStatus);
    } catch (error) {
      console.error(`Error sending transaction ${(error as Error).message}`);
      toast({
        title: "Error while sending tx.",
        description: "Try again!",
      });
    } finally {
      setLoading(false);
      if (txStatus == "success") {
        toast({
          title: "Transaction Successful!",
          action: (
            <a
              href={`https://explorer.xrplevm.org/tx/${txHash}`}
              target="_blank"
              className="text-sm bg-black hover:bg-slate-900 text-white px-3 py-2 rounded-lg"
            >
              View Tx
            </a>
          ),
          className: " bg-green-300",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Transaction Reverted.",
          description: "Try again!",
        });
      }
      setTxStatus("")
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      const isAvailable = (await checkAvailability(from)) as boolean;
      setFromAvailability(isAvailable);
    }, 1000);
    return () => clearTimeout(timer);
  }, [from]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const isAvailable = (await checkAvailability(to)) as boolean;
      setToAvailability(isAvailable);
    }, 1000);
    return () => clearTimeout(timer);
  }, [to]);

  return (
    <form onSubmit={submitTransaction}>
      <div className="relative flex flex-col gap-6 h-full px-6 py-8 bg-gray-900 text-white from-accent-foreground overflow-hidden tracking-tighter items-center text-lg md:text-2xl shadow-lg rounded-3xl border">
        <div className="grid w-full max-w-[90%] items-center gap-1.5">
          <Label htmlFor="from" className="text-lg">
            From
          </Label>
          <div className="flex">
            <Input
              type="text"
              id="from"
              name="from"
              autoComplete="off"
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z0-9]*$/.test(value)) {
                  e.target.value = value;
                  setFrom(value);
                } else {
                  e.target.value = value.replace(/[^a-zA-Z0-9]/g, "");
                }
              }}
              className="h-12 text-slate-100 rounded-l-xl rounded-r-none border-slate-500"
            />
            <div className="flex items-center bg-gray-800 border text-sm px-3 border-slate-500 rounded-r-xl">
              .XRPL
            </div>
          </div>
        </div>
        <div className="grid w-full max-w-[90%] items-center gap-1.5">
          <Label htmlFor="to" className="text-lg">
            To
          </Label>
          <div className="flex">
            <Input
              type="text"
              id="to"
              name="to"
              autoComplete="off"
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z0-9]*$/.test(value)) {
                  e.target.value = value;
                  setTo(value);
                } else {
                  e.target.value = value.replace(/[^a-zA-Z0-9]/g, "");
                }
              }}
              className="h-12 text-lg sm:text-3xl text-slate-100 rounded-l-xl rounded-r-none border-slate-500"
            />
            <div
              className={`flex items-center border text-sm px-3 border-slate-500 rounded-r-xl bg-gray-800`}
            >
              .XRPL
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-[90%] gap-2">
          <Label htmlFor="value" className="text-lg">
            Value
          </Label>
          <div className="flex w-full items-center gap-2">
            <Input
              type="number"
              id="value"
              name="value"
              autoComplete="off"
              className="h-12 text-slate-100 rounded-xl border-slate-500"
            />
            <Button
              variant="outline"
              type="submit"
              className="h-12 rounded-xl border-slate-500"
            >
              {loading ? (
                <LoaderCircle className="animate-spin text-gray-500" />
              ) : (
                <Send className="text-black" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
