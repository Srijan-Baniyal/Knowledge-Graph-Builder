"use client";

import { List, MoonIcon, SunIcon, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/Utils";
import { useTheme } from "@/providers/ThemeProvider";
import L from "@/public/favicon/apple-touch-icon.png";

export default function Navigation() {
	const { theme, toggleTheme } = useTheme();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full">
			<div className="absolute inset-0 backdrop-blur-xl" />
			<nav className="container relative mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-3">
					<Link
						className="flex items-center gap-3 transition-all duration-300 hover:scale-105"
						href="/"
					>
						<div className="flex size-9 items-center justify-center rounded-lg transition-all duration-300 hover:ring-primary/30">
							<Image
								alt="KG Builder Logo"
								className="transition-transform duration-300 hover:rotate-12"
								src={L}
							/>
						</div>
						<span className="hidden bg-linear-to-r from-foreground to-foreground/70 bg-clip-text font-bold text-lg sm:inline-block">
							KG Builder
						</span>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<NavigationMenu className="hidden md:flex">
					<NavigationMenuList className="gap-1">
						<NavigationMenuItem>
							<NavigationMenuTrigger className="h-10 bg-transparent px-4 font-medium text-sm backdrop-blur-sm transition-all duration-300 hover:bg-accent/50 data-[state=open]:bg-accent/50">
								Features
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div className="grid w-[400px] gap-3 rounded-lg border border-border/50 bg-background/95 p-4 shadow-2xl backdrop-blur-xl">
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="#graph-builder"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											Graph Builder
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Build knowledge graphs visually with an intuitive
											interface
										</p>
									</NavigationMenuLink>
									<Separator className="bg-linear-to-r from-transparent via-border to-transparent" />
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="#schema-designer"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											Schema Designer
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Design your graph schema with powerful tools
										</p>
									</NavigationMenuLink>
									<Separator className="bg-linear-to-r from-transparent via-border to-transparent" />
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="#query-editor"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											Query Editor
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Write and execute queries efficiently
										</p>
									</NavigationMenuLink>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger className="h-10 bg-transparent px-4 font-medium text-sm backdrop-blur-sm transition-all duration-300 hover:bg-accent/50 data-[state=open]:bg-accent/50">
								Resources
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div className="grid w-[400px] gap-3 rounded-lg border border-border/50 bg-background/95 p-4 shadow-2xl backdrop-blur-xl">
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="#documentation"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											Documentation
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Learn how to use KG Builder effectively
										</p>
									</NavigationMenuLink>
									<Separator className="bg-linear-to-r from-transparent via-border to-transparent" />
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="#tutorials"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											Tutorials
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Step-by-step guides to get you started
										</p>
									</NavigationMenuLink>
									<Separator className="bg-linear-to-r from-transparent via-border to-transparent" />
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="#api"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											API Reference
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Complete API documentation and examples
										</p>
									</NavigationMenuLink>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-medium text-sm backdrop-blur-sm transition-all duration-300"
								href="#pricing"
							>
								Pricing
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-medium text-sm backdrop-blur-sm transition-all duration-300"
								href="#about"
							>
								About
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<div className="flex items-center gap-3">
					{/* Theme Toggle with Enhanced Glassmorphic Design */}
					<div className="group relative">
						<div className="absolute -inset-1 rounded-lg bg-linear-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 blur transition-all duration-500 group-hover:opacity-100" />
						<Button
							aria-label="Toggle theme"
							className="relative size-10 overflow-hidden rounded-lg border border-border/50 bg-linear-to-br from-accent/30 via-accent/20 to-accent/10 shadow-black/5 shadow-lg backdrop-blur-md transition-all duration-500 hover:scale-110 hover:border-primary/30 hover:shadow-primary/10 hover:shadow-xl"
							onClick={toggleTheme}
							size="icon"
							variant="ghost"
						>
							{/* Animated background glow */}
							<div className="absolute inset-0 bg-linear-to-tr from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

							<div className="relative h-5 w-5">
								<SunIcon
									className={cn(
										"absolute inset-0 transition-all duration-700 ease-in-out",
										theme === "light"
											? "rotate-0 scale-100 opacity-100 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
											: "rotate-180 scale-50 opacity-0"
									)}
									weight="duotone"
								/>
								<MoonIcon
									className={cn(
										"absolute inset-0 transition-all duration-700 ease-in-out",
										theme === "dark"
											? "rotate-0 scale-100 opacity-100 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
											: "-rotate-180 scale-50 opacity-0"
									)}
									weight="duotone"
								/>
							</div>
							<span className="sr-only">Toggle theme</span>
						</Button>
					</div>

					<Separator
						className="h-8 bg-linear-to-b from-transparent via-border/60 to-transparent opacity-50"
						orientation="vertical"
					/>

					{/* Desktop CTA with Shimmer Effect */}
					<div className="group relative hidden sm:block">
						{/* Animated outer glow */}
						<div className="absolute -inset-1 rounded-lg bg-linear-to-r from-primary via-primary/80 to-primary opacity-50 blur-sm transition-all duration-500 group-hover:opacity-75 group-hover:blur-md" />

						<Button
							className="relative overflow-hidden rounded-lg border border-primary/20 bg-linear-to-r from-primary via-primary/95 to-primary px-6 shadow-lg shadow-primary/25 transition-all duration-500 hover:scale-[1.02] hover:border-primary/30 hover:shadow-primary/30 hover:shadow-xl"
							size="default"
						>
							{/* Shimmer effect */}
							<div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

							{/* Button text with subtle linear */}
							<span className="relative bg-linear-to-b from-white to-white/90 bg-clip-text font-semibold text-transparent">
								Get Started
							</span>

							{/* Animated border shimmer */}
							<div className="absolute inset-0 rounded-lg opacity-0 ring-1 ring-white/20 transition-opacity duration-500 group-hover:opacity-100" />
						</Button>
					</div>

					{/* Mobile Menu Toggle with Morphing Animation */}
					<Button
						aria-label="Toggle menu"
						className="relative size-9 overflow-hidden border border-border/50 bg-accent/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-border hover:bg-accent/40 md:hidden"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						size="icon-sm"
						variant="ghost"
					>
						<div className="relative h-5 w-5">
							<List
								className={cn(
									"absolute inset-0 transition-all duration-500 ease-in-out",
									mobileMenuOpen
										? "rotate-90 scale-0 opacity-0"
										: "rotate-0 scale-100 opacity-100"
								)}
								weight="bold"
							/>
							<X
								className={cn(
									"absolute inset-0 transition-all duration-500 ease-in-out",
									mobileMenuOpen
										? "rotate-0 scale-100 opacity-100"
										: "-rotate-90 scale-0 opacity-0"
								)}
								weight="bold"
							/>
						</div>
						<span className="sr-only">Toggle menu</span>
					</Button>
				</div>
			</nav>

			{/* Mobile Menu with Glassmorphic Design */}
			<div
				className={cn(
					"absolute top-16 right-0 left-0 overflow-hidden transition-all duration-500 ease-in-out md:hidden",
					mobileMenuOpen
						? "max-h-[calc(100vh-4rem)] opacity-100"
						: "max-h-0 opacity-0"
				)}
			>
				<div className="border-border/50 border-b bg-background/95 shadow-2xl backdrop-blur-xl">
					<div className="container mx-auto space-y-4 px-4 py-6">
						{/* Features Section */}
						<div className="space-y-3">
							<h3 className="flex items-center gap-2 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
								<span className="h-px w-8 bg-linear-to-r from-primary to-transparent" />
								Features
							</h3>
							<div className="space-y-2 pl-4">
								<Link
									className="block rounded-lg border border-transparent bg-accent/20 p-3 transition-all duration-300 hover:translate-x-2 hover:border-border/50 hover:bg-accent/40"
									href="#graph-builder"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-medium text-sm">Graph Builder</div>
									<p className="mt-1 text-muted-foreground text-xs">
										Build knowledge graphs visually
									</p>
								</Link>
								<Link
									className="block rounded-lg border border-transparent bg-accent/20 p-3 transition-all duration-300 hover:translate-x-2 hover:border-border/50 hover:bg-accent/40"
									href="#schema-designer"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-medium text-sm">Schema Designer</div>
									<p className="mt-1 text-muted-foreground text-xs">
										Design your graph schema
									</p>
								</Link>
								<Link
									className="block rounded-lg border border-transparent bg-accent/20 p-3 transition-all duration-300 hover:translate-x-2 hover:border-border/50 hover:bg-accent/40"
									href="#query-editor"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-medium text-sm">Query Editor</div>
									<p className="mt-1 text-muted-foreground text-xs">
										Execute queries efficiently
									</p>
								</Link>
							</div>
						</div>

						<Separator className="bg-linear-to-r from-transparent via-border to-transparent" />

						{/* Resources Section */}
						<div className="space-y-3">
							<h3 className="flex items-center gap-2 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
								<span className="h-px w-8 bg-linear-to-r from-primary to-transparent" />
								Resources
							</h3>
							<div className="space-y-2 pl-4">
								<Link
									className="block rounded-lg border border-transparent bg-accent/20 p-3 transition-all duration-300 hover:translate-x-2 hover:border-border/50 hover:bg-accent/40"
									href="#documentation"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-medium text-sm">Documentation</div>
									<p className="mt-1 text-muted-foreground text-xs">
										Learn how to use KG Builder
									</p>
								</Link>
								<Link
									className="block rounded-lg border border-transparent bg-accent/20 p-3 transition-all duration-300 hover:translate-x-2 hover:border-border/50 hover:bg-accent/40"
									href="#tutorials"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-medium text-sm">Tutorials</div>
									<p className="mt-1 text-muted-foreground text-xs">
										Step-by-step guides
									</p>
								</Link>
								<Link
									className="block rounded-lg border border-transparent bg-accent/20 p-3 transition-all duration-300 hover:translate-x-2 hover:border-border/50 hover:bg-accent/40"
									href="#api"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-medium text-sm">API Reference</div>
									<p className="mt-1 text-muted-foreground text-xs">
										Complete API documentation
									</p>
								</Link>
							</div>
						</div>

						<Separator className="bg-linear-to-r from-transparent via-border to-transparent" />

						{/* Other Links */}
						<div className="space-y-2 pl-4">
							<Link
								className="block rounded-lg border border-transparent bg-accent/20 p-3 font-medium text-sm transition-all duration-300 hover:translate-x-2 hover:border-border/50 hover:bg-accent/40"
								href="#pricing"
								onClick={() => setMobileMenuOpen(false)}
							>
								Pricing
							</Link>
							<Link
								className="block rounded-lg border border-transparent bg-accent/20 p-3 font-medium text-sm transition-all duration-300 hover:translate-x-2 hover:border-border/50 hover:bg-accent/40"
								href="#about"
								onClick={() => setMobileMenuOpen(false)}
							>
								About
							</Link>
						</div>

						<Separator className="bg-linear-to-r from-transparent via-border to-transparent" />

						{/* Mobile CTA */}
						<Button
							className="w-full bg-primary/90 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-primary hover:shadow-lg hover:shadow-primary/20"
							onClick={() => setMobileMenuOpen(false)}
							size="lg"
						>
							Get Started
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
