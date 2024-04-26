"use client";

import Image from "next/image";
import { FC, ReactNode, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  BadgeIndianRupee,
  Bell,
  CircleUser,
  CreditCard,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from "next-auth/react";
import { LogoutButton } from "@/components/auth/logout-button";
import { ExitIcon } from "@radix-ui/react-icons";
import { logout } from "@/actions/logout";

interface DashLayoutProps {
  children: React.ReactNode;
}

const DashLayout: FC<DashLayoutProps> = ({ children }) => {
  const [highlightedDiv, setHighlightedDiv] = useState("Account");

  const handleClick = (divName: any) => {
    setHighlightedDiv(divName);
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] z-50 bg-white">
      <div className="hidden border-r md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/user"
              className="flex items-center gap-2 font-bold"
            >
              🏦 BMS
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/user"
                className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
                  highlightedDiv === "Account"
                    ? "bg-muted text-primary"
                    : "bg-transparent text-muted-foreground"
                }`}
                onClick={() => handleClick("Account")}
              >
                <Home className="h-4 w-4" />
                Account
              </Link>
              <Link
                href="/user/transactions"
                className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
                  highlightedDiv === "Transactions"
                    ? "bg-muted text-primary"
                    : "bg-transparent text-muted-foreground"
                }`}
                onClick={() => handleClick("Transactions")}
              >
                <ArrowLeftRight className="h-4 w-4" />
                Transactions
              </Link>
              <Link
                href="/user/credit-card"
                className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
                  highlightedDiv === "CreditCard"
                    ? "bg-muted text-primary"
                    : "bg-transparent text-muted-foreground"
                }`}
                onClick={() => handleClick("CreditCard")}
              >
                <CreditCard className="h-4 w-4" />
                Credit Card
              </Link>
              <Link
                href="/user/feedback"
                className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
                  highlightedDiv === "Feedback"
                    ? "bg-muted text-primary"
                    : "bg-transparent text-muted-foreground"
                }`}
                onClick={() => handleClick("Feedback")}
              >
                <Users className="h-4 w-4" />
                Feedback
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <Link href="/" className="flex items-center gap-2 font-bold">
              🏦 BMS
              </Link>
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/user"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground ${
                    highlightedDiv === "Dashboard"
                      ? "bg-muted text-foreground"
                      : "bg-transparent text-muted-foreground"
                  }`}
                  onClick={() => handleClick("Dashboard")}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/inventory"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground ${
                    highlightedDiv === "Inventory"
                      ? "bg-muted text-foreground"
                      : "bg-transparent text-muted-foreground"
                  }`}
                  onClick={() => handleClick("Inventory")}
                >
                  <Package className="h-5 w-5" />
                  Inventory
                </Link>
                <Link
                  href="/dashboard/business-analysis"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground ${
                    highlightedDiv === "BusinessAnalysis"
                      ? "bg-muted text-foreground"
                      : "bg-transparent text-muted-foreground"
                  }`}
                  onClick={() => handleClick("BusinessAnalysis")}
                >
                  <LineChart className="h-5 w-5" />
                  Business Analysis
                </Link>
                <Link
                  href="/dashboard/hr"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground ${
                    highlightedDiv === "HR"
                      ? "bg-muted text-foreground"
                      : "bg-transparent text-muted-foreground"
                  }`}
                  onClick={() => handleClick("HR")}
                >
                  <Users className="h-5 w-5" />
                  HR
                </Link>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => logout()}
                className="flex justify-between"
              >
                Logout <ExitIcon />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-col gap-2 p-4 lg:gap-6 lg:p-4">
          <div className=" p-5 bg-muted h-full rounded-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
