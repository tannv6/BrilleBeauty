export const listMenu = [
  {
    id: 1,
    label: "Category",
    mapLinks: ["/admin/category"],
    children: [
      { id: 1, label: "Categories List", link: "/admin/category/list" },
    ],
    icon: "fa-calendar-alt",
  },
  {
    id: 2,
    label: "Brand",
    mapLinks: ["/admin/brand"],
    children: [{ id: 1, label: "Brand List", link: "/admin/brand/list" }],
    icon: "fa-calendar-alt",
  },
  {
    id: 3,
    label: "Products",
    mapLinks: ["/admin/products", "/admin/option_types"],
    children: [
      { id: 1, label: "Products List", link: "/admin/products/list" },
      { id: 2, label: "Option Types", link: "/admin/option_types/list" },
    ],
    icon: "fa-calendar-alt",
  },
  {
    id: 8,
    label: "Combo",
    mapLinks: ["/admin/combo", "/admin/combo_category"],
    children: [
      { id: 1, label: "Combo List", link: "/admin/combo/list" },
      { id: 2, label: "Combo Category", link: "/admin/combo_category/list" },
    ],
    icon: "fa-calendar-alt",
  },
  {
    id: 4,
    label: "Orders",
    children: [{ id: 1, label: "Orders List", link: "/admin/orders/list/1" }],
    icon: "fa-calendar-alt",
  },
  {
    id: 5,
    label: "Member",
    mapLinks: ["/admin/member"],
    children: [{ id: 1, label: "Member List", link: "/admin/member/list/1" }],
    icon: "fa-calendar-alt",
  },
  {
    id: 6,
    label: "Banner",
    mapLinks: ["/admin/banner"],
    children: [{ id: 1, label: "Banner List", link: "/admin/banner/list/1" }],
    icon: "fa-calendar-alt",
  },
  {
    id: 7,
    label: "Setting",
    mapLinks: ["/admin/setting"],
    children: [
      { id: 1, label: "Web Information", link: "/admin/setting/web_info" },
    ],
    icon: "fa-calendar-alt",
  },
];
