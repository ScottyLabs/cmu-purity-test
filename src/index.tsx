import { Hono } from "hono";
import type { FC } from "hono/jsx";

const app = new Hono()

const Layout: FC = (props) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  )
}

const Home: FC = (props) => {
  return (
    <Layout>
      <p>Hello world</p>
    </Layout>
  )
}

app.get('/', (c) => {
  return c.html(<Home />)
})

export default app
