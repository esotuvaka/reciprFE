import { TPageState } from "../../Types";

interface IHeader {
	changePage: (pageName: TPageState) => void;
}

// TO DO: Add a callback function that updates app state of the current page (Explore, Create, Manage, etc.)
export function Header({ changePage }: IHeader) {
	// Single function, takes in string of whatever page button clicked
	function handleChangePage(pageName: TPageState) {
		changePage(pageName);
	}
	return (
		<header className="fixed top-0 w-full">
			<div className="border-y border-neutral-400 bg-black">
				<div className="mx-auto flex h-20 w-3/5 items-center justify-between">
					<a href="/">
						<h1 className="text-4xl font-bold">reciPR</h1>
					</a>
					<input
						placeholder="Search or filter by..."
						className="flex h-10 w-[600px] items-center rounded-xl border border-neutral-400 bg-black px-4 transition-all duration-300 hover:border-white"
					/>
					<div />
				</div>
			</div>
			<div className="mx-auto w-3/5 ">
				<div className="flex gap-4 py-4 text-2xl font-semibold">
					<button
						className="no-underline decoration-2 underline-offset-2 transition-all duration-300 hover:underline"
						onClick={() => {
							handleChangePage("explore");
						}}
					>
						Explore
					</button>
					<button
						className="no-underline decoration-2 underline-offset-2 transition-all duration-300 hover:underline"
						onClick={() => {
							handleChangePage("create");
						}}
					>
						Create
					</button>
					<button
						className="no-underline decoration-2 underline-offset-2 transition-all duration-300 hover:underline"
						onClick={() => {
							handleChangePage("edit");
						}}
					>
						Edit
					</button>
				</div>
				<div />
				<div />
			</div>
		</header>
	);
}
