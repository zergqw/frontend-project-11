import i18next from 'i18next';
import 'bootstrap'
import * as yup from 'yup'

import initView from './watchers.js';
import resources from './locales/index.js';
import locale from './locales/locale.js';

export default () => {
    const elements = {
        form: document.querySelector('form'),
        input: document.querySelector('#url-input'),
        button: document.querySelector('button[type="submit"]'),
        feedbackContainer: document.querySelector('.feedback'),
        postsContainer: document.querySelector('.posts'),
        feedsContainer: document.querySelector('.feeds'),
        modal: {
          title: document.querySelector('.modal-title'),
          body: document.querySelector('.modal-body'),
          footer: document.querySelector('.modal-footer'),
        },
        spanSpinner: document.createElement('span'),
        spanLoading: document.createElement('span'),
      };
    
      const initialState = {
        rssForm: {
          state: 'filling',
          error: null,
          valid: true,
        },
        feeds: [],
        posts: [],
        uiState: {
          visitedPosts: new Set(),
          modalId: null,
        },
      };
    
      const i18n = i18next.createInstance();
      return i18n.init({
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
}