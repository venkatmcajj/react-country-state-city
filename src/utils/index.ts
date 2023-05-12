import { City, Country, CountryState, CountryStateCity, State } from "../types";
import countries from "./countriesminified.json";
import states from "./statesminified.json";
import cities from "./citiesminified.json";

export const GetCountries = (): Country[] | [] => {
  return countries as Array<Country>;
};

export const GetState = (id: number): Array<State> | [] => {
  const record = states as Array<CountryState>;
  const statesone = record.find((e: CountryState) => e.id === id);
  const state = statesone && statesone.states ? statesone.states : [];
  return state;
};

export const GetCity = (
  countryid: number,
  stateid: number
): Array<City> | [] => {
  const record = cities as Array<CountryStateCity>;
  const countries = record.find((e: CountryStateCity) => e.id === countryid);
  if (countries) {
    const states = countries && countries.states ? countries.states : [];
    const city = states.find((e) => e.id === stateid);
    return city && city.cities ? city.cities : [];
  } else {
    return [];
  }
};
