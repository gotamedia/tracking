# Tracking Proxy
BN Tracking Proxy package

## Prerequisite
Tracking package is a layer around GTM (Google Tag Manager) and requires some configurations in GTM in order to work as expected

### GTM requirements
You need to create a new template in your GTM along with a Tag with a Trigger
* Import the template in: `@gotamedia/tracking/src/GTM_Template.tpl` into your GTM
* Create a new Tag and configure it to use the new imported template
* Fill all the required fields in the template once you add it to the Tag
* Create a new Trigger and configure it to fire the new created Tag

## Install

```sh
npm i @gotamedia/tracking
```

## Usage
```ts
import { GTM, push } from '@gotamedia/tracking'

GTM.initiate()

push({
    ...
})
```

***NOTE: it is very important to call GTM.initiate() and call it ASAP to setup GTM utils wait for CMP to be ready before pushing any Tags.***

## Build

Tracking uses Rollup to build and bundle
```sh
npm run build
```

## Publish

To inspect the package before publishing to npm
```sh
npm run package:details
```

To publish to npm
```sh
npm run package:publish
```

## Develop with Tracking

In order to develop with Tracking with your project locally, make sure to have `yalc` installed globally on your machine by running:
```sh
npm install -g yalc
```

### Publish locally

To use Tracking in your project locally make sure to build Tracking by running:
```sh
npm run build:local
```

This will make sure to build and publish Tracking into a local registery on your machine so you can install it as a package in your projects

### Install locally

In your project run the following command:
```sh
yalc add @gotamedia/tracking
npm install
```

After you are done with running Tracking locally in your project, make sure to clean up and remove the link from your project's dependencies
```sh
yalc remove @gotamedia/tracking
```

This will make sure to remove the link from your project's dependencies and revert to the old value if there was any

[Read more about yalc](https://www.npmjs.com/package/yalc)

## Release

### Package
* Commit all your changes with messages follows Conventional commits
* Merge all your changes to trunk branch
* Push to remote

That's it 🎉 
You just trigered a release action and Github will take care of the rest 🙃 

This will run build workflow in Github Actions and once it's successfully done it will trigger a publish workflow to publish the package to NPM registery.

## Tracking Development & Contributing

### Trunk based development
This project uses a [trunk based development](https://cloud.google.com/architecture/devops/devops-tech-trunk-based-development) workflow.

### Conventional commits
This project works with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).