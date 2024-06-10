import { Typography } from "@material-tailwind/react";

function SearchSkelton() {
  return (
    <div className="-mb-4 -ml-2 flex animate-pulse flex-wrap items-center gap-4 p-4">
      <div className="grid h-12 w-12 rounded-full bg-gray-300 animate-pulse"></div>
      <div className="w-max">
        <Typography
          as="div"
          variant="h1"
          className="mb-2 h-2 w-32 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="h-2 w-24 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
      
      </div>
    </div>
  )
}

export default SearchSkelton
