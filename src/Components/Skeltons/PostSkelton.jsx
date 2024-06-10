import { Typography } from "@material-tailwind/react";

export function PostSkeleton() {
  return (
    <div className="mt-12 flex animate-pulse flex-wrap items-start gap-4 ml-8">
      <div className="h-8 w-8 rounded-full bg-gray-300 animate-pulse"></div>

      <div className="flex flex-col w-full max-w-md">
        <div className="mt-2 flex flex-col  justify-between">
          <div className="mb-1 h-2 w-1/4 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="mb-6 h-2 w-1/3 rounded-full bg-gray-300 animate-pulse"></div>
        </div>

        <div
          style={{ width: "570px" }}
          className="-ml-16 h-96 rounded-lg bg-gray-300 animate-pulse"
        ></div>

        <div className="-ml-12 flex flex-col mt-4">
          <Typography
            as="div"
            variant="paragraph"
            className="mb-2 h-2 w-64 rounded-full bg-gray-300 animate-pulse"
          >
            &nbsp;
          </Typography>
        </div>

        <div className="-ml-12 flex gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="h-8 w-8 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="h-8 w-8 rounded-full bg-gray-300 animate-pulse"></div>
        </div>

        <div className="-ml-12 mt-4 flex gap-2">
          <Typography
            as="div"
            variant="paragraph"
            className="mb-2 h-2 w-12 rounded-full bg-gray-300 animate-pulse"
          >
            &nbsp;
          </Typography>
        </div>
      </div>
    </div>
  );
}
