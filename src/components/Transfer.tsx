"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  writeContract,
  readContract,
  getTransactionReceipt,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { config } from "@/lib/wagmi";
import { ABI, CONTRACT_ADDRESS } from "@/lib/constants";
import { parseEther } from "viem";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle, Check, X } from "lucide-react";

export function Transfer({
  price,
  connected,
}: {
  price: number;
  connected: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [fromLoading, setFromLoading] = useState(false);
  const [toLoading, setToLoading] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [value, setValue] = useState(0);
  const [fromAvailability, setFromAvailability] = useState<null | boolean>(
    null
  );
  const [toAvailability, setToAvailability] = useState<null | boolean>(null);
  const { toast } = useToast();

  const checkAvailability = async (name: string, field: "from" | "to") => {
    if (field === "from") setFromLoading(true);
    if (field === "to") setToLoading(true);
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
    } finally {
      if (field === "from") setFromLoading(false);
      if (field === "to") setToLoading(false);
    }
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
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

      if (status === "success") {
        toast({
          title: "Transaction Successful!",
          action: (
            <a
              href={`https://explorer.testnet.xrplevm.org/tx/${hash}`}
              target="_blank"
              className="text-sm bg-black hover:bg-slate-900 text-white px-3 py-2 rounded-lg"
            >
              View Tx
            </a>
          ),
          className:"bg-green-300",
        });
      } else if (status === "reverted") {
        const recheck = await getTransactionReceipt(config, {
          hash: hash,
        });

        if (recheck.status === "success") {
          toast({
            title: "Transaction Successful!",
            action: (
              <a
                href={`https://explorer.testnet.xrplevm.org/tx/${hash}`}
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
      }
    } catch (error) {
      console.error(`Error sending transaction ${error as Error}`);
      if (connected) {
        toast({
          variant: "destructive",
          title: "Error while sending tx.",
          description: "Try again!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Wallet error",
          description: "Connect your wallet before interacting.",
        });
      }
    } finally {
      setLoading(false)
      setFrom("");
      setTo("");
      setValue(0);
    }
  };

  useEffect(() => {
    if (!from) return;
    const timer = setTimeout(async () => {
      const isAvailable = (await checkAvailability(from, "from")) as boolean;
      setFromAvailability(isAvailable);
    }, 500);
    return () => clearTimeout(timer);
  }, [from]);

  useEffect(() => {
    if (!to) return;
    const timer = setTimeout(async () => {
      const isAvailable = (await checkAvailability(to, "to")) as boolean;
      setToAvailability(isAvailable);
    }, 500);
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
              value={from}
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
              required
            />
            <div className="w-20 flex items-center justify-center border text-sm px-3 border-slate-500 rounded-r-xl bg-gray-800">
              {fromLoading ? (
                <LoaderCircle className="w-5 animate-spin text-gray-500" />
              ) : !from ? (
                ".XRPL"
              ) : fromAvailability === null ? (
                ".XRPL"
              ) : fromAvailability && from ? (
                <X className="w-5 text-red-500" />
              ) : (
                <Check className="w-5 text-green-500" />
              )}
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
              value={to}
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
              required
            />
            <div className="w-20 flex items-center justify-center border text-sm px-3 border-slate-500 rounded-r-xl bg-gray-800">
              {toLoading ? (
                <LoaderCircle className="w-5 animate-spin text-gray-500" />
              ) : !to ? (
                ".XRPL"
              ) : toAvailability === null ? (
                ".XRPL"
              ) : toAvailability && to ? (
                <X className="w-5 text-red-500" />
              ) : (
                <Check className="w-5 text-green-500" />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-[90%] gap-2">
          <Label htmlFor="value" className="text-lg">
            Value
          </Label>
          <div className="flex w-full items-center gap-2">
            <div className="flex items-center w-full border border-slate-500 rounded-xl pr-4">
              <Input
                type="number"
                id="value"
                name="value"
                value={value ? value : ""}
                step="any"
                onChange={handleValueChange}
                autoComplete="off"
                className="h-12 text-slate-100 rounded-xl border-none shadow-none focus-visible:ring-0"
                required
              />
              <div className="text-slate-500 text-sm">{`$${(
                price * value
              ).toFixed(2)}`}</div>
            </div>
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
