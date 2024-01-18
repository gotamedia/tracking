# Changelog

## [2.0.1](https://github.com/gotamedia/tracking/compare/v2.0.0...v2.0.1) (2024-01-18)


### Bug Fixes

* Fixed `event_params` payload for Active Usage events. ([6c5726e](https://github.com/gotamedia/tracking/commit/6c5726ef9797f172b57d19002a6386f1a5e9a7ba))

## [2.0.0](https://github.com/gotamedia/tracking/compare/v1.0.3...v2.0.0) (2024-01-05)


### ⚠ BREAKING CHANGES

* Fixed better handling for client/session ids and bump major due to a typo in `TrackingProps.Cookies`

### Features

* Fixed better handling for client/session ids and bump major due to a typo in `TrackingProps.Cookies` ([3227e0f](https://github.com/gotamedia/tracking/commit/3227e0f1b62fedbc1d3066223f939811bd95ba46))

## [1.0.3](https://github.com/gotamedia/tracking/compare/v1.0.2...v1.0.3) (2023-12-14)


### Bug Fixes

* Added missing "currency" property to ecommerce data for "paywall loaded" event, ([f989690](https://github.com/gotamedia/tracking/commit/f989690e8c0da5db10269f45a7e2c1c9b04026c1))
* Improved on "Video" event. ([bc71f1a](https://github.com/gotamedia/tracking/commit/bc71f1a7c231bb40426b0247a5ee02ce85c8b102))
* Replaced "react-device-detect" package with "ua-parser-js" and fixed screen width/height values. ([28208c5](https://github.com/gotamedia/tracking/commit/28208c57e774baaf1cb1c55cb64feb5673322401))

## [1.0.2](https://github.com/gotamedia/tracking/compare/v1.0.1...v1.0.2) (2023-12-12)


### Bug Fixes

* Fixed setting correct max-age values when setting cookies. ([f28f40a](https://github.com/gotamedia/tracking/commit/f28f40a4acba8ebc7ee2a22863511faaf49ffb12))

## [1.0.1](https://github.com/gotamedia/tracking/compare/v1.0.0...v1.0.1) (2023-12-11)


### Bug Fixes

* Prevent GlobalTracking from sending ActiveUsage event on before unload to avoid error outputs when the Browser aborts the request. ([9194943](https://github.com/gotamedia/tracking/commit/9194943dd009ea529bef477ee326529c3b1f154e))

## 1.0.0 (2023-12-01)


### Features

* Introduced Tracking package. ([0471325](https://github.com/gotamedia/tracking/commit/047132563888d90bc1c052f1906692d24fa952b9))
