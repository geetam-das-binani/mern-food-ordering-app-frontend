import phone from "@/assets/landing.png";
import app from "@/assets/appDownload.png";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="md:text-5xl text-2xl  font-bold tracking-tight text-orange-600">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl">Food is just a click away</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={phone} alt="phone" />
        <div className="flex flex-col items-center text-center gap-4 justify-center">
          <span className="font-bold md:text-3xl text-2xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span className="text-xl">Download the MernEats App for faster ordering and personalised recommendations</span>
          <img src={app} alt="app" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
