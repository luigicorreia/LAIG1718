//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(m,key,value) {
      vars[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return vars;
}

serialInclude(['../lib/CGF.js', 'XMLscene.js', 'MySceneGraph.js',
			 'MyGraphNode.js', 'MyGraphLeaf.js', 'MyInterface.js','MyTriangle.js',
       'MyRectangle.js','MySphere.js','MyCylinderWithTopAndBottom.js','MyCylinder.js','MyCircle.js','MyPatch.js',
        'MyAnimation.js', 'MyLinearAnimation.js','MyCircularAnimation.js','MyBezierAnimation.js','MyComboAnimation.js', 'MyPiece.js', 'MyBoard.js', 'MyObj.js', 'webgl-obj-loader.js',

main=function()
{
	// Standard application, scene and interface setup
    var app = new CGFapplication(document.body);
    var myInterface = new MyInterface();
    var myScene = new XMLscene(myInterface);
    
    app.init();
    
    app.setScene(myScene);
    app.setInterface(myInterface);

    myInterface.setActiveCamera(myScene.camera);
    /*
    if(myScene.getScene() == "dameo.xml"){
        var filename=getUrlVars()['file'] || "dameo.xml";
    
        var myGraph = new MySceneGraph(filename, myScene);

        app.run();
    }
    else if(myScene.getScene() == "dameo2.xml"){
        var filename=getUrlVars()['file'] || "dameo2.xml";

        var myGraph = new MySceneGraph(filename, myScene);

        app.run();
    }
    */
      var filename=getUrlVars()['file'] || "dameo.xml";
    
        var myGraph = new MySceneGraph(filename, myScene);

        app.run();
    
    
}

]);
