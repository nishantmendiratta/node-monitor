AUI.add("aui-tree-data",function(O){var H=O.Lang,M=H.isArray,K=H.isObject,N=H.isString,D=H.isUndefined,X="boundingBox",F="children",P="container",R=".",I="id",V="index",U="nextSibling",Z="node",E="ownerTree",G="parentNode",S="prevSibling",Q="previousSibling",T="tree",C="tree-data",J=function(A){return(A instanceof O.TreeNode);},W=O.ClassNameManager.getClassName,B=W(T,Z);var Y=O.Component.create({NAME:C,ATTRS:{container:{setter:O.one},children:{value:[],validator:M,setter:function(A){return this._setChildren(A);}},index:{value:{}}},prototype:{UI_EVENTS:{},initializer:function(){var A=this;A.publish("move");A.publish("collapseAll",{defaultFn:A._collapseAll});A.publish("expandAll",{defaultFn:A._expandAll});A.publish("append",{defaultFn:A._appendChild});A.publish("remove",{defaultFn:A._removeChild});Y.superclass.initializer.apply(this,arguments);},getNodeById:function(L){var A=this;return A.get(V)[L];},isRegistered:function(L){var A=this;return !!(A.get(V)[L.get(I)]);},updateReferences:function(b,c,f){var g=this;var e=b.get(G);var A=b.get(E);var d=e&&(e!=c);if(e){if(d){var L=e.get(F);O.Array.removeItem(L,g);e.set(F,L);}e.unregisterNode(b);}if(A){A.unregisterNode(b);}b.set(G,c);b.set(E,f);if(c){c.registerNode(b);}if(f){f.registerNode(b);}if(A!=f){b.eachChildren(function(h){g.updateReferences(h,h.get(G),f);});}if(d){var a=g.getEventOutputMap(b);a.tree.oldParent=e;a.tree.oldOwnerTree=A;g.bubbleEvent("move",a);}},refreshIndex:function(){var A=this;A.updateIndex({});A.eachChildren(function(L){A.registerNode(L);},true);},registerNode:function(b){var A=this;var a=b.get(I);var L=A.get(V);if(a){L[a]=b;}A.updateIndex(L);},updateIndex:function(L){var A=this;if(L){A.set(V,L);}},unregisterNode:function(a){var A=this;var L=A.get(V);delete L[a.get(I)];A.updateIndex(L);},collapseAll:function(){var A=this;var L=A.getEventOutputMap(A);A.fire("collapseAll",L);},_collapseAll:function(L){var A=this;A.eachChildren(function(a){a.collapse();},true);},expandAll:function(){var A=this;var L=A.getEventOutputMap(A);A.fire("expandAll",L);},_expandAll:function(L){var A=this;A.eachChildren(function(a){a.expand();},true);},selectAll:function(){var A=this;A.eachChildren(function(L){L.select();},true);},unselectAll:function(){var A=this;A.eachChildren(function(L){L.unselect();},true);},eachChildren:function(b,L){var A=this;var a=A.getChildren(L);O.Array.each(a,function(c){if(c){b.apply(A,arguments);}});},eachParent:function(a){var L=this;var A=L.get(G);while(A){if(A){a.apply(L,[A]);}A=A.get(G);}},bubbleEvent:function(c,b,d,a){var L=this;L.fire(c,b);if(!d){var A=L.get(G);b=b||{};if(D(a)){a=true;}b.stopActionPropagation=a;while(A){A.fire(c,b);A=A.get(G);}}},createNode:function(L){var A=this;var a=L.type;if(N(a)&&O.TreeNode.nodeTypes){a=O.TreeNode.nodeTypes[a];}if(!a){a=O.TreeNode;}return new a(L);},appendChild:function(b,a){var A=this;var L=A.getEventOutputMap(b);A.bubbleEvent("append",L,a);},_appendChild:function(f){if(f.stopActionPropagation){return false;}var A=this;var e=f.tree.node;var L=A.get(E);var c=A.get(F);A.updateReferences(e,A,L);var d=c.push(e);A.set(F,c);var b=d-2;var a=A.item(b);e.set(U,null);e.set(S,a);A.get(P).append(e.get(X));e.render();},item:function(L){var A=this;return A.get(F)[L];},indexOf:function(L){var A=this;return O.Array.indexOf(A.get(F),L);},hasChildNodes:function(){return(this.get(F).length>0);},getChildren:function(L){var A=this;var b=[];var a=A.get(F);b=b.concat(a);if(L){A.eachChildren(function(c){b=b.concat(c.getChildren(L));});}return b;},getEventOutputMap:function(L){var A=this;return{tree:{instance:A,node:L||A}};},removeChild:function(a){var A=this;var L=A.getEventOutputMap(a);A.bubbleEvent("remove",L);},_removeChild:function(c){if(c.stopActionPropagation){return false;}var A=this;var b=c.tree.node;var L=A.get(E);if(A.isRegistered(b)){b.set(G,null);A.unregisterNode(b);b.set(E,null);if(L){L.unregisterNode(b);}b.get(X).remove();var a=A.get(F);O.Array.removeItem(a,b);A.set(F,a);}},empty:function(){var A=this;A.eachChildren(function(a){var L=a.get(G);if(L){L.removeChild(a);}});},insert:function(f,c,d){var i=this;c=c||this;if(c==f){return false;}var A=c.get(G);if(f&&A){var e=f.get(X);var b=c.get(X);var h=c.get(E);if(d=="before"){b.placeBefore(e);}else{if(d=="after"){b.placeAfter(e);}}var L=[];var g=A.get(X).all("> ul > li");g.each(function(j){L.push(O.Widget.getByNode(j));});f.set(U,O.Widget.getByNode(e.get(U)));f.set(S,O.Widget.getByNode(e.get(Q)));c.updateReferences(f,A,h);A.set(F,L);}f.render();var a=c.getEventOutputMap(f);a.tree.refTreeNode=c;c.bubbleEvent("insert",a);},insertAfter:function(L,A){A.insert(L,A,"after");},insertBefore:function(L,A){A.insert(L,A,"before");},getNodeByChild:function(a){var A=this;var L=a.ancestor(R+B);if(L){return A.getNodeById(L.attr(I));}return null;},_setChildren:function(L){var A=this;var a=[];O.Array.each(L,function(b){if(b){if(!J(b)&&K(b)){b=A.createNode(b);}if(!J(A)){b.set(E,A);}b.render();if(O.Array.indexOf(a,b)==-1){a.push(b);}}});return a;}}});O.TreeData=Y;},"1.0.1",{requires:["aui-base"],skinnable:false});