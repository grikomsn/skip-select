# skip-select

This is a take home assignment for [skip.money](https://skip.money)'s open Frontend Developer position.

https://skip-select.nibras.co

## Assignment

> Your assignment is to build a few simple interfaces - Skip Select - that allows users to explore MEV data. You should build a single page that has the following two tabs:
>
> - **Overview**: Displays summary information about MEV extraction on a handful of different chains (e.g. revenue breakdown by chain, total number of validators running Skip, etc...)
> - **Validators**: Displays information about each validators MEV revenue for a particular chain, includes a button to select which chain you’d like to view (e.g. Osmosis, JUNO, etc...)
>
> The general UX/UI can be found [here](https://www.figma.com/file/4eFNCvISChvK54WbRhMohH/Skip-Select) along with the required tabs. There’s no need to build the “nice to have” interfaces.

## Libraries Used

Notable libraries used in this project:

- [Next.js](https://nextjs.org)
- [Chakra UI](https://chakra-ui.com)
- [Saas UI](https://saas-ui.dev)
- [Tanstack Query](tanstack.com/query)
- [Nivo](https://nivo.rocks)

View more on the project's [package.json](./package.json).

## Project Prerequisites

This project requires these to be installed:

- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io)

## Setup Repository

Clone the repository and install dependencies:

```bash
git clone https://github.com/grikomsn/skip-select
cd skip-select
pnpm install
```

## Start Development Server

This will run `pnpm run dev:theme` and `pnpm run dev:next` which [builds the Chakra UI theme typings](https://chakra-ui.com/docs/styled-system/cli) and [runs the Next.js development server](https://nextjs.org/docs/getting-started/installation#run-the-development-server) in [parallel mode](https://pnpm.io/cli/run#running-multiple-scripts):

```bash
pnpm run dev
```

## Building Application

```bash
next build
```

## Links

- https://github.com/grikomsn/skip-select
- https://skip-select.nibras.co
