import { Typography } from "@material-tailwind/react";

export function NotificationSkelton() {
  return (
    <div className="flex animate-pulse flex-wrap items-center gap-4 p-4">
      <div className="grid h-6 w-6 rounded-full bg-gray-300 animate-pulse"></div>
      <div className="w-max">
        <Typography
          as="div"
          variant="h1"
          className="mb-2 h-2 w-64 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-1 h-2 w-24 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
      
      </div>
    </div>
  );
}
