import "@/app/page.css";
import Image from "next/image";

import Experience from "@/components/Experience";
import QuoteActions from "@/components/QuoteActions";
import MenuButtons from "@/components/MenuButtons";
import Info from "@/components/Info";

import transientStore from "@/stores/transient";
import { useEffect } from "react";

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
	const { props } = await getQuote();
	const quote = props.quote;

	const currentDate = new Date();
	const todayPretty = currentDate.toLocaleDateString(undefined, {
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
								<div className="label">{todayPretty}</div>
							</div>
							<div className="flex-grow flex flex-col justify-center -mt-[90px]">
								<h1 className="quote my-4">{quote.quote}</h1>
								<div className="author my-4">{quote.author}</div>
							</div>
							<QuoteActions className="translate-y-[9px]" quoteId={quote.id} />
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
		props: {
			quote,
		},
	};
}
