import dotenv from "dotenv";
import { useRouter } from "next/router";

type FilterProps = {
  manufacturer: string;
  year: number;
  fuel: string;
  limit: number;
  model: string;
};

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  const rapidApiKey = process.env.X_RapidAPI_Key;

  if (!rapidApiKey) return null;

  const headers = {
    "X-RapidAPI-Key": rapidApiKey,
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  const result = await response.json();

  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};

// export const resetFilters = () => {
//   const router = useRouter();
//   const { query } = router;

//   // Function to remove filters and reset URL
//   const resetFilters = () => {
//     // Modify the query object to remove filter parameters
//     const newQuery = {
//       ...query,
//       manufacturer: undefined,
//       year: undefined,
//       fuel: undefined,
//       limit: undefined,
//       model: undefined,
//       // Remove other filter parameters as needed
//     };

//     // Replace the current URL with the updated query parameters
//     router.push({ pathname: router.pathname, query: newQuery });
//   };
// };
