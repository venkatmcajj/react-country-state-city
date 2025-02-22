import React from "react";
import "jest-canvas-mock";
import renderer from "react-test-renderer";
import {
  CountrySelect,
  GetCity,
  GetCountries,
  GetState,
  GetRegions,
  GetCountriesByRegion,
  GetPhonecodes,
  GetPhonecodesByRegion,
} from "../src";
import fetchmock from "jest-fetch-mock";
fetchmock.dontMock();
describe("Common render", () => {
  it("fetching records", async () => {
    const region = await GetRegions();
    expect(region.length).toBe(7);

    const allcountry = await GetCountries();
    expect(allcountry.length).toBe(250);

    const country = await GetCountriesByRegion("Asia");
    expect(country.length).toBe(50);

    const state = await GetState(101);
    expect(state[0].name).toBe("Andaman and Nicobar Islands");

    const city = await GetCity(101, 4035);
    expect(city[0].name).toBe("Abiramam");

    const allphonecodes = await GetPhonecodes();
    expect(allphonecodes.length).toBe(250);

    const phonecodes = await GetPhonecodesByRegion("Asia");
    expect(phonecodes.length).toBe(50);
  });
  it("should render correctly without crash", () => {
    const tree = renderer.create(<CountrySelect />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
