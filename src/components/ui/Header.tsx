export function Header() {
	return (
		<header className="fixed top-0 w-full border-y border-neutral-400 bg-black">
			<div className="mx-auto flex h-20 w-4/5 items-center justify-between">
				<a href="/">
					<h1 className="text-4xl font-bold">reciPR</h1>
				</a>
				<input
					placeholder="Search or filter by..."
					className="flex h-10 w-[600px] items-center rounded-xl border border-neutral-400 bg-black px-4 transition-all duration-300 hover:border-white"
				/>
				<div />
			</div>
		</header>
	);
}
