import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FC, ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import type { FlowbiteDropdownTheme } from './Dropdown';
import { Dropdown } from './Dropdown';

describe('Components / Dropdown', () => {
  describe('Keyboard interactions', () => {
    it('should collapse if expanded when `Space` is pressed', async () => {
      const user = userEvent.setup();
      render(<TestDropdown />);

      expect(dropdown()).toHaveClass('invisible');

      await user.click(button());

      expect(dropdown()).not.toHaveClass('invisible');
    });

    it('should expand if collapsed when `Space` is pressed', async () => {
      const user = userEvent.setup();
      render(<TestDropdown />);

      await user.click(button());
      await user.click(button());

      expect(dropdown()).toHaveClass('invisible');
    });
  });
  describe('Mouse interactions', () => {
    it('should collapse if item is clicked', async () => {
      const user = userEvent.setup();
      render(<TestDropdown />);

      act(() => {
        user.click(button());
        userEvent.click(dropdownItem());
      });

      expect(dropdown()).toHaveClass('invisible');
    });
    it('should collapse if CustomTriggerItem is clicked', async () => {
      const user = userEvent.setup();
      render(<TestDropdown renderTrigger={() => <button type="button"></button>} />);

      act(() => {
        user.click(button());
        userEvent.click(dropdownItem());
      });

      expect(dropdown()).toHaveClass('invisible');
    });

    it('should not collapse in case item is clicked if dismissOnClick = false', async () => {
      const user = userEvent.setup();
      render(<TestDropdown dismissOnClick={false} />);

      expect(dropdown()).toHaveClass('invisible');

      await user.click(button());

      expect(dropdown()).not.toHaveClass('invisible');

      await user.click(dropdownItem());

      expect(dropdown()).not.toHaveClass('invisible');
    });
  });
  describe('Type of button', async () => {
    it('should be of type `button`', async () => {
      render(<TestDropdown />);
      expect(button()).toHaveAttribute('type', 'button');
    });

    it('should be of type `button` with inline', async () => {
      render(<TestDropdown inline />);
      expect(button()).toHaveAttribute('type', 'button');
    });
  });
});

const TestDropdown: FC<{
  dismissOnClick?: boolean;
  inline?: boolean;
  renderTrigger?: (theme: FlowbiteDropdownTheme) => ReactNode;
}> = ({ dismissOnClick = true, inline = false, renderTrigger }) => (
  <Dropdown
    label="Dropdown button"
    placement="right"
    dismissOnClick={dismissOnClick}
    inline={inline}
    renderTrigger={renderTrigger}
  >
    <Dropdown.Header>
      <span className="block text-sm">Bonnie Green</span>
      <span className="block truncate text-sm font-medium">name@flowbite.com</span>
    </Dropdown.Header>
    <Dropdown.Item>Dashboard</Dropdown.Item>
    <Dropdown.Item>Settings</Dropdown.Item>
    <Dropdown.Item>Earnings</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item>Sign out</Dropdown.Item>
  </Dropdown>
);

const button = () => screen.getByRole('button');

const dropdown = () => screen.getByTestId('flowbite-tooltip');

const dropdownItem = () => screen.getByText('Dashboard');
