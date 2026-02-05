import { BlogList } from "@/components/viewtran/BlogList";
import { getAllBlogPosts } from "@/lib/BlogApi";
import { SuspenseProvider } from "@/providers/SuspenseProvider";

async function BlogListWrapper() {
	const posts = await getAllBlogPosts();
	return <BlogList posts={posts} />;
}

export default function AboutPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<SuspenseProvider
				fallback={
					<div className="mx-auto max-w-6xl">
						<header className="mb-12">
							<h1 className="mb-4 font-bold text-4xl md:text-5xl">
								Blog Posts
							</h1>
							<p className="text-gray-600 text-lg dark:text-gray-400">
								Loading posts...
							</p>
						</header>
					</div>
				}
			>
				<BlogListWrapper />
			</SuspenseProvider>
		</div>
	);
}
