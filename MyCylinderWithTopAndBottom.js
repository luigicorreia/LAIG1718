/**
 * MyCylinderWithtopAndBottom
 * @constructor
 */
 function MyCylinderWithTopAndBottom(scene,args)
{
    CGFobject.call(this,scene);

    this.args = args.split(" ");

    this.height = parseFloat(this.args[0]);
    this.botRad = parseFloat(this.args[1]);
    this.topRad = parseFloat(this.args[2]);
    this.stacks = parseFloat(this.args[3]);
    this.slices = parseFloat(this.args[4]);

    this.initBuffers();
};

MyCylinderWithTopAndBottom.prototype = Object.create(CGFobject.prototype);
MyCylinderWithTopAndBottom.prototype.constructor=MyCylinderWithTopAndBottom;

MyCylinderWithTopAndBottom.prototype.initBuffers = function ()
{
    this.vertices = [];
    this.normals = [];
    this.indices = [];
    this.texCoords = [];

    var step = this.height/this.stacks;
    var deltaRadius = (this.topRad - this.botRad);
    var delta = 2 * Math.PI/this.slices;

    for(var i = 0 ; i <= this.stacks ; i++)
    {
        var radPercent = i/this.stacks;
        var radius = radPercent * deltaRadius + this.botRad;

        for(var j = 0; j < this.slices; j++)
        {
            var angle = j * delta;
            this.vertices.push(radius * Math.cos(angle), radius * Math.sin(angle), i * step);
            this.normals.push(Math.cos(angle), Math.sin(angle), 0);
            this.texCoords.push(j / this.slices, i / this.stacks);
        }
    }

    var currentSlice = 1;
    for(var i = 0; i < this.slices*this.stacks; i++)
    {
        if(currentSlice == this.slices)
        {
            this.indices.push(i, i - this.slices + 1, i + this.slices);
            this.indices.push(i+this.slices, i - this.slices + 1, i + 1);
            currentSlice = 1;
        }
        else
        {
            this.indices.push(i, i+1, i + this.slices);
            if(i != this.slices * this.stacks - 1)
                this.indices.push(i+this.slices, i + 1, i + 1 + this.slices);
            currentSlice++;
        }
    }

 //bases
    this.vertices.push(0,0,0);
    this.vertices.push(0,0,this.height);
    this.texCoords.push(0.5,0.5);
    this.texCoords.push(0.5,0.5);
    var botRadCenter = (this.vertices.length/3) - 2;
    var topRadCenter = (this.vertices.length/3) - 1;
    for(var i = 0; i < this.slices; i++)
    {
        this.normals.push(0, 0, -1);
        this.normals.push(0, 0, 1);

    }
    currentSlice = 1;
    for(var j = 0; j < this.slices; j++)
    {
        if(currentSlice == this.slices)
        {
            this.indices.push(botRadCenter, j + 1 - this.slices, j);
            this.indices.push(j + this.stacks * this.slices, j + this.stacks * this.slices-this.slices + 1, topRadCenter);
            currentSlice = 1;
        }
        this.indices.push(botRadCenter, j + 1, j);
        this.indices.push(j + this.stacks * this.slices, j + 1 + this.stacks * this.slices, topRadCenter);
        this.texCoords.push(0.5+Math.cos(i*(2*Math.PI)/this.slices)/2);
		    this.texCoords.push(0.5-Math.sin(i*(2*Math.PI)/this.slices)/2);
        currentSlice++;
    }

    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
