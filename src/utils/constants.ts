export const listMenu = [
  {
    id: 1,
    label: "Category",
    children: [
      { id: 1, label: "Categories List", link: "/admin/category/list" },
      { id: 2, label: "Add Category", link: "" },
    ],
  },
  {
    id: 2,
    label: "Products",
    children: [
      { id: 1, label: "Products List", link: "/admin/products/list" },
      { id: 2, label: "Add Product", link: "/admin/products/write" },
    ],
  },
  {
    id: 3,
    label: "Orders",
    children: [{ id: 1, label: "Orders List", link: "" }],
  },
  {
    id: 4,
    label: "Customers",
    children: [{ id: 1, label: "Customers List", link: "" }],
  },
];
