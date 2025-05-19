
import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { store } from "@/stores"
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
interface TestWrapperProps {
  children: React.ReactNode;
}
const client = new QueryClient
export const TestWrapper = ({ children }: TestWrapperProps) => {

  return <Provider store={store}>
    <QueryClientProvider client={client} >
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  </Provider>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: TestWrapper, ...options });

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render method
export { customRender as render };