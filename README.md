# React Boilerplate

WIP

## Getting Started

### Installing

```bash
git clone https://github.com/gabiseabra/react-boilerplate
cd react-boilerplate
npm install
```

### Building

Run the `build` script to build everything for production.

```bash
npm run build
```

The `vendor` bundle is a prerequisite for building the `client` bundle, so it is built first and followed by the `server` and `client` bundles in parallel. Each one can be built separately with their respective commands:

#### Vendor

```bash
npm run build:vendor
```

Contains all vendor code (React stuff, etc).

Output: `public/dist/`

#### Client

```bash
npm run build:client
```

Contains compiled js and assets for the browser.

Input: `src/client.jsx`

Output: `public/dist/`, `public/appcache/`, `public/sw.js`

#### Server

```bash
npm run build:server
```

Contains compiled js for the server.

Input: `src/server.jsx`

Output: `dist/`

----

#### Static

Optionally, a static index.html file can be built with `build:static`:

```bash
npm run build:static
```

Output: `public/index.html`

## Running Dev Server

```bash
npm run watch
```
Listens to [localhost:3001](localhost:3001) by default.

## Running Production Server

```bash
npm start
```
Listens to [localhost:3000](localhost:3000) by default.

## Commands

All commands can be found in the `scripts` section of [package.json](package.json).

#### start - `npm run start`

Start production server.

#### watch - `npm run watch`

Start development server.

#### lint - `npm run lint`

Run eslint.

#### build - `npm run build`

Build all for production.

#### clean - `npm run clean`

Clean all compiled bundles.

#### [build|clean]:vendor - `npm run build:vendor`

Build/Clean vendor bundle.

#### [build|clean]:client - `npm run build:client`

Build/Clean client bundle.

#### [build|clean]:server - `npm run build:server`

Build/Clean server bundle.

#### [build|clean]:static - `npm run build:static`

Build/Clean static index.html.

