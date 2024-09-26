import React from "react";

import clsx from "clsx";

function Button({ children, onClick }) {
  return (
    <button
      data-vaul-no-drag=""
      className=" flex h-12 w-full items-center gap-[15px] rounded-[16px] bg-[#F7F8F9] px-4 text-[17px] font-semibold text-[#222222] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, className }) {
  return (
    <button
      data-vaul-no-drag=""
      className={clsx(
        "flex h-12 w-full items-center justify-center gap-[15px] rounded-full text-center text-[19px] font-semibold transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Header({ title, description }) {
  return (
    <header className="mt-[21px]">
      {/* {icon} */}
      <h2 className="mt-2.5 text-[22px] font-semibold text-[#222222] md:font-medium">
        {title}
      </h2>

      <p className="mt-3 text-[17px] font-medium leading-[24px] text-[#999999] md:font-normal">
        {description}
      </p>
    </header>
  );
}

function Phrase({ setView }) {
  return (
    <div>
      <div className="px-2">
        <Header
          // icon={<RecoveryPhraseIcon />}
          title="Secret Recovery Phrase"
          description="Your Secret Recovery Phrase is the key used to back up your wallet. Keep it secret at all times."
        />
        <ul className="mt-6 space-y-4 border-t border-[#F5F5F5] pt-6">
          <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
            {/* <ShieldIcon /> */}
            Keep your Secret Phrase safe
          </li>
          <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
            {/* <PassIcon /> */}
            Don’t share it with anyone else
          </li>
          <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
            {/* <BannedIcon /> */}
            If you lose it, we can’t recover it
          </li>
        </ul>
      </div>
      <div className="mt-7 flex gap-4">
        <SecondaryButton
          onClick={() => setView("default")}
          className="bg-[#F0F2F4] text-[#222222]"
        >
          Cancel
        </SecondaryButton>
        <SecondaryButton
          onClick={() => setView("default")}
          className="bg-[#4DAFFF] text-[#FFFFFF]"
        >
          {/* <FaceIDIcon /> */}
          Reveal
        </SecondaryButton>
      </div>
    </div>
  );
}

function Key({ setView }) {
  return (
    <div>
      <div className="px-2">
        <Header
          // icon={<RecoveryPhraseIcon />}
          title="Private Key"
          description="Your Private Key is the key used to back up your wallet. Keep it
			  secret and secure at all times."
        />
        <ul className="mt-6 space-y-4 border-t border-[#F5F5F5] pt-6">
          <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
            {/* <ShieldIcon /> */}
            Keep your private key safe
          </li>
          <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
            {/* <PassIcon /> */}
            Don’t share it with anyone else
          </li>
          <li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
            {/* <BannedIcon /> */}
            If you lose it, we can’t recover it
          </li>
        </ul>
      </div>
      <div className="mt-7 flex gap-4">
        <SecondaryButton
          onClick={() => setView("default")}
          className="bg-[#F0F2F4] text-[#222222]"
        >
          Cancel
        </SecondaryButton>
        <SecondaryButton
          onClick={() => setView("default")}
          className="bg-[#4DAFFF] text-[#FFFFFF]"
        >
          {/* <FaceIDIcon /> */}
          Reveal
        </SecondaryButton>
      </div>
    </div>
  );
}

function RemoveWallet({ setView }) {
  return (
    <div>
      <div className="px-2">
        <Header
          // icon={<DangerIcon />}
          title="Are you sure?"
          description="You haven’t backed up your wallet yet. If you remove it, you could lose access forever. We suggest tapping and backing up your wallet first with a valid recovery method."
        />
        <div className="mt-7 flex gap-4">
          <SecondaryButton
            onClick={() => setView("default")}
            className="bg-[#F0F2F4] text-[#222222]"
          >
            Cancel
          </SecondaryButton>
          <SecondaryButton
            onClick={() => setView("default")}
            className="bg-[#FF3F40] text-[#FFFFFF]"
          >
            Continue
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}

function DefaultView({ setView }) {
  return (
    <>
      <header className="mb-4 flex h-[72px] items-center border-b border-[#F7F7F7] pl-2">
        <h2 className="text-[19px] font-semibold text-[#222222] md:font-medium">
          Options
        </h2>
      </header>
      <div className="space-y-3">
        <Button
          onClick={() => {
            setView("key");
          }}
        >
          {/* <LockIcon /> */}
          View Private Key
        </Button>
        <Button
          onClick={() => {
            setView("phrase");
          }}
        >
          {/* <PhraseIcon /> */}
          View Recovery Phase
        </Button>
        <button
          className="flex h-12 w-full items-center gap-[15px] rounded-[16px] bg-[#FFF0F0] px-4 text-[17px] font-semibold text-[#FF3F40] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium"
          onClick={() => {
            setView("remove");
          }}
        >
          {/* <WarningIcon /> */}
          Remove Wallet
        </button>
      </div>
    </>
  );
}

import { useMemo, useState } from "react";
import { Drawer } from "vaul";
import useMeasure from "react-use-measure";
import { motion } from "framer-motion";
import { LockClosedIcon } from "@heroicons/react/solid";

export default function FamilyDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("default");
  const [elementRef, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (view) {
      case "default":
        return <DefaultView setView={setView} />;
      case "remove":
        return <RemoveWallet setView={setView} />;
      case "phrase":
        return <Phrase setView={setView} />;
      case "key":
        return <Key setView={setView} />;
    }
  }, [view]);

  return (
    <>
      <button
        className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[44px] rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-black transition-colors hover:bg-[#F9F9F8] focus-visible:shadow-focus-ring-button md:font-medium"
        onClick={() => setIsOpen(true)}
      >
        Try it out
      </button>
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 z-10 bg-black/30"
            onClick={() => setIsOpen(false)}
          />
          <Drawer.Content
            asChild
            className="fixed inset-x-4 bottom-4 z-10 mx-auto max-w-[361px] overflow-hidden rounded-[36px] bg-[#FEFFFE] outline-none md:mx-auto md:w-full"
          >
            <motion.div animate={{ height: bounds.height }}>
              <Drawer.Close asChild>
                <button
                  data-vaul-no-drag=""
                  className="absolute right-8 top-7 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F8F9] text-[#949595] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-75"
                >
                  <LockClosedIcon />
                </button>
              </Drawer.Close>
              <div ref={elementRef} className="px-6 pb-6 pt-2.5 antialiased">
                {content}
              </div>
            </motion.div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
