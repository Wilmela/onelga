export const siteConfig = {
  title: "Ogba, Egbema, Ndoni Local Government Area",
  shortTitle: "ONELGA",
  description: `
  Powering the Nation, Welcoming the World: The Hub of Energy and Heritage. A Land of Infinite Opportunity, Anchored by Tradition and Fueled by the Wealth of the Earth.`,
  facebook: "onelga@fb",
  twitter: "onelga@fb",
  email: "onelga@fb",
  phone: "0987000000",
  address: "ONELGA secretariat complex, Omoku",
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://ongelga.rv.gov.ng"
      : "http://localhost:3000",
};
