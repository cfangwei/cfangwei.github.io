'use strict';

require('./main.scss');

module.exports = {
    template: require('./template.html'),
    data: function(){
        return {
            github: 'https://github.com/AbyChan'
        };
    },
    ready: function(){
        console.log(this.data);
    },
    methods: {
        
    }
};
