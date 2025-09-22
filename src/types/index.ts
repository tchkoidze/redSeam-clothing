// export type Product = {
//   id: number;
//   name: string;
//   description: string | null;
//   release_year: string;
//   cover_image: string;
//   images: string[];
//   price: number;
//   available_colors: string[];
//   available_sizes: string[] | null;
// };

export type Product = {
  id: number;
  name: string;
  description: string | null;
  release_year: string;
  cover_image: string;
  images: string[];
  price: number;
  available_colors: string[] | null;
  available_sizes: string[] | null;
  brand: {
    id: number;
    name: string;
    image: string;
  };
  total_price: number;
  quantity: number;
  color: string;
  size: string;
};

// Single product item (matches one object inside `data[]`)
export interface ProductItem {
  id: number;
  name: string;
  description: string | null;
  release_year: string; // API returns a string like "2011"
  cover_image: string;
  images: string[];
  price: number;
  available_colors: string[] | null;
  available_sizes: string[] | null;
}

// pagination link entry inside meta.links
export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

// `links` object at the top-level
export interface TopLevelLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

// `meta` object
export interface Meta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

// Generic paginated response
export interface PaginatedResponse<T> {
  data: T[];
  links: TopLevelLinks;
  meta: Meta;
}

// Concrete type for this response
export type ProductsApiResponse = PaginatedResponse<ProductItem>;

export type PriceRange = {
  from: number | null;
  to: number | null;
};

export type RegistrationErrorResponse = {
  message: string;
  errors: {
    username?: string[];
    email?: string[];
    password?: string[];
    [key: string]: string[] | undefined;
  };
};

export type User = {
  id: number;
  username: string;
  email: string;
  is_admin: number;
  remember_token: string | null;
  avatar: string | null;
};

export type LoginResponse = {
  user: User;
  token: string;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
};
