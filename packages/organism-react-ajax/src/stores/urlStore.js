import {ReduceStore} from 'reshow-flux';
import urlDispatcher, {urlDispatch} from '../urlDispatcher';
import get from 'get-object-value';
import setUrl, {getUrl} from 'seturl';
import {win, doc} from 'win-doc';

const keys = Object.keys;

const updateUrl = url => history.pushState('', '', url);

class URL {
  loc = {};
  constructor(loc) {
    this.loc = {...loc};
  }

  getHref(loc) {
    return this.loc.href;
  }

  get(key) {
    let value;
    if (0 === key.indexOf(':')) {
      const cookKey = key.substr(1);
      value = get(this.loc, [key.substr(1)]);
      if ('pathname' === cookKey) {
        value = value.split('/');
      }
    } else {
      const href = this.getHref();
      if (href) {
        value = getUrl(key, this.getHref());
      }
    }
    return value;
  }
}

class UrlStore extends ReduceStore {
  getInitialState() {
    let loc = {};
    setTimeout(() => {
      const oDoc = doc();
      if (oDoc.URL) {
        urlDispatch({type: 'url', url: oDoc.URL});
        this.registerEvent(win());
      }
    });
    return new URL({});
  }

  registerEvent(win) {
    if (win && win.document) {
      win.addEventListener(
        'popstate',
        () => {
          urlDispatch({type: 'url', url: doc().URL});
        },
        true,
      );
    }
  }

  reduce(state, action) {
    const oDoc = doc();
    if (!oDoc.URL) {
      return state;
    }
    let url;
    switch (action.type) {
      case 'url':
        url = get(action, ['url']);
        if (!url) {
          console.error('Not assign url', action);
        }
        break;
      case 'query':
        url = oDoc.URL;
        keys(get(action.params, null, [])).forEach(key => {
          url = setUrl(key, get(action, ['params', key]), url);
        });
        break;
    }
    if (url !== oDoc.URL) {
      updateUrl(url);
      return new URL(oDoc.location); // need put after updateUrl for new url effect
    } else {
      if (url !== state.getHref()) {
        return new URL(oDoc.location);
      }
      return state;
    }
  }
}

export default new UrlStore(urlDispatcher);
