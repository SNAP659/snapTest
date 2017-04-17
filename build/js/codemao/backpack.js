var Backpack;!function(t){"use strict";function e(){c=new Vue({el:"#backpack-window",data:{isShowBackpackWindow:"none",items:[],aiItems:[]},computed:{isLesson:function(){return!!this.aiItems.length}},methods:{addItem:function(t){var e=this.items[t];world.hand.readTextt(e.url,e.name)},addAiItem:function(t){var e=this.aiItems[t];world.hand.readTextt(e.url,e.name)},deleteItem:function(e){var a=this.items[e].id;t.data.deleteItem(a,function(){c.items.splice(e,1)})},closeBackpackWindow:function(){this.isShowBackpackWindow="none"}}}),t.vm=c}function a(){c.isShowBackpackWindow="block",t.fetchData(),t.fetchAiData()}function n(){t.data.fetchData(function(t){c.items=o(t)})}function i(e){t.data.addItem(e,function(){t.fetchData()})}function o(t){var e=[];return t&&t.forEach(function(t){e.push({id:t.id,url:t.fodder_url,name:t.name,authorName:"来自:"+t.founder_name,thumbnail:t.preview})}),e}var c;t.init=e,t.open=a,t.fetchData=n,t.fetchAiData=function(){t.data.fetchAiData(function(t){c.aiItems=o(t)})},t.addItem=i;var s;!function(t){function e(t){var e=new XMLHttpRequest;e.open("get",codemao.apiServer+"/backpack/list"),e.onload=function(){200===e.status&&t(JSON.parse(e.responseText).data)},e.withCredentials=!0,e.send(null)}function a(t){var e=new XMLHttpRequest;e.open("get",codemao.apiServer+"/lesson/scripts"),e.onload=function(){200===e.status&&t(JSON.parse(e.responseText).data)},e.withCredentials=!0,e.send(null)}function n(t,e){var a={fodder_url:t.url,preview:t.thumbnail,name:t.name},n=new XMLHttpRequest;n.open("post",codemao.apiServer+"/backpack"),n.onload=function(){200===n.status&&e()},n.setRequestHeader("Content-Type","application/json"),n.withCredentials=!0,n.send(JSON.stringify(a))}function i(t,e){var a=new XMLHttpRequest;a.open("delete",codemao.apiServer+"/backpack/"+t),a.onload=function(){200===a.status&&e()},a.withCredentials=!0,a.send()}t.fetchData=e,t.fetchAiData=a,t.addItem=n,t.deleteItem=i}(s||(s={})),t.data=s}(Backpack||(Backpack={}));