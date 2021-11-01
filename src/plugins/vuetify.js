import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            dark: {
                background: '#000000',
                primary: '',
                secondary: '#3f51b5',
                accent: '',
            },
            light: {
                background: '#fff',
                secondary: '#3f51b5'
            }
        }
    }
});
