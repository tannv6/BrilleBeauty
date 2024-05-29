export type Product = {
  ProductID: number;
  ProductName: string;
  Description: string;
  InitPrice: number;
  SellPrice: number;
  Quantity: number;
  ProductImage: string;
  CategoryID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  SaleDate: string;
  SaleEndDate: string;
  PriceOnSaleDate: number;
  IsBigSale: number;
  IsBest: number;
  IsNew: number;
  PotID: number;
  BrandID: number;
  like: number;
  liked: boolean;
  reviewAvg: number;
  reviewCnt: number;
};

export type PrdPaging = {
  list: Product[];
  total: number;
  currentPage: number;
  pageSize: number;
  totalPage: number;
};
