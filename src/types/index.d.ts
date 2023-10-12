export interface Quote {
	id: number;
	date: string;
	quote: string;
	author: string;
}

export interface Quotes {
	quotes: Quote[];
}