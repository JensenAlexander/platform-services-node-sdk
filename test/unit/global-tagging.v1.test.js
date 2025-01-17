/**
 * (C) Copyright IBM Corp. 2021.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const GlobalTaggingV1 = require('../../dist/global-tagging/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const globalTaggingServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://tags.global-search-tagging.cloud.ibm.com',
};

const globalTaggingService = new GlobalTaggingV1(globalTaggingServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(globalTaggingService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('GlobalTaggingV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = GlobalTaggingV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(GlobalTaggingV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(GlobalTaggingV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(GlobalTaggingV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = GlobalTaggingV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(GlobalTaggingV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new GlobalTaggingV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new GlobalTaggingV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(GlobalTaggingV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('listTags', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listTags
        const impersonateUser = 'testString';
        const accountId = 'testString';
        const tagType = 'user';
        const fullData = true;
        const providers = ['ghost'];
        const attachedTo = 'testString';
        const offset = 0;
        const limit = 1;
        const timeout = 0;
        const orderByName = 'asc';
        const attachedOnly = true;
        const params = {
          impersonateUser: impersonateUser,
          accountId: accountId,
          tagType: tagType,
          fullData: fullData,
          providers: providers,
          attachedTo: attachedTo,
          offset: offset,
          limit: limit,
          timeout: timeout,
          orderByName: orderByName,
          attachedOnly: attachedOnly,
        };

        const listTagsResult = globalTaggingService.listTags(params);

        // all methods should return a Promise
        expectToBePromise(listTagsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tags', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['impersonate_user']).toEqual(impersonateUser);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['tag_type']).toEqual(tagType);
        expect(options.qs['full_data']).toEqual(fullData);
        expect(options.qs['providers']).toEqual(providers);
        expect(options.qs['attached_to']).toEqual(attachedTo);
        expect(options.qs['offset']).toEqual(offset);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['timeout']).toEqual(timeout);
        expect(options.qs['order_by_name']).toEqual(orderByName);
        expect(options.qs['attached_only']).toEqual(attachedOnly);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalTaggingService.listTags(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        globalTaggingService.listTags({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createTag', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createTag
        const tagNames = ['testString'];
        const impersonateUser = 'testString';
        const accountId = 'testString';
        const tagType = 'access';
        const params = {
          tagNames: tagNames,
          impersonateUser: impersonateUser,
          accountId: accountId,
          tagType: tagType,
        };

        const createTagResult = globalTaggingService.createTag(params);

        // all methods should return a Promise
        expectToBePromise(createTagResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tags', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['tag_names']).toEqual(tagNames);
        expect(options.qs['impersonate_user']).toEqual(impersonateUser);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['tag_type']).toEqual(tagType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const tagNames = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          tagNames,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalTaggingService.createTag(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalTaggingService.createTag({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const createTagPromise = globalTaggingService.createTag();
        expectToBePromise(createTagPromise);

        createTagPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteTagAll', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteTagAll
        const providers = 'ghost';
        const impersonateUser = 'testString';
        const accountId = 'testString';
        const tagType = 'user';
        const params = {
          providers: providers,
          impersonateUser: impersonateUser,
          accountId: accountId,
          tagType: tagType,
        };

        const deleteTagAllResult = globalTaggingService.deleteTagAll(params);

        // all methods should return a Promise
        expectToBePromise(deleteTagAllResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tags', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['providers']).toEqual(providers);
        expect(options.qs['impersonate_user']).toEqual(impersonateUser);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['tag_type']).toEqual(tagType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalTaggingService.deleteTagAll(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        globalTaggingService.deleteTagAll({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteTag', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteTag
        const tagName = 'testString';
        const providers = ['ghost'];
        const impersonateUser = 'testString';
        const accountId = 'testString';
        const tagType = 'user';
        const params = {
          tagName: tagName,
          providers: providers,
          impersonateUser: impersonateUser,
          accountId: accountId,
          tagType: tagType,
        };

        const deleteTagResult = globalTaggingService.deleteTag(params);

        // all methods should return a Promise
        expectToBePromise(deleteTagResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tags/{tag_name}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['providers']).toEqual(providers);
        expect(options.qs['impersonate_user']).toEqual(impersonateUser);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['tag_type']).toEqual(tagType);
        expect(options.path['tag_name']).toEqual(tagName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const tagName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          tagName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalTaggingService.deleteTag(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalTaggingService.deleteTag({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const deleteTagPromise = globalTaggingService.deleteTag();
        expectToBePromise(deleteTagPromise);

        deleteTagPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('attachTag', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Resource
      const resourceModel = {
        resource_id: 'testString',
        resource_type: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation attachTag
        const resources = [resourceModel];
        const tagName = 'testString';
        const tagNames = ['testString'];
        const impersonateUser = 'testString';
        const accountId = 'testString';
        const tagType = 'user';
        const params = {
          resources: resources,
          tagName: tagName,
          tagNames: tagNames,
          impersonateUser: impersonateUser,
          accountId: accountId,
          tagType: tagType,
        };

        const attachTagResult = globalTaggingService.attachTag(params);

        // all methods should return a Promise
        expectToBePromise(attachTagResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tags/attach', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['resources']).toEqual(resources);
        expect(options.body['tag_name']).toEqual(tagName);
        expect(options.body['tag_names']).toEqual(tagNames);
        expect(options.qs['impersonate_user']).toEqual(impersonateUser);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['tag_type']).toEqual(tagType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const resources = [resourceModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          resources,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalTaggingService.attachTag(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalTaggingService.attachTag({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const attachTagPromise = globalTaggingService.attachTag();
        expectToBePromise(attachTagPromise);

        attachTagPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('detachTag', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Resource
      const resourceModel = {
        resource_id: 'testString',
        resource_type: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation detachTag
        const resources = [resourceModel];
        const tagName = 'testString';
        const tagNames = ['testString'];
        const impersonateUser = 'testString';
        const accountId = 'testString';
        const tagType = 'user';
        const params = {
          resources: resources,
          tagName: tagName,
          tagNames: tagNames,
          impersonateUser: impersonateUser,
          accountId: accountId,
          tagType: tagType,
        };

        const detachTagResult = globalTaggingService.detachTag(params);

        // all methods should return a Promise
        expectToBePromise(detachTagResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tags/detach', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['resources']).toEqual(resources);
        expect(options.body['tag_name']).toEqual(tagName);
        expect(options.body['tag_names']).toEqual(tagNames);
        expect(options.qs['impersonate_user']).toEqual(impersonateUser);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['tag_type']).toEqual(tagType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const resources = [resourceModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          resources,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalTaggingService.detachTag(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalTaggingService.detachTag({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const detachTagPromise = globalTaggingService.detachTag();
        expectToBePromise(detachTagPromise);

        detachTagPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
