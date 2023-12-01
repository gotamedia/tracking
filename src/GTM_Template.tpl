___INFO___

{
  "type": "TAG",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "BN Tracking Proxy",
  "brand": {
    "id": "brand_dummy",
    "displayName": ""
  },
  "description": "",
  "containerContexts": [
    "WEB"
  ]
}


___TEMPLATE_PARAMETERS___

[
  {
    "type": "TEXT",
    "name": "scopeDomain",
    "displayName": "Scope domain",
    "simpleValueType": true
  },
  {
    "type": "CHECKBOX",
    "name": "debugMode",
    "checkboxText": "Debug mode",
    "simpleValueType": true
  }
]


___SANDBOXED_JS_FOR_WEB_TEMPLATE___

const JSON = require('JSON');
const Math = require('Math');
const log = require('logToConsole');
const generateRandom = require('generateRandom');
const copyFromWindow = require('copyFromWindow');
const copyFromDataLayer = require('copyFromDataLayer');

const debugMode = data.debugMode;
const scopeDomain = data.scopeDomain;
const trackingUtils = copyFromWindow('trackingUtils');

const proxyEndpoint = 'https://tracking.' + scopeDomain + '/bn-events/v1';

const trackingData = copyFromDataLayer('trackingData');

if (debugMode) {
  log('Preparing to send tracking data: ', trackingData);
  log('Using tracking endpoint: ', proxyEndpoint);
}

if (trackingData) {
  const cacheKey = generateRandom(100000000000000, 999999999999999);

  if (debugMode) {
    log('Tracking cache key: ', cacheKey);
  }

  const requestUrl = proxyEndpoint + (debugMode ? '/debug' : '') + '?z=' + cacheKey;
  
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trackingData)
  };
  
  trackingUtils.sendRequest(requestUrl, requestOptions, debugMode);
}

data.gtmOnSuccess();


___WEB_PERMISSIONS___

[
  {
    "instance": {
      "key": {
        "publicId": "logging",
        "versionId": "1"
      },
      "param": [
        {
          "key": "environments",
          "value": {
            "type": 1,
            "string": "all"
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "read_data_layer",
        "versionId": "1"
      },
      "param": [
        {
          "key": "allowedKeys",
          "value": {
            "type": 1,
            "string": "any"
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "access_globals",
        "versionId": "1"
      },
      "param": [
        {
          "key": "keys",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "key"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  },
                  {
                    "type": 1,
                    "string": "execute"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "trackingUtils"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": false
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  }
]


___TESTS___

scenarios: []


___NOTES___

Created on 28/11/2023, 13:40:50


