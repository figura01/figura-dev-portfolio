import Link from "next/link";
import type { HeroProps } from "@/types";

const Hero: React.FC<HeroProps> = ({
  name = "[NAME]",
  text = "I build friendly web experiences and help others become confident, modern developers.",
}) => {
  return (
    <header className="text-center bg-gray-900 text-white py-20 px-4 transition-colors duration-300">
      <h2 className="text-4xl font-bold mb-4 mx-auto">
        Hey, I&apos;m {name} 👏
      </h2>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">{text}</p>
      <div className="flex justify-center gap-4">
        <Link
          href="/projects"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          View projects
        </Link>
      </div>
    </header>
  );
};

export default Hero;
