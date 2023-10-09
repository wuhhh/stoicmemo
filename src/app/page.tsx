// import page css
import "@/app/page.css";
import Image from "next/image";

import Experience from "@/components/Experience";
import QuoteActions from "@/components/QuoteActions";
import MenuButtons from "@/components/MenuButtons";
import Info from "@/components/Info";

export default function Home() {
	const today = new Date().toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "2-digit",
	});

	return (
		<>
			<div className="bg-warm-grey flex h-full">
				<main className="w-1/2 bg-smoke">
					<div className="p-16 h-full">
						<div className="flex flex-col h-full">
							<div className="flex justify-between">
								<Image
									src="/stoicmemo.svg"
									width={114}
									height={90}
									alt="Stoic Memo Logo"
								/>
								<div className="label">{today}</div>
							</div>
							<div className="flex-grow flex flex-col justify-center -mt-[90px]">
								<h1 className="quote my-4">
									You have power over your mind, not outside events. Realise
									this and you will find strength.
								</h1>
								<div className="author my-4">Marcus Aurelius</div>
							</div>
							<QuoteActions className="translate-y-[9px]" />
						</div>
					</div>
				</main>
				<aside className="relative w-1/2">
					<Experience />
					<MenuButtons className="absolute top-16 right-16 text-hot-pink" />
				</aside>
			</div>
			<Info />
		</>
	);
}
