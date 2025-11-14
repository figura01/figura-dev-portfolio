import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Menu from "@/components/shared/header/menu";

const Header = () => {
  return (
    <header className="w-full border-b shadow-md">
      {/* <div className="flex flex-row justify-between items-center">*/}
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <span className="block font-bold text-2xl">{APP_NAME}</span>
          </Link>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
