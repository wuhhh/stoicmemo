import "./css/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Stoic Memo",
	description:
		"Stoic Memo offers a unique quote from Stoic philosophy each day.",
	openGraph: {
		type: "website",
		url: "https://stoic-memo.vercel.app/",
		title: "Stoic Memo",
		description:
			"Stoic Memo offers a unique quote from Stoic philosophy each day.",
		images: [
			{
				url: "https://stoic-memo.vercel.app/share-image.png",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "https://stoic-memo.vercel.app/",
		creator: "@huwrobertsnet",
		title: "Stoic Memo",
		description:
			"Stoic Memo offers a unique quote from Stoic philosophy each day.",
		images: [
			{
				url: "https://stoic-memo.vercel.app/share-image.png",
			},
		],
	},
	icons: [
		{
			rel: "apple-touch-icon",
			sizes: "180x180",
			url: "/apple-touch-icon.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "32x32",
			url: "/favicon-32x32.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "16x16",
			url: "/favicon-16x16.png",
		},
		{
			rel: "manifest",
			url: "/site.webmanifest",
		},
	],
	themeColor: "#ffffff",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
