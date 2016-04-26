var $ = require('jquery');

module.exports = {
    template: require('./index.html'),
    props: ['githubId', 'name', 'state', 'time', 'chineseName'],
    data: function(){
        return {
            show: 'block'
        };
    },
    ready: function(){
        
    }
};
