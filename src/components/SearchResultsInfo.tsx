import { Link } from "react-router-dom"


type Props={
    total:number,
    city:string
}

const SearchResultsInfo = ({total,city}:Props) => {
  return (
    <div className="flex flex-col justify-between gap-3 text-xl font-bold lg:items-center lg:flex-row">
      <span>
        {  total } Restaurants found in {city}
        <Link className="ml-1 text-sm font-semibold text-blue-500 underline cursor-pointer" to="/">Change Location</Link>
      </span>
     
    </div>
  )
}

export default SearchResultsInfo
