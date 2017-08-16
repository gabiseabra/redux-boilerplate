# React Boilerplate

## Getting Started

### Installing

```bash
git clone https://github.com/gabiseabra/react-boilerplate.git
cd react-boilerplate
npm install
```

### Building

Use a build command to build distributable package:

```bash
npm run build
```

Build commands:

| Command          | Description               | Output
|------------------|---------------------------|--------------------
| `build:vendor`   | Build vendor bundle       | `/public/dist`
| `build:client`*  | Build web client bundle   | `/public/dist`
| `build:server`*  | Build server bundle       | `/dist`
| `build`          | Build all                 | \*
| `build:prod`     | Build all for production  | \*
| `build:dev`      | Build all for development | \*
| `build:static`** | Build static index.html   | `/public/index.html`

\* The `vendor` bundle is a prerequisite for building the `client` and `server` bundles. Make sure to `npm run build:vendor` before using these commands.  

\*\* `build:static` requires a `client` build.

## Docker

```bash
docker run -p 3000:80 -d gabiseabra/react-boilerplate
```
