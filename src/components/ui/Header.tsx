import { TPageState } from "../../Types";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faPlus,
	faPenToSquare,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import useDebounce from "../../utils/hooks/useDebounce";
interface IHeader {
	changePage: (pageName: TPageState) => void;
	getById: (id: string) => void;
}

// TO DO: Add a callback function that updates app state of the current page (Explore, Create, Manage, etc.)
export function Header({ changePage, getById }: IHeader) {
	const [activePageLink, setActivePageLink] = useState<TPageState>("explore");
	const [input, setInput] = useState<string>("");

	const debouncedSearchInput = useDebounce(input, 500);

	useEffect(() => {
		handleDynamicInput(debouncedSearchInput);
	}, [debouncedSearchInput]);

	// use a listener function, that once the inputted id string reaches the length of Guid,
	//	debounce and fetch it
	function handleDynamicInput(input: string) {
		// Guids have length of 36
		const inputLength = input.length;

		function isGuidinator3000(potentialGuid: string): boolean {
			const validGuidFormat =
				/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i;

			return validGuidFormat.test(potentialGuid);
		}

		const isValidGuid = isGuidinator3000(input);

		if (inputLength === 0) {
			changePage("explore");
		} else if (inputLength === 36 && isValidGuid) {
			getById(input.toUpperCase());
			console.log("GUID DETECTED");
		}
	}

	function handleChangePage(pageName: TPageState) {
		changePage(pageName);
		setActivePageLink(pageName);
	}

	return (
		<header className="fixed top-0 w-full">
			<div className="border-y border-neutral-400 bg-black">
				<div className="mx-auto flex h-20 w-3/5 items-center justify-between">
					<a href="/">
						<h1 className="text-4xl font-bold">reciPR</h1>
					</a>
					<input
						type="text"
						placeholder={`Search or filter by...`}
						className="flex h-10 w-[600px] items-center rounded-xl border border-neutral-400 bg-black px-4 transition-all duration-300 hover:border-white"
						onChange={(e) => setInput(e.target.value)}
					/>
					<div />
				</div>
			</div>
			<div className="mx-auto w-3/5 ">
				<div className="flex gap-4 py-4 text-2xl font-semibold">
					<button
						onClick={() => {
							handleChangePage("explore");
						}}
					>
						<FontAwesomeIcon
							className={
								activePageLink === "explore"
									? `text-white underline decoration-2 underline-offset-2 transition-all duration-300`
									: `text-neutral-400 no-underline decoration-2 underline-offset-2 transition-all duration-300 hover:text-neutral-200`
							}
							icon={faHouse}
						/>
					</button>
					<button
						onClick={() => {
							handleChangePage("create");
						}}
					>
						<FontAwesomeIcon
							className={
								activePageLink === "create"
									? `text-white underline decoration-2 underline-offset-2 transition-all duration-300`
									: `text-neutral-400 no-underline decoration-2 underline-offset-2 transition-all duration-300 hover:text-neutral-200`
							}
							icon={faPlus}
						/>
					</button>
					<button
						onClick={() => {
							handleChangePage("edit");
						}}
					>
						<FontAwesomeIcon
							className={
								activePageLink === "edit"
									? `text-white underline decoration-2 underline-offset-2 transition-all duration-300`
									: `text-neutral-400 no-underline decoration-2 underline-offset-2 transition-all duration-300 hover:text-neutral-200`
							}
							icon={faPenToSquare}
						/>
					</button>

					{/* TO DO: Add functionality to this button once auth implemented */}
					<button>
						<FontAwesomeIcon
							className={
								activePageLink === "edit"
									? `text-white underline decoration-2 underline-offset-2 transition-all duration-300`
									: `text-neutral-400 no-underline decoration-2 underline-offset-2 transition-all duration-300 hover:text-neutral-200`
							}
							icon={faUser}
						/>
					</button>
				</div>
				<div />
				<div />
			</div>
		</header>
	);
}
