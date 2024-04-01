import { SignedIn, UserButton } from "@clerk/nextjs";

import MobileSidebar from "../MobileSidebar";
import Logo from "@/components/commons/Logo";

function Navbar() {
  return (
    <nav className="fixed left-0 top-0 right-0 flex justify-between px-6 lg:px-10 py-4 text-white bg-dark-1 z-50">
      <Logo className="[&>p]:max-sm:hidden" />
      <div className="flex gap-5 sm:gap-0">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileSidebar />
      </div>
    </nav>
  );
}

export default Navbar;
