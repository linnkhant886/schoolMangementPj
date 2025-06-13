import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, MessageCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-sm">
      <div className=" hidden md:flex">
        <Input
          type="text"
          placeholder="Search..."
          className="w-96 "
        />
      </div>
      <div className="flex items-center space-x-4 justify-end w-full">
        <button>
          <MessageCircle className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="relative">
          <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          <span className="absolute bottom-4 left-3 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            1
          </span>
        </button>

        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
          John Doe
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Student
          </div>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
