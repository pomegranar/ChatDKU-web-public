import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Search,
	Shield,
	Brain,
	Database,
	Zap,
	ArrowRight,
	ChevronRight,
	BookOpen,
	Users,
	CheckCircle,
	Smartphone,
	BarChart3,
	RefreshCw,
	FileText,
	Globe,
	MapPin,
	Layers,
} from "lucide-react";

export default function IntroPage() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* ── Navbar ── */}
			<nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
				<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Image
							src="/logos/new_logo.svg"
							alt="ChatDKU"
							width={28}
							height={28}
						/>
						<span className="font-bold text-base">ChatDKU</span>
					</div>
					<div className="flex items-center gap-1 sm:gap-2">
						<Link href="/about">
							<Button
								variant="ghost"
								size="sm"
								className="hidden sm:inline-flex"
							>
								About
							</Button>
						</Link>
						<Link href="/team-credits">
							<Button
								variant="ghost"
								size="sm"
								className="hidden sm:inline-flex"
							>
								Team
							</Button>
						</Link>
						<Link href="/login">
							<Button size="sm" className="rounded-full px-4">
								Get Started
							</Button>
						</Link>
					</div>
				</div>
			</nav>

			{/* ── Hero ── */}
			<section className="relative overflow-hidden py-24 md:py-36 px-4">
				<div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-background to-emerald-50/40 dark:from-blue-950/20 dark:via-background dark:to-emerald-950/10" />
				{/* decorative blobs */}
				<div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-400/10 dark:bg-blue-400/5 blur-3xl -z-10" />
				<div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-emerald-400/10 dark:bg-emerald-400/5 blur-3xl -z-10" />

				<div className="max-w-4xl mx-auto text-center">
					<Badge variant="secondary" className="mb-5 px-3 py-1">
						DKU Edge Intelligence Lab
					</Badge>
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5 leading-tight">
						Campus information,{" "}
						<span className="text-blue-600 dark:text-blue-400">
							finally in one place.
						</span>
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
						ChatDKU is a campus-specific AI assistant that answers your DKU
						questions — accurately, privately, and instantly.
					</p>
					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<Link href="/login">
							<Button size="lg" className="rounded-full px-8 w-full sm:w-auto">
								Try ChatDKU <ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
						<a href="#how-it-works">
							<Button
								variant="outline"
								size="lg"
								className="rounded-full px-8 w-full sm:w-auto"
							>
								How it works
							</Button>
						</a>
					</div>
				</div>
			</section>

			{/* ── The Problem ── */}
			<section className="py-16 px-4 bg-muted/30">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-10">
						<h2 className="text-2xl md:text-3xl font-bold mb-2">
							Sound familiar?
						</h2>
						<p className="text-muted-foreground">
							Every DKU student has been here.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{[
							{
								icon: FileText,
								title: "Lost in PDFs",
								desc: "Academic policies buried in documents nobody reads twice.",
							},
							{
								icon: Globe,
								title: "10 tabs open",
								desc: "Deadlines, requirements, and resources scattered across a dozen websites.",
							},
							{
								icon: MapPin,
								title: "Office ping-pong",
								desc: "Bounced between offices just to get a simple answer.",
							},
						].map(({ icon: Icon, title, desc }) => (
							<div
								key={title}
								className="bg-background rounded-2xl p-6 border shadow-sm"
							>
								<div className="flex flex-row">
									<Icon className="h-7 w-7 text-muted-foreground mb-3" />
									<h3 className="font-semibold mb-1">{title}</h3>
								</div>
								<p className="text-sm text-muted-foreground">{desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── The Solution ── */}
			<section className="py-16 px-4">
				<div className="max-w-5xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
						<div>
							<Badge variant="outline" className="mb-4">
								The Solution
							</Badge>
							<h2 className="text-2xl md:text-3xl font-bold mb-4">
								An AI that actually knows DKU.
							</h2>
							<p className="text-muted-foreground mb-6 leading-relaxed">
								Unlike general-purpose chatbots, ChatDKU is built on official
								DKU sources — policies, deadlines, courses, campus resources —
								and deployed entirely on DKU infrastructure.
							</p>
							<div className="space-y-3">
								{[
									{
										icon: Shield,
										text: "Fully on-premise — your queries never leave DKU servers",
									},
									{
										icon: BookOpen,
										text: "Grounded in official DKU sources, not the open web",
									},
									{
										icon: Users,
										text: "Built for students, faculty, and staff",
									},
								].map(({ icon: Icon, text }) => (
									<div key={text} className="flex items-start gap-3">
										<Icon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
										<span className="text-sm">{text}</span>
									</div>
								))}
							</div>
						</div>

						{/* Mock chat demo */}
						<div className="bg-muted/40 rounded-3xl p-6 border space-y-3">
							<div className="bg-background rounded-2xl p-4 border text-sm">
								<p className="text-muted-foreground text-xs mb-1.5">You</p>
								<p>
									&ldquo;What&apos;s the deadline to drop a course this
									semester?&rdquo;
								</p>
							</div>
							<div className="bg-blue-50 dark:bg-blue-950/40 rounded-2xl p-4 border border-blue-200/50 dark:border-blue-800/50 text-sm">
								<p className="text-blue-600 dark:text-blue-400 text-xs mb-1.5 flex items-center gap-1.5">
									<Image
										src="/logos/new_logo.svg"
										alt=""
										width={12}
										height={12}
									/>
									ChatDKU
								</p>
								<p className="leading-relaxed">
									The deadline to drop without a &ldquo;W&rdquo; grade is{" "}
									<strong>end of Week 4.</strong> After that, drops appear on
									your transcript. Check the Academic Calendar for exact dates.{" "}
									<span className="text-xs text-muted-foreground">
										[Source: DKU Academic Policies §3.2]
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── Architecture ── */}
			<section id="how-it-works" className="py-16 px-4 bg-muted/30">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-12">
						<Badge variant="outline" className="mb-4">
							Under the Hood
						</Badge>
						<h2 className="text-2xl md:text-3xl font-bold mb-3">
							A full-stack AI platform
						</h2>
						<p className="text-muted-foreground max-w-xl mx-auto">
							Every layer is built for reliability, privacy, and continuous
							improvement.
						</p>
					</div>

					<div className="space-y-2.5 max-w-3xl mx-auto">
						{[
							{
								layer: "Client Interface",
								desc: "Web app — the interface you're using right now",
								color:
									"bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800/40",
								dot: "bg-purple-500",
							},
							{
								layer: "Backend Gateway",
								desc: "Authentication, routing, and request handling",
								color:
									"bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/40",
								dot: "bg-blue-500",
							},
							{
								layer: "AI Agent Core",
								desc: "Planning, retrieval, reasoning, synthesis, and memory",
								color:
									"bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40",
								dot: "bg-emerald-500",
							},
							{
								layer: "Knowledge Base",
								desc: "Indexed DKU documents — vector + keyword searchable",
								color:
									"bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800/40",
								dot: "bg-orange-500",
							},
						].map(({ layer, desc, color, dot }) => (
							<div
								key={layer}
								className={`flex items-center gap-4 rounded-2xl px-5 py-4 border ${color}`}
							>
								<div
									className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}`}
								/>
								<div className="min-w-0">
									<span className="font-semibold text-sm">{layer}</span>
									<span className="text-muted-foreground text-sm">
										{" — "}
										{desc}
									</span>
								</div>
							</div>
						))}
					</div>

					<p className="mt-8 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
						Before any query arrives, an offline ingestion pipeline parses
						official DKU sources, chunks and embeds them, and builds searchable
						indexes. At runtime,{" "}
						<strong className="text-foreground">
							vector search + keyword search + reranking
						</strong>{" "}
						ground every response in real campus information.
					</p>
				</div>
			</section>

			{/* ── Agent Flow ── */}
			<section className="py-16 px-4">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-12">
						<Badge variant="outline" className="mb-4">
							Agent Flow
						</Badge>
						<h2 className="text-2xl md:text-3xl font-bold mb-3">
							How your question becomes an answer
						</h2>
						<p className="text-muted-foreground max-w-xl mx-auto">
							ChatDKU doesn&apos;t guess. Every response goes through a rigorous
							verification loop.
						</p>
					</div>

					{/* Steps — vertical on mobile, horizontal on md+ */}
					<div className="flex flex-col md:flex-row items-stretch md:items-start gap-2 md:gap-1 max-w-4xl mx-auto">
						{[
							{
								step: "1",
								label: "Query",
								icon: Search,
								desc: "Your question enters the system",
							},
							{
								step: "2",
								label: "Retrieve",
								icon: Database,
								desc: "Agent searches the knowledge base",
							},
							{
								step: "3",
								label: "Evaluate",
								icon: CheckCircle,
								desc: "Is the evidence sufficient?",
							},
							{
								step: "4",
								label: "Refine",
								icon: RefreshCw,
								desc: "If not — rewrite query & retrieve again",
							},
							{
								step: "5",
								label: "Synthesize",
								icon: Brain,
								desc: "Generate answer with citations",
							},
						].map(({ step, label, icon: Icon, desc }, i) => (
							<div key={step} className="flex md:flex-col items-center flex-1">
								<div className="flex md:flex-col items-center md:items-center gap-3 md:gap-2 flex-1 md:text-center">
									<div className="flex-shrink-0 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
										{step}
									</div>
									<div className="flex-1 md:flex-none">
										<div className="font-semibold text-sm">{label}</div>
										<div className="text-xs text-muted-foreground">{desc}</div>
									</div>
								</div>
								{i < 4 && (
									<>
										{/* Arrow on mobile (right-pointing) */}
										<ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 md:hidden" />
										{/* Arrow on desktop (down-pointing via rotate) */}
										<div className="hidden md:flex items-center justify-center w-full pt-4">
											<ChevronRight className="h-4 w-4 text-muted-foreground" />
										</div>
									</>
								)}
							</div>
						))}
					</div>

					<div className="mt-10 max-w-2xl mx-auto bg-muted/40 rounded-2xl p-5 border text-sm text-center text-muted-foreground leading-relaxed">
						If the retrieved context isn&apos;t strong enough, the system
						rewrites the query and retrieves again before generating.{" "}
						<strong className="text-foreground">
							No hallucinations, no guessing.
						</strong>{" "}
						Only when evidence passes the sufficiency check does the synthesizer
						produce the final response — complete with citations for manual
						review.
					</div>
				</div>
			</section>

			{/* ── SeekBench ── */}
			<section className="py-16 px-4 bg-muted/30">
				<div className="max-w-5xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
						<div className="space-y-4">
							<div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center">
								<BarChart3 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
							</div>
							<Badge variant="outline">SeekBench</Badge>
							<h2 className="text-2xl md:text-3xl font-bold">
								Not just an answer machine.
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								SeekBench is an evaluation framework woven throughout the
								pipeline — scoring not just final answers, but also retrieval
								quality and intermediate reasoning decisions.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								This lets us pinpoint exactly where the pipeline needs
								improvement, making ChatDKU a{" "}
								<strong className="text-foreground">
									continuously improvable system
								</strong>{" "}
								driven by real evaluation and user feedback.
							</p>
						</div>

						<div className="space-y-3">
							{[
								{
									label: "Retrieval quality",
									icon: Database,
									desc: "Are the right documents being found?",
								},
								{
									label: "Sufficiency decisions",
									icon: CheckCircle,
									desc: "Is the evidence threshold being met correctly?",
								},
								{
									label: "Final answer quality",
									icon: Brain,
									desc: "Is the response accurate, grounded, and helpful?",
								},
							].map(({ label, icon: Icon, desc }) => (
								<div
									key={label}
									className="bg-background rounded-xl p-4 border flex items-start gap-3"
								>
									<Icon className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
									<div>
										<div className="font-semibold text-sm">{label}</div>
										<div className="text-xs text-muted-foreground">{desc}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ── Roadmap ── */}
			<section className="py-16 px-4">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-10">
						<Badge variant="outline" className="mb-4">
							Roadmap
						</Badge>
						<h2 className="text-2xl md:text-3xl font-bold mb-2">
							What&apos;s coming next
						</h2>
						<p className="text-muted-foreground">
							ChatDKU is actively evolving.
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{[
							{
								icon: Smartphone,
								title: "Mobile App",
								desc: "Native iOS & Android for on-the-go access",
							},
							{
								icon: Brain,
								title: "Stronger Agents",
								desc: "More capable multi-step reasoning and planning",
							},
							{
								icon: Layers,
								title: "Visual Data Import",
								desc: "Drag-and-drop interface for adding campus documents",
							},
							{
								icon: Zap,
								title: "Auto Evaluation",
								desc: "More powerful automated benchmarking framework",
							},
						].map(({ icon: Icon, title, desc }) => (
							<div
								key={title}
								className="bg-muted/40 rounded-2xl p-5 border hover:shadow-md hover:bg-muted/60 transition-all duration-200"
							>
								<Icon className="h-6 w-6 mb-3 text-muted-foreground" />
								<h3 className="font-semibold mb-1 text-sm">{title}</h3>
								<p className="text-xs text-muted-foreground">{desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── CTA ── */}
			<section className="py-20 px-4 bg-muted/30">
				<div className="max-w-2xl mx-auto text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Ready to ask your first question?
					</h2>
					<p className="text-muted-foreground mb-8 leading-relaxed">
						ChatDKU is available to all DKU students, faculty, and staff — free,
						fast, and private.
					</p>
					<Link href="/login">
						<Button size="lg" className="rounded-full px-10">
							Get Started <ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</Link>
				</div>
			</section>

			{/* ── Footer ── */}
			<footer className="border-t py-6 px-4">
				<div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
					<div className="flex items-center gap-2">
						<Image
							src="/logos/new_logo.svg"
							alt="ChatDKU"
							width={16}
							height={16}
						/>
						<span>ChatDKU — DKU Edge Intelligence Lab © 2026</span>
					</div>
					<div className="flex gap-4">
						<Link
							href="/about"
							className="hover:text-foreground transition-colors"
						>
							About
						</Link>
						<Link
							href="/team-credits"
							className="hover:text-foreground transition-colors"
						>
							Team
						</Link>
						<Link
							href="/login"
							className="hover:text-foreground transition-colors"
						>
							Login
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
