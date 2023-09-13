import 'core-js/stable';
import 'regenerator-runtime'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './modules/password';

import Login from './modules/Login';

const login = new Login('.js-form-login');
const register = new Login('.js-form-register');

login.init();
register.init();

