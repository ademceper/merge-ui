/**
 * Input Component Tests
 * 
 * Tests for the Input component covering:
 * - Rendering
 * - Type validation
 * - Accessibility
 * - Security (XSS prevention)
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  it('validates and sanitizes unsafe input types', () => {
    const { rerender } = render(<Input type="file" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text'); // Should default to 'text' for unsafe types

    rerender(<Input type="text" />);
    expect(input).toHaveAttribute('type', 'text');

    rerender(<Input type="email" />);
    expect(input).toHaveAttribute('type', 'email');
  });

  it('has proper ARIA attributes', () => {
    render(<Input aria-label="Email address" required disabled />);
    const input = screen.getByLabelText('Email address');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-disabled', 'true');
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    
    await user.type(input, 'Hello World');
    expect(input).toHaveValue('Hello World');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Custom" />);
    const input = screen.getByPlaceholderText('Custom');
    expect(input).toHaveClass('custom-class');
  });
});
