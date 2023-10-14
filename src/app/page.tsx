import "@/app/page.css";
import Image from "next/image";

import Aside from "@/components/AsidePages";
import Experience from "@/components/Experience";
import Loading from "@/components/Loading";
import LocalFu from "@/components/LocalFu";
import MenuButtons from "@/components/MenuButtons";
import QuoteActions from "@/components/QuoteActions";
import { Quotes } from "@/types/index";

export default async function Home() {
	const { quote } = await fetchRandomQuote();

	const currentDate = new Date();
	const todayPretty = currentDate.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "2-digit",
	});

	const quoteLength = quote.quote.length;

	const quoteLengthClass = () => {
		if (quoteLength < 25) {
			return "quote--lt25";
		}
		if (quoteLength < 50) {
			return "quote--lt50";
		}
		if (quoteLength < 75) {
			return "quote--lt75";
		}
		if (quoteLength < 100) {
			return "quote--lt100";
		}
		if (quoteLength < 125) {
			return "quote--lt125";
		}
		if (quoteLength < 150) {
			return "quote--lt150";
		}
		if (quoteLength < 175) {
			return "quote--lt175";
		}
		if (quoteLength < 200) {
			return "quote--lt200";
		}
		if (quoteLength < 225) {
			return "quote--lt225";
		}

		return "quote--gte225";
	};

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
								<h1 className={`quote my-4 ${quoteLengthClass()}`}>
									{quote.quote}
								</h1>
								<div className="author my-4">{quote.author}</div>
							</div>
							<QuoteActions className="translate-y-[9px]" quote={quote} />
						</div>
					</div>
				</main>
				<aside className="page__experience">
					<Experience />
					<Aside />
					<MenuButtons className="page__menuButtons" />
				</aside>
			</div>
			<Loading />
		</>
	);
}

async function fetchRandomQuote() {
	const res = await fetch(`https://stoic-memo.vercel.app/data/quotes.json`, {
		cache: "no-store",
	});

	const { quotes } = await res.json();

	const quote = quotes[Math.floor(Math.random() * quotes.length)];

	return { quote: quote };
}

async function getRandomQuote() {
	"use server";

	const data: Quotes = require(`../data/quotes.json`);
	const quote = await data.quotes[
		Math.floor(Math.random() * data.quotes.length)
	];

	if (quote === undefined) {
		throw new Error("Quote not found");
	}

	return {
		quote,
	};
}

async function getTodaysQuote() {
	"use server";

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
