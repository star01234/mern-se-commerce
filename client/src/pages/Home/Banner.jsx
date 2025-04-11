import ProductItem from "../../components/ProductItem";
const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between item-center">
        <div className="md:w-1/2">
          <img src="/images/home/banner.png" alt="Banner" />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-16 gap-4">
          <ProductItem
              image="/images/home/headphone.png"
              name="Headphone"
              rating="1"
              price="1199"
            />

            <ProductItem
              image="/images/home/gamepad.png"
              name="Ganepad"
              rating="3"
              price="499"
            />
          </div>
        </div>
        <div className="md:w-1/2 space-y-7 px-4">
          <h2 className="md-text-4xl text-4xl font-bold md:leading-sung leading-sung">
            Discover Uniq{" "}
            <span className="text-red">Software Engineering Swag</span> for
            Everything Coding Enthusiast!
          </h2>
          <p className="text text=xl text-[#4A4A4A]">MISSION</p>
          <a
            className="btn bg-red px-8 py-3 font-semibold text-white rounded-full"
            href="/Shop"
          >
            Order now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;