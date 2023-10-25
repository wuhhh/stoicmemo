import "./css/globals.css";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
	title: "Stoic Memo",
	description: "",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Head>
				<title>Stoic Memo</title>
				<meta
					name="description"
					content="Stoic Memo offers a unique quote from Stoic philosophy each day."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://stoic-memo.vercel.app/" />
				<meta property="og:title" content="Stoic Memo" />
				<meta
					property="og:description"
					content="Stoic Memo offers a unique quote from Stoic philosophy each day."
				/>
				<meta
					property="og:image"
					content="https://stoic-memo.vercel.app/share-image.png"
				/>

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://stoic-memo.vercel.app/" />
				<meta property="twitter:title" content="Stoic Memo" />
				<meta
					property="twitter:description"
					content="Stoic Memo offers a unique quote from Stoic philosophy each day."
				/>
				<meta
					property="twitter:image"
					content="https://stoic-memo.vercel.app/share-image.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
			</Head>
			<body>{children}</body>
		</html>
	);
}
