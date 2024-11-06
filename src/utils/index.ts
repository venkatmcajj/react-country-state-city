import {
  City,
  Country,
  CountryState,
  CountryStateCity,
  Language,
  Region,
  State,
} from "../types";

export const GetRegions = async (): Promise<Region[] | []> => {
  const regions = await fetch(
    "https://venkatmcajj.github.io/react-country-state-city/data/regionsminified.json"
  ).then((res) => res.json());
  return regions as Array<Region>;
};
export const GetCountries = async (_region?: string): Promise<Country[] | []> => {
  const countries = await fetch(
    "https://venkatmcajj.github.io/react-country-state-city/data/countriesminified.json"
  ).then((res) => res.json());
  let filtered = countries as Array<Country>;
  if(_region){
    filtered = filtered.filter((country:Country)=>{
      return country.region === _region;
    })
  }
  return filtered;
};

export const GetLanguages = async (): Promise<Language[] | []> => {
  const countries = await fetch(
    "https://venkatmcajj.github.io/react-country-state-city/data/languagesminified.json"
  ).then((res) => res.json());
  return countries as Array<Language>;
};

export const GetState = async (id: number): Promise<Array<State> | []> => {
  const states = await fetch(
    "https://venkatmcajj.github.io/react-country-state-city/data/statesminified.json"
  ).then((res) => res.json());
  const record = states as Array<CountryState>;
  const statesone = record.find((e: CountryState) => e.id === id);
  const state = statesone && statesone.states ? statesone.states : [];
  return state;
};

export const GetCity = async (
  countryid: number,
  stateid: number
): Promise<Array<City> | []> => {
  const cities = await fetch(
    "https://venkatmcajj.github.io/react-country-state-city/data/citiesminified.json"
  ).then((res) => res.json());
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
