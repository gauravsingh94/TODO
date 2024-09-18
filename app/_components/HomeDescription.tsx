import Image from "next/image";
import HomePageSvg from "@/public/assets/HomePage.svg";
import PopupAuth from "./PopupAuth";

const HomeDescription = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center w-[300px] md:w-[800px]">
      <div className="fade-in slide-in">
        <Image src={HomePageSvg} alt="HomePage SVG" width={500} height={500} />
      </div>
      <h1 className="mt-8 slide-in">
        Effortlessly manage your projects with our intuitive Kanban board and
        task list view, while enjoying seamless user authentication and a sleek,
        responsive UI. Track, update, and prioritize your tasks with ease, all
        in one place.
      </h1>
      <div className="mt-8 scale-up">
        <PopupAuth />
      </div>
    </div>
  );
};

export default HomeDescription;
