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
    label: "Products",
    mapLinks: ["/admin/products", "/admin/combo"],
    children: [
      { id: 1, label: "Products List", link: "/admin/products/list" },
      { id: 2, label: "Add Product", link: "/admin/products/write" },
      { id: 2, label: "Combo List", link: "/admin/combo/list" },
      { id: 2, label: "Add Combo", link: "/admin/combo/write" },
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
