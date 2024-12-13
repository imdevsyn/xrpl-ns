import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <div className="flex py-10 flex-col lg:flex-row h-full justify-around items-start lg:items-center mt-6 lg:mt-0">
      <div className="w-full lg:max-w-[400px] mb-6 lg:mb-0">
        <h2 className="text-3xl lg:text-6xl mb-4 tracking-tighter">
          Questions? <br />
          See our FAQ
        </h2>
        <p>
          Find answers to common questions in our FAQ and learn how to get the
          most out of XRPL Names.
        </p>
      </div>
      <div className="w-full lg:max-w-[600px]">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base lg:text-lg hover:no-underline font-medium">
              What is XRPL Names?
            </AccordionTrigger>
            <AccordionContent>
              XRPL Names is a decentralized name service built on the XRP Ledger
              (XRPL). It allows users to register, manage, and resolve
              human-readable names instead of long wallet addresses.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base lg:text-lg hover:no-underline font-medium">
              Why should I use XRPL Names?
            </AccordionTrigger>
            <AccordionContent>
              XRPL Names simplifies sending and receiving payments on the XRP
              Ledger by replacing complex wallet addresses with easy-to-remember
              names, enhancing user experience and reducing errors in
              transactions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base lg:text-lg hover:no-underline font-medium">
              How does XRPL Names work?
            </AccordionTrigger>
            <AccordionContent className="">
              XRPL Names maps human-readable names (e.g., crazyfrog.xrpl) to
              XRPL wallet addresses. When users send payments or interact with
              Dapps, they can use the name instead of the wallet address, and
              the system automatically resolves it to the correct address.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-base lg:text-lg hover:no-underline font-medium">
              Is XRPL Names secure?
            </AccordionTrigger>
            <AccordionContent className="">
              Yes. XRPL Names leverages the security of the XRP Ledger, ensuring
              all name registrations and transactions are secure and
              tamper-proof.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-base lg:text-lg hover:no-underline font-medium">
              What are the fees for registering a name?
            </AccordionTrigger>
            <AccordionContent className="">
              The registration fee varies depending on the name length and
              demand. Premium names may have higher fees, while longer or less
              common names may be more affordable.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
