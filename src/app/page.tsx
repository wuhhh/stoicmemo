import "@/app/page.css";
import Image from "next/image";

import Experience from "@/components/Experience";
import QuoteActions from "@/components/QuoteActions";
import MenuButtons from "@/components/MenuButtons";
import Info from "@/components/Info";
import LocalFu from "@/components/LocalFu";

interface Quote {
	id: number;
	date: string;
	quote: string;
	author: string;
}

interface Quotes {
	quotes: Quote[];
}

export default async function Home() {
	const { quote } = await getQuote();

	const currentDate = new Date();
	const todayPretty = currentDate.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "2-digit",
	});

	return (
		<>
			<div className="page">
				<LocalFu />
				<main className="page__copy">
					<div className="p-16 h-full">
						<div className="flex flex-col h-full">
							<div className="flex justify-between">
								<Image
									src="/stoicmemo.svg"
									width={114}
									height={90}
									alt="Stoic Memo Logo"
								/>
								<div className="label todayPretty">{todayPretty}</div>
							</div>
							<div className="flex-grow flex flex-col justify-center -mt-[90px]">
								<h1 className="quote my-4">{quote.quote}</h1>
								<div className="author my-4">{quote.author}</div>
							</div>
							<QuoteActions className="translate-y-[9px]" quoteId={quote.id} />
						</div>
					</div>
				</main>
				<aside className="page__experience">
					<Experience />
					<MenuButtons className="page__menuButtons" />
				</aside>
			</div>
			<Info />
		</>
	);
}

async function getQuote() {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Zero-padding month
	const day = String(currentDate.getDate()).padStart(2, "0"); // Zero-padding day
	const data: Quotes = require(`../data/quotes.json`);
	const quote = await data.quotes.find(
		(data) => data.date === `${year}${month}${day}`
	);

	if (quote === undefined) {
		throw new Error("Quote not found");
	}

	return {
		quote,
	};
}
