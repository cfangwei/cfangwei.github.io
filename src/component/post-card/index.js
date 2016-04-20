'use strict';

require('./main.scss');

// TODO js 适应屏幕放大

let $ = require('jquery');

const messageurl = 'http://abysky.com:8088/message';

module.exports = {
    template: require('./template.html'),
    data: function(){
        return {
            height: '500px',
            width: '800px'
        };
    },
    ready: function(){
        
    },
    methods: {
        sendMessage: function() {
            $.post(messageurl, {
                name: this.$data.name,
                message: this.$data.message
            }, function(data){
                if( data.status === 0 ){
                    alert(data.message);
                } else {
                    alert('success');
                }
            });
        }
    }
};
