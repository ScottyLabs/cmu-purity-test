import { Home } from "@/routes/home";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
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
			</head>
			<body>{props.children}</body>
		</html>
	);
};

app.get("/", (c) => {
	return c.html(
		<Layout>
			<Home />
		</Layout>,
	);
});

export default app;
