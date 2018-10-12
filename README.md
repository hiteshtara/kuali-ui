# KualiUI

## Getting Started

### Introduction

KualiUI consists of custom React components as well as customized components from the [react-md](https://react-md.mlaursen.com/) project.

### Installation

`npm install @kuali/kuali-ui --registry=<your registry url>`

### Material Icons

Kuali-UI utilizes the [material-icons font](http://google.github.io/material-design-icons/#icon-font-for-the-web). You will need to load the font on any page with kuali-ui components.

### Importing CSS

A set of Compiled CSS for KualiUI is available at `@kuali/kuali-ui/lib/kuali-ui.min.css`

### Importing React Components

You can import the entire KualiUI library to get a component

```jsx
import React from 'react'
import { render } from 'react-dom'

import { Header } from '@kuali/kuali-ui'

render(<Header />, document.querySelector('#app'))
```

Or you can import a single component if you know the path.

```jsx
import React from 'react'
import { render } from 'react-dom'

import Header from '@kuali/kuali-ui/lib/header'

render(<Header />, document.querySelector('#app'))
```

## Development Guide

| [yarn](https://yarnpkg.com/en/docs/install) is used to build and develop KualiUI so the following docs assume that you're using yarn.

### Node Version Requirements

This project needs node version 6.11.2 or higher. Download and Installation instructions can be found on the [NodeJS webpack](https://nodejs.org/en/)

| Alternatively we recommend using [nvm](https://github.com/creationix/nvm) and an `.nvmrc` file is provided in the project root.

### Installation

| There is a npm hook that will run the tests and build during installation.

```
yarn
```

### Storybook

We use [storybook](https://github.com/storybooks/storybook) to serve and test components, as well as to provide some living documentation:

To start locally run:

```
yarn storybook:start
open http://localhost:9001
```

To build a static version of the storybook docs for deployment run

```
yarn storybook:compile
````

To compile & publish storybook (you'll need the [AWS CLI](https://aws.amazon.com/cli/) and your AWS credentials [configured properly](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)) run:

```
yarn storybook:publish
```

The storybook site is published [here](http://cor-kuali-ui.s3-website-us-west-2.amazonaws.com/).

#### Exporting Storybook components to Sketch

You can export Storybook components and import them into Sketch as a symbol library. This is experimental; some elements may not transfer over correctly, but it might be useful in certain contexts. This is done via [Storybook2Sketch](https://github.com/chrisvxd/story2sketch).

1. Storybook must be running locally, as outlined above.
2. Download the [asketch2sketch.sketchplugin](https://github.com/brainly/html-sketchapp/releases/), unzip, and install to Sketch.
3. Run this in terminal while in any directory
```
npm i story2sketch -g
```
4. In terminal, navigate to the directory you want your output file created in.
5. Run the following
```
story2sketch --url http://localhost:9001/iframe.html --output stories.asketch.json --stories all --concurrency 1
```
6. In the Sketch Plugins menu, choose "From Almost Sketch to Sketch", and select the `stories.asketch.json` file you created in the previous step.

There are additional [configuration options](https://github.com/chrisvxd/story2sketch#api) that might be useful.

### Tests

running the test suite

```
yarn test
```

running the test suite in watch mode

```
yarn test:watch
```

generating a coverage report

```
yarn test:coverage
```

#### Known Issues

if watch mode fails because you're on macOS Sierra you need to [reinstall watchman](https://github.com/facebook/jest/issues/1767)

```
brew install watchman
```

### CSS Regression Testing

have storybook running

```
yarn storybook:start
```

save bitmap references

```
yarn test:css:update
```

run your new code against the references

```
yarn test:css
```

## Using NPM link to integrate your changes locally

Using [npm link](https://docs.npmjs.com/cli/link) you can work on, and test, without needing to publish to an npm registry. _To ensure this works properly make sure all projects are using the same node version._

Within the kuali-ui repo running the following command will create a symlink on your local machine

```bash
npm link
```

Now you can install kuali-ui from your local symlink instead of from a remote npm registry.

```bash
cd ../to/the/consuming/project
npm link @kuali/kuali-ui
```

| When you make changes to kuali-ui components you'll need to compile a new build to consume.

| `npm run build`


## Publishing

| There is a automated prepublish hook that will verify and compile the files during publishing.

### If you're publishing a new version

Update the version.

| I recommend [`npm version`](https://docs.npmjs.com/cli/version) since it handles updating the `package.json` file as well as the git tags

```
npm version <major|minor|patch>
```

Compile and publish.

```
npm publish --registry=<your registry url>
```

Make sure you push the tags back to github

```
git push && git push --tags
```

### If you're publishing from a previous version

```
git checkout <version tag>
yarn
npm publish --registry=<your registry url>
```
