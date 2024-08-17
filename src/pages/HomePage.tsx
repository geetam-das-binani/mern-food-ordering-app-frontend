import phone from "@/assets/landing.png";
import app from "@/assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col items-center gap-5 py-8 -mt-16 bg-white rounded-lg shadow-md md:px-32">
        <h1 className="text-2xl font-bold tracking-tight text-orange-600 md:text-5xl">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl">Food is just a click away</span>
        <SearchBar
          onSubmit={handleSubmit}
          placeHolder="Search by City or Town"
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <img src={phone} alt="phone" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="text-2xl font-bold tracking-tighter md:text-3xl">
            Order takeaway even faster!
          </span>
          <span className="text-xl">
            Download the MernEats App for faster ordering and personalised
            recommendations
          </span>
          <img src={app} alt="app" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
