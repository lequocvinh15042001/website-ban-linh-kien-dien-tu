import React from "react";

import { FeaturedProducts, Hero, Services, Contact } from "../components";
import List from "../components/ProductList/ProductList";

const HomePage = () => {
  return (
    <main>
      <Hero />
      {/* <FeaturedProducts /> */}
      <List />
      {/* <Services /> */}
      {/* <Contact /> */}
    </main>
  );
};

export default HomePage;
