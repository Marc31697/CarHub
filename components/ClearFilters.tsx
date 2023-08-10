"use client";

import { CustomButton } from ".";
import { useRouter } from "next/navigation";

const ClearFilters = () => {
  const router = useRouter();
  const handleClearFilters = () => {
    router.push("/", { scroll: false });
  };

  return (
    <>
      <CustomButton
        title="Clear Filters"
        btnType="button"
        containerStyles="bg-primary-blue text-white rounded-full mt-10"
        handleClick={handleClearFilters}
      />
    </>
  );
};

export default ClearFilters;
