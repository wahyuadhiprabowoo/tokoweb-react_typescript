export type DetailToko = {
  data: {
    data: {
      name: string;
      description: string;
      address: string;
      telp: null;
      whatsapp: number;
      isOpen: true;
      image: string;
    };
  };
};
export type Toko = {
  data: {
    name: string;
    description: string;
    address: string;
    telp: null;
    whatsapp: number;
    isOpen: true;
    image: string;
  };
};
export type Barang = {
  data: {
    size: 5;
    page: 1;
    totalElements: 99;
    totalPages: 20;
    content: [
      {
        id: number;
        name: string;
        price: number;
        stock: number;
        sku: string;
        category: string;
        description: string;
        isActive: boolean;
        isFavorite: boolean;
        images: [];
      }
    ];
  };
};
export type DetailProduk = {
  data: {
    data: {
      id: number;
      name: string;
      price: number;
      stock: number;
      sku: string;
      category: string;
      description: string;
      isActive: boolean;
      isFavorite: boolean;
      images: [];
    };
  };
};
export type ProdukFavorit = {
  data: [
    {
      id: number;
      name: string;
      price: number;
      stock: number;
      sku: string;
      category: string;
      description: string;
      isActive: boolean;
      isFavorite: boolean;
      images: [];
    }
  ];
};

export type ShoppingCartState = {
  cartItems: CartItem[];
  addToCart: (data: CartItem) => void;
  handleAddToCart: (data: CartItem) => void;
  handleDeleteCart: (id: any) => void;
  qty: number;
  setQty: any;
};

export type CartItem = {
  id?: any;
  name?: string;
  price?: number;
  stock?: number;
  sku?: string;
  category?: string;
  quantity?: number;
};
export type ShoppingCardContext = {
  // getItemQuantity: (id: number) => number;
  // increaseCartQuantity: (id: number) => void;
  // decreaseCartQuantity: (id: number) => void;
  // removeFromCart: () => null;
  // cartQuantity: number;
  // cartItems: CartItem;
};
