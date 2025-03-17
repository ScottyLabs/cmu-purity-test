import questions from "@/questions.json";
import { Questions, Result } from "@/test";
import { type Context, Hono } from "hono";
import { serveStatic } from "hono/bun";
import { getCookie, setCookie } from "hono/cookie";
import type { FC } from "hono/jsx";

const app = new Hono();
app.use("/static/*", serveStatic({ root: "./" }));

const Layout: FC = (props) => {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>CMU Purity Test</title>

				<link
					href="/static/tailwind.css"
					rel="stylesheet"
					type="text/css"
				/>
				<script src="https://unpkg.com/htmx.org@2.0.4" />
			</head>
			<body>{props.children}</body>
		</html>
	);
};

interface CheckedItems {
	[key: number]: boolean;
}

const setCheckedItems = (c: Context, checkedItems: CheckedItems) => {
	setCookie(c, "checkedItems", JSON.stringify(checkedItems), {
		path: "/",
		maxAge: 60 * 60 * 24, // 24 hours
		httpOnly: true,
	});
};

const getCheckedItems = (c: Context): CheckedItems => {
	const cookieValue = getCookie(c, "checkedItems");
	return cookieValue ? JSON.parse(cookieValue) : {};
};

app.get("/", (c) => {
	return c.html(
		<Layout>
			<Questions />
		</Layout>,
	);
});

app.post("/api/toggle-item", async (c) => {
	try {
		const formData = await c.req.formData();
		const index = formData.get("index");

		if (index === null) {
			return c.json({ success: false, error: "No index provided" }, 400);
		}

		const indexNum = Number.parseInt(index.toString(), 10);
		const checkedItems = getCheckedItems(c);
		checkedItems[indexNum] = !checkedItems[indexNum];

		setCheckedItems(c, checkedItems);
		return c.json({ success: true });
	} catch (error) {
		return c.json({ success: false, error: (error as Error).message }, 400);
	}
});

app.post("/api/calculate-score", async (c) => {
	const checkedItems = getCheckedItems(c);
	const checkedCount = Object.values(checkedItems).filter(Boolean).length;
	const score = Math.round(
		((questions.length - checkedCount) / questions.length) * 100,
	);

	return c.html(<Result score={score} />);
});

app.get("/api/reset", (c) => {
	setCheckedItems(c, {});
	return c.html(<Questions />);
});

export default app;
