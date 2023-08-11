"use client";

import { useState, Fragment, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";
import { updateSearchParams } from "@/utils";

type OptionProps = {
  title: string;
  value: string;
};

interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const router = useRouter();
  const searchQuery = useSearchParams();

  const [selected, setSelected] = useState(options[0]);

  const handleUpdatePrams = (e: { title: string; value: string }) => {
    const newPath = updateSearchParams(title, e.value.toLowerCase());

    router.push(newPath, { scroll: false });
  };

  useEffect(() => {
    if (!searchQuery.has("year") && !searchQuery.has("fuel")) {
      setSelected(options[0]);
    }
  }, [searchQuery]);

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdatePrams(e);
        }}
      >
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="chevron up down"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
