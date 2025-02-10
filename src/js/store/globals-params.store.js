export const CLIENT_STORAGE = {
  platform: '_document_platform_active',
  notifyEmail: '_document_notify_email',
  consent: '_document_consent_status',
  careers: '_document_applying_jobs_list'
};

const MAIL_REGULAR = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;


export const REGULAR_EXPRESSION = {
  name: '/^[a-zA-Z]+$/',
  phone: /^\+\d{1,3} \d{3} \d{3} \d{4}$/, ///^\+1\s\d{3}\s\d{3}\s\d{4}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/, ///^(?!\d+$)\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/,
  toHTMLPattern: function(key) {
    const rgx = this[key].toString();
    return rgx.replace(/^\/|\/$/g, '');
  }
};

export const REQUEST_PATH = {
  auth: '',
  get: '',
  edit: '',
  call: '',
  jobs: ''
};
