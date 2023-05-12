import { City, Country, CountryState, CountryStateCity, State } from "../types";
import axios from "axios";

let countries: Country[] = [];
let states: CountryState[] = [];
let cities: CountryStateCity[] = [];

axios
  .get(
    "https://raw.githubusercontent.com/venkatmcajj/react-country-state-city/master/data/countriesminified.json"
  )
  .then((res) => {
    if (res.data) {
      countries = res.data;
    }
  });
axios
  .get(
    "https://raw.githubusercontent.com/venkatmcajj/react-country-state-city/master/data/statesminified.json"
  )
  .then((res) => {
    if (res.data) {
      states = res.data;
    }
  });
axios
  .get(
    "https://raw.githubusercontent.com/venkatmcajj/react-country-state-city/master/data/citiesminified.json"
  )
  .then((res) => {
    if (res.data) {
      cities = res.data;
    }
  });
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
