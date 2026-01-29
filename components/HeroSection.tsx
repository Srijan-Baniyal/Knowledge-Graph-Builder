"use client";

import {
	ArrowRightIcon,
	CpuIcon,
	EyeIcon,
	LightningIcon,
	PlayIcon,
	SparkleIcon,
} from "@phosphor-icons/react";
import {
	motion,
	useInView,
	useScroll,
	useSpring,
	useTransform,
} from "motion/react";
import {
	type ComponentType,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Button } from "@/components/ui/button";

// Types
interface Node {
	id: string;
	label: string;
	x: number;
	y: number;
	scale: number;
}

interface Edge {
	from: string;
	to: string;
	progress: number;
}

interface NodeSequence {
	id: string;
	label: string;
	x: number;
	y: number;
}

interface EdgeSequence {
	from: string;
	to: string;
}

interface Feature {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

interface Step {
	number: string;
	title: string;
	description: string;
}

interface ScrollRevealProps {
	children: React.ReactNode;
	delay?: number;
}

interface StaggerRevealProps {
	children: React.ReactNode;
}

interface StaggerItemProps {
	children: React.ReactNode;
}

// Constants
const NODE_SEQUENCE: readonly NodeSequence[] = [
	{ id: "1", label: "Idea", x: 50, y: 50 },
	{ id: "2", label: "Concept", x: 75, y: 30 },
	{ id: "3", label: "Pattern", x: 25, y: 35 },
	{ id: "4", label: "Insight", x: 60, y: 70 },
	{ id: "5", label: "Connection", x: 35, y: 65 },
	{ id: "6", label: "Knowledge", x: 50, y: 85 },
	{ id: "7", label: "Reasoning", x: 80, y: 55 },
	{ id: "8", label: "Context", x: 20, y: 55 },
] as const;

const EDGE_SEQUENCE: readonly EdgeSequence[] = [
	{ from: "1", to: "2" },
	{ from: "1", to: "3" },
	{ from: "2", to: "7" },
	{ from: "3", to: "8" },
	{ from: "1", to: "4" },
	{ from: "1", to: "5" },
	{ from: "4", to: "6" },
	{ from: "5", to: "6" },
	{ from: "7", to: "4" },
	{ from: "8", to: "5" },
] as const;

const FEATURES: readonly Feature[] = [
	{
		icon: LightningIcon,
		title: "Concurrent Processing",
		description:
			"Reasoning happens as you type. No loading indicators, no artificial wait times—just seamless, fluid understanding that builds in real-time.",
	},
	{
		icon: EyeIcon,
		title: "Transparent Reasoning",
		description:
			"See the thinking process unfold. Entities and connections emerge progressively, offering a window into how knowledge structures form.",
	},
	{
		icon: CpuIcon,
		title: "Server-Side Intelligence",
		description:
			"Heavy computational reasoning happens server-side, while your client experience remains fluid and responsive. The best of both worlds.",
	},
	{
		icon: SparkleIcon,
		title: "Living Knowledge",
		description:
			"What you observe is not a static result—it is an evolving, interactive map of ideas that grows and adapts with every interaction.",
	},
] as const;

const STEPS: readonly Step[] = [
	{
		number: "01",
		title: "Input Your Text",
		description:
			"Begin typing or paste any text. The moment characters appear, the reasoning engine activates—no submit buttons, no waiting.",
	},
	{
		number: "02",
		title: "Watch Entities Emerge",
		description:
			"Concepts, people, places, and ideas surface in real-time. Each entity appears as it is recognized, building your knowledge map progressively.",
	},
	{
		number: "03",
		title: "See Connections Form",
		description:
			"Relationships between entities materialize as the system reasons through your content. Watch the structure of understanding take shape.",
	},
	{
		number: "04",
		title: "Explore Interactively",
		description:
			"Navigate your living knowledge graph. Click, zoom, and discover insights within an interface that responds instantly to your curiosity.",
	},
] as const;

const ANIMATION_CONFIG = {
	NODE_INTERVAL: 400,
	EDGE_INTERVAL: 300,
	EDGE_ANIMATION_DURATION: 600,
	SPRING_CONFIG: { stiffness: 100, damping: 20 },
	SCROLL_SPRING_CONFIG: { stiffness: 100, damping: 30 },
} as const;

// Animated Knowledge Graph Component
function AnimatedGraph() {
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [nodeIndex, setNodeIndex] = useState(0);
	const [edgeIndex, setEdgeIndex] = useState(0);

	// Add nodes sequentially
	useEffect(() => {
		if (nodeIndex >= NODE_SEQUENCE.length) {
			return;
		}

		const timer = setTimeout(() => {
			setNodes((prev) => [...prev, { ...NODE_SEQUENCE[nodeIndex], scale: 0 }]);
			setNodeIndex((prev) => prev + 1);
		}, ANIMATION_CONFIG.NODE_INTERVAL);

		return () => clearTimeout(timer);
	}, [nodeIndex]);

	// Animate node scale
	useEffect(() => {
		if (nodes.length === 0) {
			return;
		}

		const timer = setTimeout(() => {
			setNodes((prev) =>
				prev.map((node, idx) =>
					idx === prev.length - 1 ? { ...node, scale: 1 } : node
				)
			);
		}, 50);

		return () => clearTimeout(timer);
	}, [nodes.length]);

	// Add edges sequentially
	useEffect(() => {
		if (edgeIndex >= EDGE_SEQUENCE.length || nodes.length < 2) {
			return;
		}

		const timer = setTimeout(() => {
			const currentEdge = EDGE_SEQUENCE[edgeIndex];
			const fromExists = nodes.some((n) => n.id === currentEdge.from);
			const toExists = nodes.some((n) => n.id === currentEdge.to);

			if (fromExists && toExists) {
				setEdges((prev) => [...prev, { ...currentEdge, progress: 0 }]);
				setEdgeIndex((prev) => prev + 1);
			}
		}, ANIMATION_CONFIG.EDGE_INTERVAL);

		return () => clearTimeout(timer);
	}, [edgeIndex, nodes]);

	// Animate edge progress
	useEffect(() => {
		if (edges.length === 0) {
			return;
		}

		const timer = setTimeout(() => {
			setEdges((prev) =>
				prev.map((edge, idx) =>
					idx === prev.length - 1 ? { ...edge, progress: 1 } : edge
				)
			);
		}, 50);

		return () => clearTimeout(timer);
	}, [edges.length]);

	// Reset animation
	const resetAnimation = useCallback(() => {
		setNodes([]);
		setEdges([]);
		setNodeIndex(0);
		setEdgeIndex(0);
	}, []);

	useEffect(() => {
		if (
			nodeIndex >= NODE_SEQUENCE.length &&
			edgeIndex >= EDGE_SEQUENCE.length
		) {
			const resetTimer = setTimeout(resetAnimation, 3000);
			return () => clearTimeout(resetTimer);
		}
	}, [nodeIndex, edgeIndex, resetAnimation]);

	const getNodePosition = useCallback(
		(nodeId: string) => {
			const node = nodes.find((n) => n.id === nodeId);
			return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
		},
		[nodes]
	);

	return (
		<svg
			aria-label="Animated knowledge graph visualization"
			className="h-full w-full"
			viewBox="0 0 100 100"
		>
			<title>Animated Knowledge Graph</title>
			{/* Edges */}
			{edges.map((edge) => {
				const from = getNodePosition(edge.from);
				const to = getNodePosition(edge.to);
				return (
					<motion.line
						animate={{ opacity: 0.3 }}
						initial={{ opacity: 0 }}
						key={`${edge.from}-${edge.to}`}
						stroke="currentColor"
						strokeDasharray="2 2"
						strokeWidth="0.3"
						transition={{ duration: 0.5 }}
						x1={from.x}
						x2={to.x}
						y1={from.y}
						y2={to.y}
					/>
				);
			})}

			{/* Nodes */}
			{nodes.map((node) => (
				<motion.g key={node.id}>
					<motion.circle
						animate={{ scale: node.scale, opacity: node.scale }}
						className="fill-primary"
						cx={node.x}
						cy={node.y}
						initial={{ scale: 0, opacity: 0 }}
						r="3"
						transition={{ ...ANIMATION_CONFIG.SPRING_CONFIG, type: "spring" }}
					/>
					<motion.text
						animate={{ opacity: node.scale }}
						className="fill-current text-[3px]"
						dy="0.3em"
						initial={{ opacity: 0 }}
						textAnchor="middle"
						transition={{ duration: 0.3 }}
						x={node.x}
						y={node.y + 5}
					>
						{node.label}
					</motion.text>
				</motion.g>
			))}
		</svg>
	);
}

// Scroll Reveal Component
function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<motion.div
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
			initial={{ opacity: 0, y: 20 }}
			ref={ref}
			transition={{ duration: 0.6, delay }}
		>
			{children}
		</motion.div>
	);
}

// Stagger Reveal Container
function StaggerReveal({ children }: StaggerRevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<motion.div
			animate={isInView ? "visible" : "hidden"}
			initial="hidden"
			ref={ref}
			variants={{
				hidden: {},
				visible: { transition: { staggerChildren: 0.1 } },
			}}
		>
			{children}
		</motion.div>
	);
}

// Stagger Item
function StaggerItem({ children }: StaggerItemProps) {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 20, scale: 0.95 },
				visible: {
					opacity: 1,
					y: 0,
					scale: 1,
					transition: { duration: 0.5, ease: "easeOut" },
				},
			}}
		>
			{children}
		</motion.div>
	);
}

// Main Hero Section Component
export default function HeroSection() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: containerRef });
	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: ANIMATION_CONFIG.SCROLL_SPRING_CONFIG.stiffness,
		damping: ANIMATION_CONFIG.SCROLL_SPRING_CONFIG.damping,
	});

	const heroY = useTransform(smoothProgress, [0, 1], [0, -100]);
	const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
	const graphScale = useTransform(smoothProgress, [0, 1], [1, 0.8]);
	const graphRotate = useTransform(smoothProgress, [0, 1], [0, 360]);

	return (
		<div className="relative min-h-screen overflow-hidden" ref={containerRef}>
			{/* Hero Section */}
			<motion.section
				className="relative flex min-h-screen items-center justify-center px-4 py-20"
				style={{ y: heroY, opacity: heroOpacity }}
			>
				<div className="container mx-auto max-w-7xl">
					<div className="grid items-center gap-12 lg:grid-cols-2">
						{/* Left Content */}
						<div className="space-y-8">
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								className="inline-block"
								initial={{ opacity: 0, y: 20 }}
								transition={{ duration: 0.6 }}
							>
								<span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 font-medium text-primary text-sm">
									<SparkleIcon className="size-4" weight="fill" />
									Real-time Knowledge Graphs
								</span>
							</motion.div>

							<motion.h1
								animate={{ opacity: 1, y: 0 }}
								className="font-bold text-4xl text-foreground leading-tight sm:text-5xl lg:text-6xl"
								initial={{ opacity: 0, y: 20 }}
								transition={{ duration: 0.6, delay: 0.1 }}
							>
								Build Knowledge Graphs{" "}
								<span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
									While You Think
								</span>
							</motion.h1>

							<motion.p
								animate={{ opacity: 1, y: 0 }}
								className="text-lg text-muted-foreground sm:text-xl"
								initial={{ opacity: 0, y: 20 }}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								No waiting. No manual mapping. Just type, and watch as entities
								and relationships emerge in real-time, revealing the structure
								within your ideas.
							</motion.p>

							<motion.div
								animate={{ opacity: 1, x: 0 }}
								className="flex flex-wrap gap-4"
								initial={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.6, delay: 0.3 }}
							>
								<Button size="lg">
									Get Started
									<ArrowRightIcon className="ml-2 size-4" weight="bold" />
								</Button>
								<Button size="lg" variant="outline">
									<PlayIcon className="mr-2 size-4" weight="fill" />
									Watch Demo
								</Button>
							</motion.div>

							<motion.div
								animate={{ opacity: 1, y: 0 }}
								className="flex items-center gap-6 pt-4"
								initial={{ opacity: 0, y: 20 }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								<div className="flex items-center gap-2">
									<div className="flex -space-x-2">
										<div className="size-8 rounded-full border-2 border-background bg-primary/20 ring-2 ring-background" />
										<div className="size-8 rounded-full border-2 border-background bg-primary/20 ring-2 ring-background" />
										<div className="size-8 rounded-full border-2 border-background bg-primary/20 ring-2 ring-background" />
									</div>
									<span className="text-muted-foreground text-sm">
										Trusted by 10,000+ users
									</span>
								</div>
							</motion.div>
						</div>

						{/* Right Content - Animated Graph */}
						<motion.div
							animate={{ opacity: 1, scale: 1 }}
							className="relative"
							initial={{ opacity: 0, scale: 0.8 }}
							style={{ scale: graphScale, rotateZ: graphRotate }}
							transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
						>
							<div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-linear-to-br from-primary/5 to-primary/10 p-8 shadow-2xl">
								<div className="absolute inset-0 bg-grid-pattern opacity-5" />
								<AnimatedGraph />
							</div>

							{/* Floating Stats */}
							<motion.div
								animate={{ y: [0, -10, 0] }}
								className="absolute top-1/4 -right-4 rounded-lg border border-border bg-background p-4 shadow-lg"
								transition={{
									duration: 3,
									repeat: Number.POSITIVE_INFINITY,
									ease: "easeInOut",
								}}
							>
								<div className="font-bold text-2xl text-primary">98%</div>
								<div className="text-muted-foreground text-xs">Accuracy</div>
							</motion.div>

							<motion.div
								animate={{ y: [0, 10, 0] }}
								className="absolute bottom-1/4 -left-4 rounded-lg border border-border bg-background p-4 shadow-lg"
								transition={{
									duration: 2.5,
									repeat: Number.POSITIVE_INFINITY,
									ease: "easeInOut",
								}}
							>
								<div className="font-bold text-2xl text-primary">2.3s</div>
								<div className="text-muted-foreground text-xs">Avg. Time</div>
							</motion.div>
						</motion.div>
					</div>
				</div>

				{/* Background Elements */}
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<div className="absolute top-1/4 -right-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />
					<div className="absolute bottom-1/4 -left-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />
				</div>
			</motion.section>

			{/* Features Section */}
			<section className="relative bg-background py-24">
				<div className="container mx-auto max-w-7xl px-4">
					<ScrollReveal>
						<div className="mb-16 text-center">
							<h2 className="mb-4 font-bold text-3xl text-foreground sm:text-4xl">
								Features That Set Us Apart
							</h2>
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
								Experience the future of knowledge management with cutting-edge
								technology designed for speed and clarity.
							</p>
						</div>
					</ScrollReveal>

					<StaggerReveal>
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
							{FEATURES.map((feature) => (
								<StaggerItem key={feature.title}>
									<div className="group relative h-full overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
										<div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
											<feature.icon className="size-6" weight="duotone" />
										</div>
										<h3 className="mb-2 font-semibold text-foreground text-lg">
											{feature.title}
										</h3>
										<p className="text-muted-foreground text-sm leading-relaxed">
											{feature.description}
										</p>
									</div>
								</StaggerItem>
							))}
						</div>
					</StaggerReveal>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="relative bg-muted/30 py-24">
				<div className="container mx-auto max-w-7xl px-4">
					<ScrollReveal>
						<div className="mb-16 text-center">
							<h2 className="mb-4 font-bold text-3xl text-foreground sm:text-4xl">
								How It Works
							</h2>
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
								Four simple steps to transform your ideas into interactive
								knowledge graphs.
							</p>
						</div>
					</ScrollReveal>

					<div className="relative">
						{/* Progress Line */}
						<motion.div
							animate={{ scaleY: 1 }}
							className="absolute top-0 left-8 h-full w-0.5 origin-top bg-primary/20 md:left-1/2"
							initial={{ scaleY: 0 }}
							transition={{ duration: 1, delay: 0.5 }}
							viewport={{ once: true }}
						/>

						<div className="space-y-16">
							{STEPS.map((step, index) => (
								<ScrollReveal delay={index * 0.1} key={step.number}>
									<div
										className={`relative grid gap-8 md:grid-cols-2 md:items-center ${
											index % 2 === 0 ? "" : "md:flex-row-reverse"
										}`}
									>
										{/* Number Circle */}
										<motion.div
											animate={{ scale: 1, borderColor: "rgb(var(--primary))" }}
											className="absolute top-0 left-8 z-10 flex size-16 items-center justify-center rounded-full border-4 border-border bg-background font-bold text-2xl text-primary md:left-1/2 md:-translate-x-1/2"
											initial={{ scale: 0, borderColor: "rgb(var(--border))" }}
											transition={{
												duration: 0.5,
												repeat: 1,
												repeatType: "reverse",
											}}
											viewport={{ once: true }}
										>
											{step.number}
										</motion.div>

										{/* Content */}
										<div
											className={`ml-24 md:ml-0 ${
												index % 2 === 0 ? "md:text-right" : "md:col-start-2"
											}`}
										>
											<h3 className="mb-3 font-bold text-2xl text-foreground">
												{step.title}
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												{step.description}
											</p>
										</div>

										{/* Visual */}
										<div
											className={`ml-24 md:ml-0 ${
												index % 2 === 0 ? "md:col-start-2" : "md:col-start-1"
											}`}
										>
											<div className="aspect-video rounded-lg border border-border bg-linear-to-br from-primary/5 to-primary/10" />
										</div>
									</div>
								</ScrollReveal>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="relative bg-background py-24">
				<div className="container mx-auto max-w-4xl px-4 text-center">
					<ScrollReveal>
						<motion.div
							animate={{ opacity: 1, y: 0 }}
							className="space-y-8"
							initial={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
						>
							<h2 className="font-bold text-3xl text-foreground sm:text-4xl lg:text-5xl">
								Ready to Transform Your Ideas?
							</h2>
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
								Join thousands of users who are already building knowledge
								graphs in real-time.
							</p>
							<motion.div
								animate={{ opacity: 1 }}
								className="flex flex-wrap items-center justify-center gap-4"
								initial={{ opacity: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								viewport={{ once: true }}
							>
								<Button size="lg">
									Start Building Now
									<ArrowRightIcon className="ml-2 size-4" weight="bold" />
								</Button>
								<Button size="lg" variant="outline">
									Learn More
								</Button>
							</motion.div>
						</motion.div>
					</ScrollReveal>
				</div>

				{/* Background Glow */}
				<motion.div
					animate={{ opacity: 0.5 }}
					className="pointer-events-none absolute inset-0 overflow-hidden"
					initial={{ opacity: 0 }}
					transition={{ duration: 1 }}
					viewport={{ once: true }}
				>
					<div className="absolute top-1/2 left-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
				</motion.div>
			</section>
		</div>
	);
}
