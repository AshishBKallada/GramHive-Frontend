import { FollowerPointerCard } from "./followingPointer";

export function FollowingPointerDemo({ image }) {
  return (
    <div className="w-60 mx-auto">
      <FollowerPointerCard
        title={
          <TitleComponent
            title="Myntra Fashion Sale"
            avatar={blogContent.authorAvatar}
          />
        }
      >
        <div className="relative overflow-visible h-full rounded-lg transition duration-200 group bg-white hover:shadow-2xl border border-zinc-100">
          <div className="w-full aspect-w-16 aspect-h-9 bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-visible relative">
            <img
              src={image.imageFile}
              alt="thumbnail"
              className="group-hover:scale-95 group-hover:rounded-lg transform object-cover transition duration-200 w-64 h-72"
            />
          </div>
          <div className="p-2">
            <h2 className="font-bold my-2 text-md text-zinc-700">
              {image.caption}
            </h2>
            <h2 className="font-normal my-2 text-sm text-zinc-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis at
              animi magnam ipsum fugiat aspernatur quam.
            </h2>
            <div className="flex flex-row ml-24 mt-4">
              <a
                href={image.url}
                className="relative z-10 px-4 py-1 bg-black text-white font-bold rounded-lg block text-xs items-end"
              >
                Checkout Now !
              </a>
            </div>
          </div>
        </div>
      </FollowerPointerCard>
    </div>
  );
}

const blogContent = {
  slug: "amazing-tailwindcss-grid-layouts",
  author: "Manu Arora",
  date: "28th March, 2023",
  title: "Amazing Tailwindcss Grid Layout Examples",
  description:
    "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcss grid and React.",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzqdkW84FmcINvBoPt5rhdgcqsjVzk634riw&s",
  authorAvatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzqdkW84FmcINvBoPt5rhdgcqsjVzk634riw&s",
};

const TitleComponent = ({ title, avatar }) => (
  <div className="flex space-x-1 items-center">
    <img
      src={avatar}
      height="15"
      width="15"
      alt="avatar"
      className="rounded-full border-2 border-white"
    />
    <p className="text-xs">{title}</p>
  </div>
);
