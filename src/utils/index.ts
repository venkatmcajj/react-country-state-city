import { City, Country, CountryState, CountryStateCity, State } from "../types";
import axios from "axios";

export const GetCountries = async (): Promise<Country[] | []> => {
  const countries = await axios.get(
    "https://raw.githubusercontent.com/venkatmcajj/react-country-state-city/master/data/countriesminified.json"
  );
  return countries.data as Array<Country>;
};

export const GetState = async (id: number): Promise<Array<State> | []> => {
  const states = await axios.get(
    "https://raw.githubusercontent.com/venkatmcajj/react-country-state-city/master/data/statesminified.json"
  );
  const record = states.data as Array<CountryState>;
  const statesone = record.find((e: CountryState) => e.id === id);
  const state = statesone && statesone.states ? statesone.states : [];
  return state;
};

export const GetCity = async (
  countryid: number,
  stateid: number
): Promise<Array<City> | []> => {
  const cities = await axios.get(
    "https://raw.githubusercontent.com/venkatmcajj/react-country-state-city/master/data/citiesminified.json"
  );
  const record = cities.data as Array<CountryStateCity>;
  const countries = record.find((e: CountryStateCity) => e.id === countryid);
  if (countries) {
    const states = countries && countries.states ? countries.states : [];
    const city = states.find((e) => e.id === stateid);
    return city && city.cities ? city.cities : [];
  } else {
    return [];
  }
};
