// BaitulMamur-Frontend/app/__tests__/Home.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mock the components that are rendered inside Home
jest.mock('../components/PrayerTimes', () => () => <div>PrayerTimes Component</div>);
jest.mock('../components/Events', () => () => <div>Events Component</div>);

describe('Home Page', () => {
  it('renders the welcome message', () => {
    render(<Home />);
    const welcomeMessage = screen.getByText(/WELCOME TO THE ISLAMIC CENTER VIENNA/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
