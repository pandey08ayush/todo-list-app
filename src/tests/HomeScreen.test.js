import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomeScreen from './HomeScreen';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('HomeScreen Component', () => {

  // Test 1: Render the HomeScreen component
  test('should render HomeScreen component', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Product List')).toBeInTheDocument();
  });

  // Test 2: Test if products are fetched and displayed correctly
  test('should fetch and display products', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Product 1',
        price: 20,
        description: 'Description of Product 1',
        image: 'https://image.url',
        category: 'electronics',
      },
      {
        id: 2,
        title: 'Product 2',
        price: 25,
        description: 'Description of Product 2',
        image: 'https://image.url',
        category: 'clothing',
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockProducts });

    render(<HomeScreen />);

    // Wait for products to be displayed
    await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  // Test 3: Test adding a new product
  test('should add a new product', async () => {
    const newProduct = {
      title: 'New Product',
      price: 30,
      description: 'New product description',
      image: 'https://newproduct.url',
      category: 'home',
    };

    axios.post.mockResolvedValueOnce({ data: newProduct });

    render(<HomeScreen />);

    // Fill in the form and submit
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: newProduct.title } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: newProduct.price } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: newProduct.description } });
    fireEvent.change(screen.getByPlaceholderText('Image URL'), { target: { value: newProduct.image } });
    fireEvent.change(screen.getByPlaceholderText('Category'), { target: { value: newProduct.category } });

    fireEvent.click(screen.getByText('Add Product'));

    // Wait for the new product to appear
    await waitFor(() => expect(screen.getByText('New Product')).toBeInTheDocument());
  });
});
