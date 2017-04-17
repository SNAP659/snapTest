function XML_Serializer(){this.contents=[],this.media=[],this.isCollectingMedia=!1}function SnapSerializer(){this.init()}modules.store="2015-April-26",XML_Serializer.prototype.idProperty="serializationID",XML_Serializer.prototype.mediaIdProperty="serializationMediaID",XML_Serializer.prototype.mediaDetectionProperty="isMedia",XML_Serializer.prototype.version=1,XML_Serializer.prototype.serialize=function(t){var e;return this.flush(),this.flushMedia(),e=this.store(t),this.flush(),e},XML_Serializer.prototype.store=function(t,e){return isNil(t)||!t.toXML?"":this.isCollectingMedia&&t[this.mediaDetectionProperty]?(this.addMedia(t,e),this.format('<ref mediaID="@"></ref>',t[this.mediaIdProperty])):t[this.idProperty]?this.format('<ref id="@"></ref>',t[this.idProperty]):(this.add(t),t.toXML(this,e).replace("~",this.format('id="@"',t[this.idProperty])))},XML_Serializer.prototype.mediaXML=function(){var t="<media>",e=this;return this.media.forEach(function(o){var r=o.toXML(e).replace("~",e.format('mediaID="@"',o[e.mediaIdProperty]));t+=r}),t+"</media>"},XML_Serializer.prototype.add=function(t){return t[this.idProperty]?-1:(this.contents.push(t),t[this.idProperty]=this.contents.length,this.contents.length)},XML_Serializer.prototype.addMedia=function(t,e){return t[this.mediaIdProperty]?-1:(this.media.push(t),e?t[this.mediaIdProperty]=e+"_"+t.name:t[this.mediaIdProperty]=this.media.length,this.media.length)},XML_Serializer.prototype.at=function(t){return this.contents[t-1]},XML_Serializer.prototype.flush=function(){var t=this;this.contents.forEach(function(e){delete e[t.idProperty]}),this.contents=[]},XML_Serializer.prototype.flushMedia=function(){var t=this;this.media instanceof Array&&this.media.forEach(function(e){delete e[t.mediaIdProperty]}),this.media=[]},XML_Serializer.prototype.escape=XML_Element.prototype.escape,XML_Serializer.prototype.unescape=XML_Element.prototype.unescape,XML_Serializer.prototype.format=function(t){var e,o=this,r=-1,i=arguments;return t.replace(/[@$%]([\d]+)?/g,function(t,a){return a=parseInt(a,10),isNaN(a)?(r+=1,e=i[r+1]):e=i[a+1],"@"===t?o.escape(e):"$"===t?o.escape(e,!0):e})},XML_Serializer.prototype.load=function(t){throw nop(t),new Error("loading should be implemented in heir of XML_Serializer")},XML_Serializer.prototype.parse=function(t){var e=new XML_Element;return e.parseString(t),e};var SnapSerializer;SnapSerializer.prototype=new XML_Serializer,SnapSerializer.prototype.constructor=SnapSerializer,SnapSerializer.uber=XML_Serializer.prototype,SnapSerializer.prototype.app="Codemao beta, http://codemao.cn",SnapSerializer.prototype.thumbnailSize=new Point(236,341),SnapSerializer.prototype.watcherLabels={xPosition:"x position",yPosition:"y position",direction:"direction",getScale:"size",getTempo:"tempo",getLastAnswer:"answer",getLastMessage:"message",getTimer:"timer",getCostumeIdx:"costume #",reportMouseX:"mouse x",reportMouseY:"mouse y",reportThreadCount:"processes"},SnapSerializer.prototype.init=function(){this.project={},this.objects={},this.mediaDict={}},XML_Serializer.prototype.mediaXML=function(t){var e='<media name="'+(t||"untitled")+'" app="'+this.app+'" version="'+this.version+'">',o=this;return this.media.forEach(function(t){var r=t.toXML(o).replace("~",o.format('mediaID="@"',t[o.mediaIdProperty]));e+=r}),e+"</media>"},SnapSerializer.prototype.load=function(t,e){return this.loadProjectModel(this.parse(t),e)},SnapSerializer.prototype.loadProjectModel=function(t,e){var o=t.attributes.app;o?o.split(" ")[0]:null;return this.rawLoadProjectModel(t)},SnapSerializer.prototype.rawLoadProjectModel=function(t){var e,o,r=this,i={sprites:{}};if(this.project=i,e={project:t},+t.attributes.version>this.version)throw"Project uses newer version of Serializer";if(this.objects={},i.name=e.project.attributes.name,!i.name){for(o=1;Object.prototype.hasOwnProperty.call(localStorage,"-snap-project-Untitled "+o);)o+=1;i.name=""}return e.notes=e.project.childNamed("notes"),e.notes&&(i.notes=e.notes.contents),e.globalVariables=e.project.childNamed("variables"),i.globalVariables=new VariableFrame,e.stage=e.project.require("stage"),StageMorph.prototype.frameRate=0,i.stage=new StageMorph(i.globalVariables),Object.prototype.hasOwnProperty.call(e.stage.attributes,"id")&&(this.objects[e.stage.attributes.id]=i.stage),e.stage.attributes.name&&(i.stage.name=e.stage.attributes.name),"true"===e.stage.attributes.scheduled&&(i.stage.fps=30,StageMorph.prototype.frameRate=30),e.pentrails=e.stage.childNamed("pentrails"),e.pentrails&&(i.pentrails=new Image,i.pentrails.onload=function(){var t=i.stage.trailsCanvas.getContext("2d");t.drawImage(i.pentrails,0,0),i.stage.changed()},i.pentrails.crossOrigin="Anonymous",i.pentrails.src=e.pentrails.contents),i.stage.setTempo(e.stage.attributes.tempo),StageMorph.prototype.dimensions=new Point(310,450),e.stage.attributes.width&&(StageMorph.prototype.dimensions.x=Math.max(+e.stage.attributes.width,311)),e.stage.attributes.height&&(StageMorph.prototype.dimensions.y=Math.max(+e.stage.attributes.height,450)),i.stage.setExtent(StageMorph.prototype.dimensions),SpriteMorph.prototype.useFlatLineEnds="flat"===e.stage.attributes.lines,i.stage.isThreadSafe="true"===e.stage.attributes.threadsafe,StageMorph.prototype.enableCodeMapping="true"===e.stage.attributes.codify,e.hiddenPrimitives=e.project.childNamed("hidden"),e.hiddenPrimitives&&e.hiddenPrimitives.contents.split(" ").forEach(function(t){t&&(StageMorph.prototype.hiddenPrimitives[t]=!0)}),e.codeHeaders=e.project.childNamed("headers"),e.codeHeaders&&e.codeHeaders.children.forEach(function(t){StageMorph.prototype.codeHeaders[t.tag]=t.contents}),e.codeMappings=e.project.childNamed("code"),e.codeMappings&&e.codeMappings.children.forEach(function(t){StageMorph.prototype.codeMappings[t.tag]=t.contents}),e.globalBlocks=e.project.childNamed("blocks"),e.globalBlocks&&(this.loadCustomBlocks(i.stage,e.globalBlocks,!0),this.populateCustomBlocks(i.stage,e.globalBlocks,!0)),this.loadObject(i.stage,e.stage),e.sprites=e.stage.require("sprites"),i.sprites[i.stage.name]=i.stage,e.sprites.childrenNamed("sprite").forEach(function(t){r.loadValue(t)}),r.project.stage.children.forEach(function(t){var e;t.nestingInfo&&(e=r.project.sprites[t.nestingInfo.anchor],e&&e.attachPart(t),t.rotatesWithAnchor="true"===t.nestingInfo.synch)}),r.project.stage.children.forEach(function(t){t.nestingInfo&&(t.nestingScale=+(t.nestingInfo.scale||t.scale),delete t.nestingInfo)}),e.globalVariables&&this.loadVariables(i.globalVariables,e.globalVariables),this.objects={},e.sprites.childrenNamed("watcher").forEach(function(t){var e,o,a,s,n,l,c;o=r.loadColor(t.attributes.color),a=Object.prototype.hasOwnProperty.call(t.attributes,"scope")?i.sprites[t.attributes.scope]:null,s=Object.prototype.hasOwnProperty.call(t.attributes,"hidden")&&"false"!==t.attributes.hidden,Object.prototype.hasOwnProperty.call(t.attributes,"var")?(c=isNil(a)?i.globalVariables:a.variables,Object.prototype.hasOwnProperty.call(c.vars,t.attributes["var"])&&(e=new WatcherMorph(t.attributes["var"],o,c,t.attributes["var"],s))):e=new WatcherMorph(localize(r.watcherLabels[t.attributes.s]),o,a,t.attributes.s,s),e&&(e.setStyle(t.attributes.style||"normal"),"slider"===e.style&&(e.setSliderMin(t.attributes.min||"1"),e.setSliderMax(t.attributes.max||"100")),e.setPosition(i.stage.topLeft().add(new Point(+t.attributes.x||0,+t.attributes.y||0))),i.stage.add(e),e.onNextStep=function(){this.currentValue=null},e.currentValue instanceof List&&(n=t.attributes.extX,n&&e.cellMorph.contentsMorph.setWidth(+n),l=t.attributes.extY,l&&e.cellMorph.contentsMorph.setHeight(+l),e.cellMorph.contentsMorph.handle.drawNew()))}),this.objects={},i},SnapSerializer.prototype.loadBlocks=function(t,e){var o,r=new StageMorph;if(this.project={stage:r,sprites:{},targetStage:e},o=this.parse(t),+o.attributes.version>this.version)throw"Module uses newer version of Serializer";return this.loadCustomBlocks(r,o,!0),this.populateCustomBlocks(r,o,!0),this.objects={},r.globalBlocks.forEach(function(t){t.receiver=null}),this.objects={},this.project={},this.mediaDict={},r.globalBlocks},SnapSerializer.prototype.loadSprites=function(t,e){var o,r,i=this;if(r=this.project={globalVariables:e.globalVariables,stage:e.stage,sprites:{}},r.sprites[r.stage.name]=r.stage,o=this.parse(t),+o.attributes.version>this.version)throw"Module uses newer version of Serializer";o.childrenNamed("sprite").forEach(function(t){var o=new SpriteMorph(r.globalVariables);t.attributes.id&&(i.objects[t.attributes.id]=o),t.attributes.name&&(o.name=t.attributes.name,r.sprites[t.attributes.name]=o),t.attributes.color&&(o.color=i.loadColor(t.attributes.color)),t.attributes.pen&&(o.penPoint=t.attributes.pen),r.stage.add(o),e.sprites.add(o),o.scale=parseFloat(t.attributes.scale||"1"),o.rotationStyle=parseFloat(t.attributes.rotation||"1"),o.isDraggable="false"!==t.attributes.draggable,o.isVisible="true"!==t.attributes.hidden,o.heading=parseFloat(t.attributes.heading)||0,o.drawNew(),o.gotoXY(+t.attributes.x||0,+t.attributes.y||0),i.loadObject(o,t)}),r.stage.children.forEach(function(t){var e;t.nestingInfo&&(e=r.sprites[t.nestingInfo.anchor],e&&e.attachPart(t),t.rotatesWithAnchor="true"===t.nestingInfo.synch)}),r.stage.children.forEach(function(t){t.nestingInfo&&(t.nestingScale=+(t.nestingInfo.scale||t.scale),delete t.nestingInfo)}),this.objects={},this.project={},this.mediaDict={},playermode||e.createCorral(),e.fixLayout()},SnapSerializer.prototype.loadMedia=function(t){return this.loadMediaModel(this.parse(t))},SnapSerializer.prototype.loadMediaModel=function(t){var e=this,o=t;if(this.mediaDict={},+o.attributes.version>this.version)throw"Module uses newer version of Serializer";return o.children.forEach(function(t){e.loadValue(t)}),this.mediaDict},SnapSerializer.prototype.loadObject=function(t,e){var o=e.require("blocks");this.loadNestingInfo(t,e),this.loadCostumes(t,e),this.loadSounds(t,e),this.loadCustomBlocks(t,o),this.populateCustomBlocks(t,o),this.loadVariables(t.variables,e.require("variables")),this.loadScripts(t.scripts,e.require("scripts"))},SnapSerializer.prototype.loadNestingInfo=function(t,e){var o=e.childNamed("nest");o&&(t.nestingInfo=o.attributes)},SnapSerializer.prototype.loadCostumes=function(t,e){var o,r=e.childNamed("costumes");r&&(t.costumes=this.loadValue(r.require("list"))),Object.prototype.hasOwnProperty.call(e.attributes,"costume")&&(o=t.costumes.asArray()[e.attributes.costume-1],o&&(o.loaded?t.wearCostume(o):o.loaded=function(){t.wearCostume(o),this.loaded=!0}))},SnapSerializer.prototype.loadSounds=function(t,e){var o=e.childNamed("sounds");o&&(t.sounds=this.loadValue(o.require("list")))},SnapSerializer.prototype.loadVariables=function(t,e){var o=this;e.children.forEach(function(e){var r;"variable"===e.tag&&(r=e.children[0],t.vars[e.attributes.name]=new Variable(r?o.loadValue(r):0))})},SnapSerializer.prototype.loadCustomBlocks=function(t,e,o){var r=this;e.children.forEach(function(e){var i,a,s,n,l,c,p;"block-definition"===e.tag&&(i=new CustomBlockDefinition(e.attributes.s||"",t),i.category=e.attributes.category||"other",i.type=e.attributes.type||"command",i.isGlobal=o===!0,i.isGlobal?t.globalBlocks.push(i):t.customBlocks.push(i),a=i.parseSpec(i.spec).filter(function(t){return"%"===t.charAt(0)&&t.length>1}).map(function(t){return t.substr(1)}),i.names=a,s=e.childNamed("inputs"),s&&(p=-1,s.children.forEach(function(t){var e=t.childNamed("options");"input"===t.tag&&(p+=1,i.declarations[a[p]]=[t.attributes.type,t.contents,e?e.contents:void 0,"true"===t.attributes.readonly])})),n=e.childNamed("header"),n&&(i.codeHeader=n.contents),l=e.childNamed("code"),l&&(i.codeMapping=l.contents),c=e.childNamed("comment"),c&&(i.comment=r.loadComment(c)))})},SnapSerializer.prototype.populateCustomBlocks=function(t,e,o){var r=this;e.children.forEach(function(e,i){var a,s,n;"block-definition"===e.tag&&(a=o?t.globalBlocks[i]:t.customBlocks[i],s=e.childNamed("script"),s&&(a.body=new Context(null,s?r.loadScript(s):null,null,t),a.body.inputs=a.names.slice(0)),n=e.childNamed("scripts"),n&&(a.scripts=r.loadScriptsArray(n)),delete a.names)})},SnapSerializer.prototype.loadScripts=function(t,e){var o=this,r=SyntaxElementMorph.prototype.scale;t.cachedTexture=IDE_Morph.prototype.scriptsPaneTexture,e.children.forEach(function(e){var i;if("script"===e.tag){if(i=o.loadScript(e),!i)return;i.setPosition(new Point((+e.attributes.x||0)*r,(+e.attributes.y||0)*r).add(t.topLeft())),t.add(i),i.fixBlockColor(null,!0),i.allComments().forEach(function(t){t.align(i)})}else if("comment"===e.tag){if(i=o.loadComment(e),!i)return;i.setPosition(new Point((+e.attributes.x||0)*r,(+e.attributes.y||0)*r).add(t.topLeft())),t.add(i)}})},SnapSerializer.prototype.loadScriptsArray=function(t){var e=this,o=SyntaxElementMorph.prototype.scale,r=[];return t.children.forEach(function(t){var i;if("script"===t.tag){if(i=e.loadScript(t),!i)return;i.setPosition(new Point((+t.attributes.x||0)*o,(+t.attributes.y||0)*o)),r.push(i),i.fixBlockColor(null,!0)}else if("comment"===t.tag){if(i=e.loadComment(t),!i)return;i.setPosition(new Point((+t.attributes.x||0)*o,(+t.attributes.y||0)*o)),r.push(i)}}),r},SnapSerializer.prototype.loadScript=function(t){var e,o,r,i=t.attributes.h;return myself=this,t.children.forEach(function(t){r=myself.loadBlock(t,null,i),r&&(o?o.nextBlock(r):e=r,o=r)}),e},SnapSerializer.prototype.loadComment=function(t){var e=new CommentMorph(t.contents),o=SyntaxElementMorph.prototype.scale;return e.isCollapsed="true"===t.attributes.collapsed,e.setTextWidth(+t.attributes.w*o),e},SnapSerializer.prototype.loadBlock=function(t,e,o){var r,i,a,s,n,l;if("block"===t.tag){if(Object.prototype.hasOwnProperty.call(t.attributes,"var"))return SpriteMorph.prototype.variableBlock(t.attributes["var"]);r=SpriteMorph.prototype.blockForSelector(t.attributes.s)}else if("custom-block"===t.tag){if(s=t.attributes.scope?!1:!0,l=s?this.project.stage:this.project.sprites[t.attributes.scope],n=t.childNamed("receiver"),n&&n.children[0]&&(l=this.loadValue(t.childNamed("receiver").children[0])),!l){if(s)return this.obsoleteBlock(e);l=this.project.stage}if(s?(i=detect(l.globalBlocks,function(e){return e.blockSpec()===t.attributes.s}),!i&&this.project.targetStage&&(i=detect(this.project.targetStage.globalBlocks,function(e){return e.blockSpec()===t.attributes.s}))):i=detect(l.customBlocks,function(e){return e.blockSpec()===t.attributes.s}),!i)return this.obsoleteBlock(e);r="command"===i.type?new CustomCommandBlockMorph(i,!1):new CustomReporterBlockMorph(i,"predicate"===i.type,!1)}return null===r&&(r=this.obsoleteBlock(e)),o&&(r.scriptHide(),r.hide()),r.isDraggable=!0,a=r.inputs(),t.children.forEach(function(t,e){"comment"===t.tag?(r.comment=this.loadComment(t),r.comment.block=r):"receiver"===t.tag?nop():this.loadInput(t,a[e],r)},this),r.cachedInputs=null,r},SnapSerializer.prototype.obsoleteBlock=function(t){var e=t?new ReporterBlockMorph:new CommandBlockMorph;return e.selector="nop",e.color=new Color(200,0,20),e.setSpec("Obsolete!"),e.isDraggable=!0,e},SnapSerializer.prototype.loadInput=function(t,e,o){var r,i,a=this;if("script"===t.tag)r=this.loadScript(t),r&&(e.add(r),e.fixLayout());else if("autolambda"===t.tag&&t.children[0])r=this.loadBlock(t.children[0],!0),r&&(e.silentReplaceInput(e.children[0],r),e.fixLayout());else if("list"===t.tag){for(;e.inputs().length>0;)e.removeInput();t.children.forEach(function(t){e.addInput(),a.loadInput(t,e.children[e.children.length-2],e)}),e.fixLayout()}else"block"===t.tag||"custom-block"===t.tag?o.silentReplaceInput(e,this.loadBlock(t,!0)):"color"===t.tag?e.setColor(this.loadColor(t.contents)):(i=this.loadValue(t),!isNil(i)&&e.setContents&&e.setContents(this.loadValue(t)))},SnapSerializer.prototype.loadValue=function(t){function e(){Object.prototype.hasOwnProperty.call(t.attributes,"id")&&(p.objects[t.attributes.id]=o),Object.prototype.hasOwnProperty.call(t.attributes,"mediaID")&&(p.mediaDict[t.attributes.mediaID]=o)}var o,r,i,a,s,n,l,c,p=this;switch(t.tag){case"ref":if(Object.prototype.hasOwnProperty.call(t.attributes,"id"))return this.objects[t.attributes.id];if(Object.prototype.hasOwnProperty.call(t.attributes,"mediaID"))return this.mediaDict[t.attributes.mediaID];throw new Error("expecting a reference id");case"l":return c=t.childNamed("option"),c?[c.contents]:t.contents;case"bool":return"true"===t.contents;case"list":return t.attributes.hasOwnProperty("linked")?(r=t.childrenNamed("item"),0===r.length?(o=new List,e(),o):(r.forEach(function(t){var r=t.children[0];void 0===o?(o=new List,e()):o=o.rest=new List,o.isLinked=!0,r?o.first=p.loadValue(r):o.first=0}),o)):(o=new List,e(),o.contents=t.childrenNamed("item").map(function(t){var e=t.children[0];return e?p.loadValue(e):0}),o);case"sprite":return o=new SpriteMorph(p.project.globalVariables),t.attributes.id&&(p.objects[t.attributes.id]=o),t.attributes.name&&(o.name=t.attributes.name,p.project.sprites[t.attributes.name]=o),t.attributes.idx&&(o.idx=+t.attributes.idx),t.attributes.color&&(o.color=p.loadColor(t.attributes.color)),t.attributes.pen&&(o.penPoint=t.attributes.pen),p.project.stage.add(o),o.scale=parseFloat(t.attributes.scale||"1"),o.rotationStyle=parseFloat(t.attributes.rotation||"1"),o.isDraggable="false"!==t.attributes.draggable,o.isVisible="true"!==t.attributes.hidden,o.heading=parseFloat(t.attributes.heading)||0,o.drawNew(),o.gotoXY(+t.attributes.x||0,+t.attributes.y||0),p.loadObject(o,t),o;case"context":return o=new Context(null),e(),i=t.childNamed("script"),i?o.expression=this.loadScript(i):(i=t.childNamed("block")||t.childNamed("custom-block"),i?o.expression=this.loadBlock(i):(i=t.childNamed("l"),i&&(o.expression=new InputSlotMorph(i.contents)))),i=t.childNamed("receiver"),i&&(i=i.childNamed("ref")||i.childNamed("sprite"),i&&(o.receiver=this.loadValue(i))),i=t.childNamed("inputs"),i&&i.children.forEach(function(t){"input"===t.tag&&o.inputs.push(t.contents)}),i=t.childNamed("variables"),i&&this.loadVariables(o.variables,i),i=t.childNamed("context"),i&&(o.outerContext=this.loadValue(i)),o.outerContext&&o.receiver&&!o.outerContext.variables.parentFrame&&(o.outerContext.variables.parentFrame=o.receiver.variables),o;case"costume":return a=new Point,Object.prototype.hasOwnProperty.call(t.attributes,"center-x")&&(a.x=parseFloat(t.attributes["center-x"])),Object.prototype.hasOwnProperty.call(t.attributes,"center-y")&&(a.y=parseFloat(t.attributes["center-y"])),Object.prototype.hasOwnProperty.call(t.attributes,"name")&&(n=t.attributes.name),Object.prototype.hasOwnProperty.call(t.attributes,"image")&&(s=new Image,0!==t.attributes.image.indexOf("data:image/svg+xml")||MorphicPreferences.rasterizeSVGs?(o=new Costume(null,n,a),o.src=t.attributes.image,s.onload=function(){var t=newCanvas(new Point(s.width,s.height)),e=t.getContext("2d");e.drawImage(s,0,0),o.contents=t,o.version=+new Date,"function"==typeof o.loaded?o.loaded():o.loaded=!0}):(o=new SVG_Costume(null,n,a),s.onload=function(){o.contents=s,o.version=+new Date,"function"==typeof o.loaded?o.loaded():o.loaded=!0}),s.crossOrigin="Anonymous",s.src=t.attributes.image),e(),o;case"sound":return l=new Audio,l.src=t.attributes.sound,o=new Sound(l,t.attributes.name),Object.prototype.hasOwnProperty.call(t.attributes,"mediaID")&&(p.mediaDict[t.attributes.mediaID]=o),o}},SnapSerializer.prototype.loadColor=function(t){var e=(t||"").split(",");return new Color(parseFloat(e[0]),parseFloat(e[1]),parseFloat(e[2]),parseFloat(e[3]))},SnapSerializer.prototype.openProject=function(t,e){var o,r=e.stage,i=[];t&&t.stage&&(e.projectName=t.name,e.projectNameVM&&(e.projectNameVM.projectName=t.name),e.isProjectNew&&codemao.preloadConfig.lessonName&&e.setProjectName(codemao.preloadConfig.lessonName),e.projectNotes=t.notes||"",e.globalVariables&&(e.globalVariables=t.globalVariables),r&&r.destroy(),e.add(t.stage),e.stage=t.stage,i=e.stage.children.filter(function(t){return t instanceof SpriteMorph}),i.sort(function(t,e){return t.idx-e.idx}),e.sprites=new List(i),o=i[0]||t.stage,sizeOf(this.mediaDict)>0?(e.hasChangedMedia=!1,this.mediaDict={}):e.hasChangedMedia=!0,t.stage.drawNew(),playermode||(e.createCorral(),e.selectSprite(o)),e.fixLayout(),e.world().keyboardReceiver=t.stage)},Array.prototype.toXML=function(t){return this.reduce(function(e,o){return e+t.store(o)},"")},StageMorph.prototype.toXML=function(t){function e(t){var e="";return Object.keys(StageMorph.prototype[t]).forEach(function(o){e+="<"+o+">"+XML_Element.prototype.escape(StageMorph.prototype[t][o])+"</"+o+">"}),e}console.log(this.isProductThumbnail);var o,r=this.thumbnail(SnapSerializer.prototype.thumbnailSize),i=this.parentThatIsA(IDE_Morph),a=this,s=this.isProductThumbnail?this.trailsCanvas.toDataURL("image/png"):"";if(this.thumbnailIsUploadCdn)try{var n=new CDNUpload(!1);o=r.toDataURL("image/png"),n.getToken(o,function(t){if(!t.src)throw new Error("保存缩略图上传失败！");a.thumbnailUrl=t.src;var e=new CDNUpload(!1);e.getToken(s,function(t){if(!t.src)throw new Error("保存画笔笔触失败！");s=t.src})})}catch(l){return void console.log("项目信息上传失败:"+l)}return this.removeAllClones(),t.format('<project name="@" app="@" version="@"><notes>$</notes><stage name="@" width="@" height="@" costume="@" tempo="@" threadsafe="@" lines="@" codify="@" scheduled="@" ~><pentrails>$</pentrails><costumes>%</costumes><sounds>%</sounds><variables>%</variables><blocks>%</blocks><scripts>%</scripts><sprites>%</sprites></stage><hidden>$</hidden><headers>%</headers><code>%</code><blocks>%</blocks><variables>%</variables></project>',i&&i.projectName?i.projectName:"",t.app,t.version,i&&i.projectNotes?i.projectNotes:"",this.name,StageMorph.prototype.dimensions.x,StageMorph.prototype.dimensions.y,this.getCostumeIdx(),this.getTempo(),this.isThreadSafe,SpriteMorph.prototype.useFlatLineEnds?"flat":"round",this.enableCodeMapping,0!==StageMorph.prototype.frameRate,s,t.store(this.costumes,this.name+"_cst"),t.store(this.sounds,this.name+"_snd"),t.store(this.variables),t.store(this.customBlocks),t.store(this.scripts),t.store(this.children),Object.keys(StageMorph.prototype.hiddenPrimitives).reduce(function(t,e){return t+" "+e},""),e("codeHeaders"),e("codeMappings"),t.store(this.globalBlocks),i&&i.globalVariables?t.store(i.globalVariables):"")},SpriteMorph.prototype.toXML=function(t){var e=this.parentThatIsA(StageMorph),o=e?e.parentThatIsA(IDE_Morph):null,r=o?o.sprites.asArray().indexOf(this)+1:0;return t.format('<sprite name="@" idx="@" x="@" y="@" heading="@" scale="@" rotation="@" draggable="@"% costume="@" color="@,@,@" pen="@" ~>%<costumes>%</costumes><sounds>%</sounds><variables>%</variables><blocks>%</blocks><scripts>%</scripts></sprite>',this.name,r,this.xPosition(),this.yPosition(),this.heading,this.scale,this.rotationStyle,this.isDraggable,this.isVisible?"":' hidden="true"',this.getCostumeIdx(),this.color.r,this.color.g,this.color.b,this.penPoint,this.anchor?'<nest anchor="'+this.anchor.name+'" synch="'+this.rotatesWithAnchor+(this.scale===this.nestingScale?"":'" scale="'+this.nestingScale)+'"/>':"",t.store(this.costumes,this.name+"_cst"),t.store(this.sounds,this.name+"_snd"),t.store(this.variables),this.customBlocks?t.store(this.customBlocks):"",t.store(this.scripts))},Costume.prototype[XML_Serializer.prototype.mediaDetectionProperty]=!0,Costume.prototype.toXML=function(t){return t.format('<costume name="@" center-x="@" center-y="@" image="@" ~/>',this.name,this.rotationCenter.x,this.rotationCenter.y,this instanceof SVG_Costume?this.contents.src:this.src?this.src:this.contents.toDataURL("image/png"))},Sound.prototype[XML_Serializer.prototype.mediaDetectionProperty]=!0,Sound.prototype.toXML=function(t){return t.format('<sound name="@" sound="@" ~/>',this.name,this.toDataURL())},VariableFrame.prototype.toXML=function(t){var e=this;return Object.keys(this.vars).reduce(function(o,r){var i,a=e.vars[r].value;return i=void 0===a||null===a?t.format('<variable name="@"/>',r):t.format('<variable name="@">%</variable>',r,"object"==typeof a?t.store(a):"boolean"==typeof a?t.format("<bool>$</bool>",a):t.format("<l>$</l>",a)),o+i},"")},WatcherMorph.prototype.toXML=function(t){var e=this.target instanceof VariableFrame,o=this.currentValue instanceof List,r=this.readoutColor,i=this.parent?this.topLeft().subtract(this.parent.topLeft()):this.topLeft();return t.format('<watcher% % style="@"% x="@" y="@" color="@,@,@"%%/>',e&&this.target.owner||!e&&this.target?t.format(' scope="@"',e?this.target.owner.name:this.target.name):"",t.format(e?'var="@"':'s="@"',this.getter),this.style,e&&"slider"===this.style?t.format(' min="@" max="@"',this.sliderMorph.start,this.sliderMorph.stop):"",i.x,i.y,r.r,r.g,r.b,o?t.format(' extX="@" extY="@"',this.cellMorph.contentsMorph.width(),this.cellMorph.contentsMorph.height()):"",this.isVisible?"":' hidden="true"')},ScriptsMorph.prototype.toXML=function(t){return this.children.reduce(function(e,o){return o instanceof BlockMorph?e+o.toScriptXML(t,!0):o instanceof CommentMorph&&!o.block?e+o.toXML(t):e},"")},BlockMorph.prototype.toXML=BlockMorph.prototype.toScriptXML=function(t,e){var o,r,i=SyntaxElementMorph.prototype.scale,a=this;o=this.parent?this.topLeft().subtract(this.parent.topLeft()):this.topLeft(),r=e?t.format('<script x="@" y="@">',o.x/i,o.y/i):"<script>";do r+=a.toBlockXML(t),a=a.nextBlock();while(a);return r+="</script>"},BlockMorph.prototype.toBlockXML=function(t){return t.format('<block s="@">%%</block>',this.selector,t.store(this.inputs()),this.comment?this.comment.toXML(t):"")},ReporterBlockMorph.prototype.toXML=function(t){return"reportGetVar"===this.selector?t.format('<block var="@"/>',this.blockSpec):this.toBlockXML(t)},ReporterBlockMorph.prototype.toScriptXML=function(t,e){var o,r=SyntaxElementMorph.prototype.scale;return o=this.parent?this.topLeft().subtract(this.parent.topLeft()):this.topLeft(),e?t.format('<script x="@" y="@">%</script>',o.x/r,o.y/r,this.toXML(t)):t.format("<script>%</script>",this.toXML(t))},CustomCommandBlockMorph.prototype.toBlockXML=function(t){var e=this.definition.isGlobal?void 0:this.definition.receiver.name;return t.format('<custom-block s="@"%>%%%</custom-block>',this.blockSpec,this.definition.isGlobal?"":t.format(' scope="@"',e),t.store(this.inputs()),this.comment?this.comment.toXML(t):"",e&&!this.definition.receiver[t.idProperty]?"<receiver>"+t.store(this.definition.receiver)+"</receiver>":"")},CustomReporterBlockMorph.prototype.toBlockXML=CustomCommandBlockMorph.prototype.toBlockXML,CustomBlockDefinition.prototype.toXML=function(t){function e(e){return e.reduce(function(e,o){return o instanceof BlockMorph?e+o.toScriptXML(t,!0):o instanceof CommentMorph&&!o.block?e+o.toXML(t):e},"")}var o=this;return t.format('<block-definition s="@" type="@" category="@">%<header>@</header><code>@</code><inputs>%</inputs>%%</block-definition>',this.spec,this.type,this.category||"other",this.comment?this.comment.toXML(t):"",this.codeHeader||"",this.codeMapping||"",Object.keys(this.declarations).reduce(function(e,r){return e+t.format('<input type="@"$>$%</input>',o.declarations[r][0],o.declarations[r][3]?' readonly="true"':"",o.declarations[r][1],o.declarations[r][2]?"<options>"+o.declarations[r][2]+"</options>":"")},""),this.body?t.store(this.body.expression):"",this.scripts.length>0?"<scripts>"+e(this.scripts)+"</scripts>":"")},ArgMorph.prototype.toXML=function(){return"<l/>"},InputSlotMorph.prototype.toXML=function(t){return this.constant?t.format("<l><option>$</option></l>",this.constant):t.format("<l>$</l>",this.contents().text)},TemplateSlotMorph.prototype.toXML=function(t){return t.format("<l>$</l>",this.contents())},CommandSlotMorph.prototype.toXML=function(t){var e=this.children[0];return e instanceof BlockMorph?e instanceof ReporterBlockMorph?t.format("<autolambda>%</autolambda>",t.store(e)):t.store(e):"<script></script>"},FunctionSlotMorph.prototype.toXML=CommandSlotMorph.prototype.toXML,MultiArgMorph.prototype.toXML=function(t){return t.format("<list>%</list>",t.store(this.inputs()))},ArgLabelMorph.prototype.toXML=function(t){return t.format("%",t.store(this.inputs()[0]))},ColorSlotMorph.prototype.toXML=function(t){return t.format("<color>$,$,$,$</color>",this.color.r,this.color.g,this.color.b,this.color.a)},List.prototype.toXML=function(t,e){var o,r;if(this.isLinked){o='<list linked="linked" ~>',r=this;do o+=t.format("<item>%</item>",t.store(r.first)),r=r.rest;while(void 0!==r&&null!==r);return o+"</list>"}return t.format("<list ~>%</list>",this.contents.reduce(function(o,r){return o+t.format("<item>%</item>","object"==typeof r?t.store(r,e):"boolean"==typeof r?t.format("<bool>$</bool>",r):t.format("<l>$</l>",r))},""))},Context.prototype.toXML=function(t){return this.isContinuation?"":t.format("<context ~><inputs>%</inputs><variables>%</variables>%<receiver>%</receiver>%</context>",this.inputs.reduce(function(e,o){return e+t.format("<input>$</input>",o)},""),this.variables?t.store(this.variables):"",this.expression?t.store(this.expression):"",this.receiver?t.store(this.receiver):"",this.outerContext?t.store(this.outerContext):"")},CommentMorph.prototype.toXML=function(t){var e,o=SyntaxElementMorph.prototype.scale;return this.block?t.format('<comment w="@" collapsed="@">%</comment>',this.textWidth()/o,this.isCollapsed,t.escape(this.text())):(e=this.parent?this.topLeft().subtract(this.parent.topLeft()):this.topLeft(),t.format('<comment x="@" y="@" w="@" collapsed="@">%</comment>',e.x/o,e.y/o,this.textWidth()/o,this.isCollapsed,t.escape(this.text())))};