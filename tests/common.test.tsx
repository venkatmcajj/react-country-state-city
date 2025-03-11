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
import { City, Region, State } from "../src/types";
import { render, screen } from "@testing-library/react";
import Dropdown from "../src/components/Dropdown";
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
describe("Dropdown Component", () => {
  const mockOptionsRegion: Array<Region> = [
    { id: 1, name: "Asia", hasCountries: true },
  ];
  const mockOptionsState: Array<State> = [
    {
      id: 3,
      name: "California",
      state_code: "CA",
      latitude: "",
      longitude: "",
      hasCities: true,
    },
  ];
  const mockOptionsCity: Array<City> = [
    { id: 4, name: "Los Angeles", latitude: "", longitude: "" },
  ];

  test("sets defaultValue correctly when it's a string", () => {
    render(
      <Dropdown
        options={mockOptionsRegion}
        defaultValue="Asia"
        onChange={jest.fn()}
      />
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("Asia");
  });

  test("sets defaultValue correctly when it's a number (matching id)", () => {
    render(
      <Dropdown
        options={mockOptionsState}
        defaultValue={3}
        onChange={jest.fn()}
      />
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("California");
  });

  test("sets defaultValue correctly when it's an object", () => {
    render(
      <Dropdown
        options={mockOptionsCity}
        defaultValue={mockOptionsCity[0]}
        onChange={jest.fn()}
      />
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("Los Angeles");
  });
});
