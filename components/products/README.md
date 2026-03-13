# Product Components

This directory contains all reusable components related to product functionality.

## Components Overview

### Layout Components
- **ProductHeader** - Displays page title and product count
- **ErrorAlert** - Shows error messages with dismiss functionality
- **LoadingSpinner** - Loading state indicator
- **EmptyState** - No products found state

### Filter Components
- **SearchInput** - Product search input field
- **CategoryFilter** - Category selection chips
- **FilterSection** - Combined search and filter section

### Product Display Components
- **ProductCard** - Individual product card with image, details, and actions
- **ProductGrid** - Grid layout for displaying multiple products
- **ProductPagination** - Pagination controls

## Usage

```jsx
import {
  ProductHeader,
  ErrorAlert,
  FilterSection,
  LoadingSpinner,
  ProductGrid,
  EmptyState,
  ProductPagination,
} from "@/components/products";
```

## Component Props

### ProductHeader
- `totalProducts` (number) - Total number of products

### ErrorAlert
- `error` (string) - Error message to display
- `onDismiss` (function) - Callback when error is dismissed

### FilterSection
- `searchTerm` (string) - Current search term
- `onSearchChange` (function) - Search change handler
- `categories` (array) - Available categories
- `selectedCategory` (string) - Currently selected category
- `onCategoryChange` (function) - Category change handler
- `onClearFilters` (function) - Clear filters handler
- `hasActiveFilters` (boolean) - Whether filters are active

### ProductGrid
- `products` (array) - Array of products to display
- `onAddToCart` (function) - Add to cart handler
- `addingToCart` (number) - ID of product being added to cart
- `formatPrice` (function) - Price formatting function

### ProductPagination
- `currentPage` (number) - Current page number
- `totalPages` (number) - Total number of pages
- `onPageChange` (function) - Page change handler

## Design Principles

1. **Single Responsibility** - Each component has one clear purpose
2. **Reusability** - Components can be used in different contexts
3. **Prop Drilling Avoidance** - Complex state is managed by custom hooks
4. **Clean Interfaces** - Clear and minimal prop APIs
5. **Composition** - Components can be easily composed together 