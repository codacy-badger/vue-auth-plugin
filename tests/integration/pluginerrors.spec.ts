import { createLocalVue } from '@vue/test-utils';
import plugin from '../../src/index';
import { addAxios, addRouter, addVuex, prepareVue } from '../helper/prepare';

let localVue;

describe('Requirements', () => {
  const options = {
    tokenStore: ['vuex', 'localStorage', 'cookie'],
  };
  beforeEach(() => {
    localVue = createLocalVue();
  });
  it('Do not include router', () => {
    localVue = addAxios(localVue);
    localVue = addVuex(localVue);
    try {
      localVue.use(plugin, options);
      expect(false).toBeTruthy();
    } catch (e) {
      expect(e.message).toBe('[vue-auth-plugin] vue-router is a required dependency');
    }
  });
  it('Do not include axios', () => {
    localVue = addRouter(localVue);
    localVue = addVuex(localVue);
    try {
      localVue.use(plugin, options);
      expect(false).toBeTruthy();
    } catch (e) {
      expect(e.message).toBe('[vue-auth-plugin] vue-axios is a required dependency');
    }
  });
  it('Do not include vuex', () => {
    localVue = addRouter(localVue);
    localVue = addAxios(localVue);
    try {
      localVue.use(plugin, options);
      expect(false).toBeTruthy();
    } catch (e) {
      expect(e.message).toBe('[vue-auth-plugin] vuex is a required dependency if you want to use "vuex" as storage');
    }
  });
  it('Do not include vuex and not use in storage', () => {
    localVue = addRouter(localVue);
    localVue = addAxios(localVue);
    try {
      localVue.use(plugin, { ...options, tokenStore: ['localStorage', 'cookie'] });
      expect(localVue.$auth).toBeDefined();
    } catch (e) {
      expect(false).toBeTruthy();
    }
  });
});
