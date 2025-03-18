import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductDetails from './ProductDetails';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

// Mock axios
jest.mock('axios');

describe('ProductDetails Component', () => {

  const productData = {
    id: 1,
    title: 'Product 1',
    price: 20,
    description: 'Description of Product 1',
    image: 'https://image.url',
    category: 'electronics',
  };

  // Test 1: Render ProductDetails component
  test('should render ProductDetails component', async () => {
    axios.get.mockResolvedValueOnce({ data: productData });

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <ProductDetails />
      </MemoryRouter>
    );

    // Wait for the product details to be fetched and rendered
    await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());
    expect(screen.getByText('Description of Product 1')).toBeInTheDocument();
  });

  // Test 2: Test updating the product
  test('should update the product', async () => {
    axios.get.mockResolvedValueOnce({ data: productData });
    axios.put.mockResolvedValueOnce({ data: { ...productData, title: 'Updated Product' } });

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <ProductDetails />
      </MemoryRouter>
    );

    // Wait for product details to appear
    await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());

    // Change product title in the input field
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Product' } });

    // Submit the form
    fireEvent.click(screen.getByText('Update Product'));

    // Wait for the product to be updated
    await waitFor(() => expect(screen.getByText('Updated Product')).toBeInTheDocument());
  });

  // Test 3: Test deleting the product
  test('should delete the product', async () => {
    axios.get.mockResolvedValueOnce({ data: productData });
    axios.delete.mockResolvedValueOnce({});

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <ProductDetails />
      </MemoryRouter>
    );

    // Wait for product details to be fetched
    await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());

    // Simulate clicking the delete button
    fireEvent.click(screen.getByText('Delete Product'));

    // Wait for the page to redirect or check that the product is removed from the screen
    await waitFor(() => expect(screen.queryByText('Product 1')).toBeNull());
  });
});
