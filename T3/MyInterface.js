 /**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor
    CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();

    // add a group of controls (and open/expand by defult)



    return true;
};


MyInterface.prototype.addButtons = function() {
    this.gui.add(this.scene, 'StartGame');
}
/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {

    var group = this.gui.addFolder("Lights");
    group.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
        }
    }
}

MyInterface.prototype.addSelectables = function(selectables, graph) {
  var group = this.gui.addFolder("Shaders");
  group.open();
  group.add(this.scene, "selectables", selectables).onChange(function(v) {
            for (var i = 0; i < selectables.length; i++) {
                if (selectables[i] == v) {
                    graph.activeSelectable = i;
                }
            }
        });
}

MyInterface.prototype.chooseScene = function(scenes, graph) {
    var group = this.gui.addFolder("Scenes");
    group.open();
    group.add(this.scene, "scenes", scenes).onChange(function(v) {
            for (var i = 0; i < scenes.length; i++) {
                if (scenes[i] == v) {
                   graph.activeEnvironment = i;
                   console.log(graph.activeEnvironment);
                }
            }
        });
}


MyInterface.prototype.chooseMode = function() {

    var group = this.gui.addFolder("Modes");
    group.open();
    group.add(this.scene, 'pc_vs_pc');
    group.add(this.scene, 'human_vs_pc');
    group.add(this.scene, 'human_vs_human');

}

MyInterface.prototype.chooseDifficulty = function() {

    var group = this.gui.addFolder("Difficulties");
    group.open();
    group.add(this.scene, 'normal');
    group.add(this.scene, 'hard');

}


