export const listMenu = [
  {
    id: 1,
    label: "Category",
    mapLinks: ["/admin/category"],
    children: [
      { id: 1, label: "Categories List", link: "/admin/category/list" },
      { id: 2, label: "Add Category", link: "/admin/category/write" },
    ],
  },
  {
    id: 2,
    label: "Brand",
    mapLinks: ["/admin/brand"],
    children: [
      { id: 1, label: "Brand List", link: "/admin/brand/list" },
      { id: 2, label: "Add Brand", link: "/admin/brand/write" },
    ],
  },
  {
    id: 3,
    label: "Products",
    mapLinks: ["/admin/products", "/admin/combo", "/admin/option_types"],
    children: [
      { id: 1, label: "Products List", link: "/admin/products/list" },
      { id: 2, label: "Add Product", link: "/admin/products/write" },
      { id: 2, label: "Combo List", link: "/admin/combo/list" },
      { id: 2, label: "Add Combo", link: "/admin/combo/write" },
      { id: 2, label: "Option Types", link: "/admin/option_types/list" },
    ],
  },
  {
    id: 4,
    label: "Orders",
    children: [{ id: 1, label: "Orders List", link: "" }],
  },
  {
    id: 5,
    label: "Customers",
    children: [{ id: 1, label: "Customers List", link: "" }],
  },
];
