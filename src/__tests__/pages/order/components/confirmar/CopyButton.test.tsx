import { act } from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CopyButton from "@pages/order/components/confirm/CopyButton";

describe("CopyButton", () => {
  const label = "Copy";
  const value = "Text to copy";

  let originalClipboard: typeof navigator.clipboard;

  beforeEach(() => {
    originalClipboard = { ...navigator.clipboard };
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    Object.assign(navigator, {
      clipboard: originalClipboard,
    });
  });

  test("renders correctly with the initial label", () => {
    render(<CopyButton label={label} value={value} />);
    expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
  });

  test("copies the value to clipboard on click", async () => {
    render(<CopyButton label={label} value={value} />);
    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(value);
  });

  test("shows 'Copiado' after clicking", async () => {
    render(<CopyButton label={label} value={value} />);
    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(await screen.findByText("Copiado")).toBeInTheDocument();
  });

  test("returns to original label after 2 seconds", async () => {
    render(<CopyButton label={label} value={value} />);
    const button = screen.getByRole("button");

    await userEvent.click(button);
    expect(screen.getByText("Copiado")).toBeInTheDocument();

    await act(() => new Promise((res) => setTimeout(res, 2100)));

    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
