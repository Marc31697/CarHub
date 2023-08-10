"use client";

import { useState, Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";

type OptionProps = {
  title: string;
  value: string;
};

interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  return (
    <div className="w-fit">
      <Listbox>
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn"></Listbox.Button>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
