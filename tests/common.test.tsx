import React from "react";
import "jest-canvas-mock";
import renderer from "react-test-renderer";
import { CountrySelect, GetCity, GetCountries, GetState } from "../src";

describe("Common render", () => {
  it("fetching records", () => {
    const country = GetCountries();
    expect(country.length).toBe(250);

    const state = GetState(101);
    expect(state[0].name).toBe("Andaman and Nicobar Islands");

    const city = GetCity(101, 4035);
    expect(city[0].name).toBe("Abiramam");
  });
  it("should render correctly without crash", () => {
    const tree = renderer.create(<CountrySelect />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
