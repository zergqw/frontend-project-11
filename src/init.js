import i18next from 'i18next';
import 'bootstrap'
import * as yup from 'yup'

import axios from 'axios';
import _ from 'lodash';

import initView from './watchers.js';
import resources from './locales/index.js';
import locale from './locales/locale.js';
import parse from './rss.js';

export default () => {
    const elements = {
        form: document.querySelector('.fss-form'),
        input: document.querySelector('.fss-form input'),
        feedback: document.querySelector('.feedback'),
        submit: document.querySelector('.fss-form button[type="submit"]'),
        postBox: document.querySelector('.posts'),
        feedsBox: document.querySelector('.feeds'),
        modal: {
          title: document.querySelector('.modal-title'),
          body: document.querySelector('.modal-body'),
          footer: document.querySelector('.modal-footer'),
        },
        spanSpinner: document.createElement('span'),
        spanLoading: document.createElement('span'),
      };
    const getLoadingProcessErrorType = (e) => {
        if (e.isParsingError) {
            return 'noRss'
        }
        if (e.isAxionsError) {
            return 'network'
        }
        return 'unknow'
    }
    const initialState = {
        rssForm: {
          state: 'filling',
          error: null,
          valid: true,
        },
        feeds: [],
        posts: [],
        loadingProcess: {
          status: 'idle',
          error: null,
        },
      };
    const addProxy = (url) => {
        const urlWithProxy = new URL('/get', 'https://allorigins.hexlet.app')
        urlWithProxy.searchParams.set('url', url)
        return urlWithProxy.toString()

    }
    const loadRss = (watchedState, url) => {
        watchedState.loadingProcess.status = 'loading';
        const urlWithProxy = addProxy(url);
        return axios.get(urlWithProxy)
            .then((response) => {
                    const data = parse(response.data.contents);
                    const feed = {
                        url, id: _.uniqueId(), title: data.title, description: data.description,
                    };
                    const posts = data.items.map((item) => ({ ...item, channelId: feed.id, id: _.uniqueId() }))
                    watchedState.posts.unshift(...posts);
                    watchedState.feeds.unshift(feed);

                    watchedState.loadingProcess.error = null;
                    watchedState.loadingProcess.status = 'idle';
                    watchedState.form = {
                        ...watchedState.form,
                        status: 'filling',
                        error: null,
                    };
        })
        .catch((e) => {
            watchedState.loadingProcess.error = getLoadingProcessErrorType(e);
            watchedState.loadingProcess.status = 'failed';
        });
    }
      const i18n = i18next.createInstance();
      const promise = i18n.init({
        lng: 'ru',
        resources,
      })
      .then(() => {
        yup.setLocale(locale);
        const validateUrl = (url, feeds) => {
            const feedUrl = feeds.map((feed) => feed.url)
            const schema = yup.string().url().required().notOneOf(feedUrl)
            return schema.validate(url)
            .then(() => null)
            .catch((error) => error.message )
        }
    
        const watchedState = initView(initialState, elements, i18n);

        elements.form.addEventListener('submit', (event) => {

            event.preventDefault()
            const data = new FormData(event.target)
            const url = data.get('url')

            validateUrl(url, watchedState.feeds)
                .then((error) => {
                    if (!error) {
                        watchedState.form = {
                            ...watchedState.form,
                            error: null,
                            valid: true,
                        }
                        loadRss(watchedState, url)
                    } else {
                        watchedState.form = {
                            ...watchedState.form,
                            error: error.key,
                            valid: false,
                        }
                    }   
                }
            )
        })
    })
    return promise
}