import Banner from "./Banner";
import Category from "./Category";
import Product from "./Product";
import Service from "./Service";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <Testimonial />
      <Service />
      <Product />
    </div>
  );
};

export default Home;