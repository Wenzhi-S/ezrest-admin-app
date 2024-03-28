import { getButtonStyle } from "./RegistrationForm";

test("button style test", () => {
  let style = getButtonStyle("approve", "approve");
  expect(style).toEqual({ backgroundColor: "green", color: "white" });

  style = getButtonStyle("pending", "pending");
  expect(style).toEqual({ backgroundColor: "gray", color: "white" });

  style = getButtonStyle("decline", "decline");
  expect(style).toEqual({ backgroundColor: "red", color: "white" });

  style = getButtonStyle("approve", "decline");
  expect(style).toEqual({});

  style = getButtonStyle("approve", "pending");
  expect(style).toEqual({});

  style = getButtonStyle("peding", "decline");
  expect(style).toEqual({});

  style = getButtonStyle("pending", "approve");
  expect(style).toEqual({});

  style = getButtonStyle("decline", "approve");
  expect(style).toEqual({});

  style = getButtonStyle("decline", "pending");
  expect(style).toEqual({});
});
