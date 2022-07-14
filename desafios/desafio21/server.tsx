// @deno-types='https://deno.land/x/servest@v1.3.4/types/react/index.d.ts'
import React from "https://dev.jspm.io/react@16.13.1"
// @deno-types='https://deno.land/x/servest@v1.3.4/types/react-dom/server/index.d.ts'
import ReactDOMServer from "https://dev.jspm.io/react-dom@16.13.1/server"
import { createApp } from 'https://deno.land/x/servest@v1.3.4/mod.ts';

const app = createApp();
const arrayOfColors: string[] = [];

const body = () =>
  ReactDOMServer.renderToString(
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Colores</title>
      </head>
      <body style={{ background: '#000000', color: '#FFF' }}>
        <form method="POST">
          <label htmlFor="color">Escribe un color</label>
          <br />
          <input type="text" id="color" name="color" />
          <br />
          <input type="submit" value="Send" />
        </form>
        <ul>
          {arrayOfColors.map(color => {
            return <li style={{color:color,backgroundColor:"black"}}>{color}</li>
          })}
        </ul>
      </body>
    </html>
  );

app.get('/', (req) =>
  req.respond({
    status: 200,
    headers: new Headers({
      'content-type': 'text/html; charset=UTF-8',
    }),
    body: body(),
  })
);

app.post('/', async (req) => {
  const color = (await req.formData()).value('color');
  if (color) {
    arrayOfColors.push(color);
  }
  req.respond({
    status: 200,
    headers: new Headers({
      'content-type': 'text/html; charset=UTF-8',
    }),
    body: body(),
  });
});

app.listen({
  port: +Deno.env.get('PORT')! || 8080,
});