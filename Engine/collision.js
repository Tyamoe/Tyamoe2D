var Collider = function(...input)
{
	this.type = (input.length > 0) ? input[0] : ColliderType.LINE;

	this.collisionFunc = (input.length > 1) ? input[1] : null;

	this.hitbox = (input.length > 2) ? new HitBox(input[2]) : new HitBox([1.0, 1.0]);

	this.static = (input.length > 3) ? input[3] : false;

	this.radius = 0;

	this.lineCount = 0;
	this.segments = [];
	this.corners = [];

	this.isColliding = false;
	this.collision = new Collision();
}

var Collision = function()
{
	this.last = "";
	this.current = "";
	this.t = 1;
	this.normal = vec2.create();
	vec2.set(this.normal, 0, 0);

	this.collisionUpdate = function(t, normal, name)
	{
		this.t = (t != null) ? t : this.t;

		vec2.copy(this.normal, (normal != null) ? normal : this.normal);

		this.last = this.current;

		this.current = (name != null) ? name : this.current;
  }
}

var HitBox = function(multiplier)
{
	this.pos = vec2.create();
	this.scale = vec2.create();
	this.multiplier = vec2.create();
	vec2.copy(this.multiplier, multiplier);
}

function collide()
{
	for(var i = 0; i < GameObjects.length; i++)
	{
		if(GameObjects[i].collider != null)
		{

			var coll1 = GameObjects[i].collider;

			for(var j = i + 1; j < GameObjects.length; j++)
			{

				if(GameObjects[j].collider != null && GameObjects[j] != GameObjects[i].parent && 
					GameObjects[i] != GameObjects[j].parent && !(coll1.static == true && GameObjects[j].collider.static == true))
				{

					var coll2 = GameObjects[j].collider;

					if(coll1.type == ColliderType.CIRCLE && coll2.type == ColliderType.CIRCLE)
					{
						//Circle Circle Collision
						if(CircleCircleCollision(GameObjects[i], GameObjects[j]))
						{
							for(var k = 0; k < coll1.collisionFunc.length; k++)
							{
								coll1.collisionFunc[k](GameObjects[i], GameObjects[j]);
							}

							for(var k = 0; k < coll2.collisionFunc.length; k++)
							{
								coll2.collisionFunc[k](GameObjects[j], GameObjects[i]);
							}
						}
					}
					else if(coll1.type == ColliderType.LINE && coll2.type == ColliderType.LINE)
					{
						//Line Line Collision
						if(LineLineCollision(GameObjects[i], GameObjects[j]))
						{
							for(var k = 0; k < coll1.collisionFunc.length; k++)
							{
								coll1.collisionFunc[k](GameObjects[i], GameObjects[j]);
							}

							for(var k = 0; k < coll2.collisionFunc.length; k++)
							{
								coll2.collisionFunc[k](GameObjects[j], GameObjects[i]);
							}
						}
					}
					else if(coll1.type == ColliderType.LINE && coll2.type == ColliderType.CIRCLE)
					{
						//Circle Line Collision
						if(CircleLineCollision(GameObjects[j], GameObjects[i]))
						{
							for(var k = 0; k < coll1.collisionFunc.length; k++)
							{
								coll1.collisionFunc[k](GameObjects[i], GameObjects[j]);
							}

							for(var k = 0; k < coll2.collisionFunc.length; k++)
							{
								coll2.collisionFunc[k](GameObjects[j], GameObjects[i]);
							}
						}
					}
					else if(coll1.type == ColliderType.CIRCLE && coll2.type == ColliderType.LINE)
					{
						//Circle Line Collision
						if(CircleLineCollision(GameObjects[i], GameObjects[j]))
						{
							for(var k = 0; k < coll1.collisionFunc.length; k++)
							{
								coll1.collisionFunc[k](GameObjects[i], GameObjects[j]);
							}

							for(var k = 0; k < coll2.collisionFunc.length; k++)
							{
								coll2.collisionFunc[k](GameObjects[j], GameObjects[i]);
							}
						}
					}
				}
			}	
		}
	}
}

function intersectCircleCircle(cir1, cir2, radius)
{
	var dis = vec2.distance([cir1[0], cir1[1]], [cir2[0], cir2[1]]);

	//console.log("Radius: " + radius);
	//console.log("Dis: " + dis);

	if(dis < radius)
	{	
		return true;
	}
	else 
	{
		return false;
	}
}

function CircleCircleCollision(obj1, obj2)
{
	var radius = (obj1.collider.radius) + (obj2.collider.radius);

	//var dis = vec2.distance(obj1.transform.pos, obj2.transform.pos);

	//console.log("Radius: " + radius);
	//console.log("Dis: " + dis);

	if(intersectCircleCircle(obj1.transform.pos, obj2.transform.pos, radius))
	{
		obj1.collider.collision.collisionUpdate(1, null, obj2.name);
		obj2.collider.collision.collisionUpdate(1, null, obj1.name);

		obj1.collider.isColliding = true;
		obj2.collider.isColliding = true;
		
		vec2.set(obj1.physics.vel, 0, 0);
		vec2.set(obj2.physics.vel, 0, 0);
		return true;
	}
	else
	{
		return false;
	}
}

function CircleLineCollision(obj1, obj2)
{
	var point1 = vec2.create();
	var point2 = vec2.create();

	var circle = obj1.collider;

	var radius = obj1.collider.radius;
	
	var vector1 = vec2.create();
	var vector2 = vec2.create();

	var radiusSqr = radius * radius;

	var coll = obj2.collider;

	var normall = vec2.create();

	if(intersectCircleLine(coll, circle, radiusSqr, normall))
	{
		obj1.collider.collision.collisionUpdate(null, null, obj2.name);
		obj2.collider.collision.collisionUpdate(null, null, obj1.name);

		//vec2.set(obj1.physics.vel, 0, 0);
		if(obj1.physics != null)
		{	
			obj1.collider.isColliding = true;
		}

		if(obj2.physics != null)
		{
			obj2.collider.isColliding = true;
		}

		return true;
	}

	var corner = vec2.create();

	for(var i = 0; i < 4; i++)
	{
		vec2.set(corner, coll.corners[i][0], coll.corners[i][1]);

		var dis = vec2.distance(obj1.transform.pos, corner);

		if(dis < obj1.collider.radius)
		{
			var normal = vec2.create();

			vec2.subtract(normal, corner, obj1.transform.pos);
			vec2.set(normal, -normal[0], -normal[1]);

			vec2.normalize(normal, normal);

			obj1.collider.collision.collisionUpdate(1, normal, obj2.name);
			obj2.collider.collision.collisionUpdate(1, normal, obj1.name);

			//console.log("2132Velocity " + obj1.physics.vel);

			if(obj1.physics != null)
			{	
				obj1.collider.isColliding = true;
			}

			if(obj2.physics != null)
			{
				obj2.collider.isColliding = true;
			}
			return true;
		}
	}

	return false;
}

function intersectCircleLine(coll, circle, radiusSqr, normall)
{
	var point1 = vec2.create();
	var point2 = vec2.create();
	
	var vector1 = vec2.create();
	var vector2 = vec2.create();

	for(var i = 0; i < coll.lineCount; i++)
	{
		vec2.set(point1, coll.segments[i][0][0], coll.segments[i][0][1]);
		vec2.set(point2, coll.segments[i][1][0], coll.segments[i][1][1]);

		vec2.subtract(vector1, point2, point1);
		vec2.subtract(vector2, circle.hitbox.pos, point1);

		vec2.set(normall, vector1[1], -vector1[0]);
		vec2.normalize(normall, normall);

		var a = vec2.dot(vector1, vector1);

		if(a != 0)
		{
			var b = vec2.dot(vector1, vector2);

			var t = b / a; // length of projection of vector2 onto vector1

			if ((t >= 0) && (t <= 1))
			{
				var c = vec2.dot(vector2, vector2);

				var r2 = c - a * t * t;

				if (r2 <= radiusSqr)
				{
					//coll.collision = new Collision(t, i, normall);

					circle.collision.collisionUpdate(t, normall, null);
					coll.collision.collisionUpdate(t, normall, null);
					return true;
				}
			}
		}
	}
}

function LineLineCollision(obj1, obj2)
{
	var vector1 = vec2.create();
	var normal = vec2.create();

	var hit1 = obj1.collider.hitbox;
	var hit2 = obj2.collider.hitbox;

	var w = 0.5 * (hit2.scale[0] + hit1.scale[0]);
	var h = 0.5 * (hit2.scale[1] + hit1.scale[1]);

	var dx = hit2.pos[0] - hit1.pos[0];
	var dy = hit2.pos[1] - hit1.pos[1];

	if (Math.abs(dx) <= w && Math.abs(dy) <= h)
	{
	  /* collision! */
	  var wy = w * dy;
	  var hx = h * dx;

		if (wy > hx)
	  {
	    if (wy > -hx)
	    {
	      /* top */
	      vec2.copy(normal, VectorUP);
	    }
	    else
	    {
	      /* left */
	      vec2.copy(normal, VectorLEFT);
	    }
	  }
	  else
	  {
	    if (wy > -hx)
	    {
	      /* right */
	      vec2.copy(normal, VectorRIGHT);
	    }
	    else
	    {
	      /* bottom */
	      vec2.copy(normal, VectorDOWN);
	    }
	  }

		/*
		vec2.subtract(vector1, hit2.pos, hit1.pos);

		vec2.set(normal, vector1[1], -vector1[0]);
		vec2.normalize(normal, normal);
		*/

		if(obj1.physics != null)
		{	
			obj1.collider.isColliding = true;
		}

		if(obj2.physics != null)
		{
			obj2.collider.isColliding = true;
		}

		obj1.collider.collision.collisionUpdate(1, normal, obj2.name);
		obj2.collider.collision.collisionUpdate(1, normal, obj1.name);

		return true;
	}
	return false;
}

function updateCollider(obj)
{
	vec2.multiply(obj.collider.hitbox.scale, obj.transform.scale, obj.collider.hitbox.multiplier);
	vec2.copy(obj.collider.hitbox.pos, obj.transform.pos);

	var t = (obj.transform.scale[1] - obj.collider.hitbox.scale[1]) / 2;
	t = obj.transform.pos[1] + t;

	obj.collider.hitbox.pos[1] = t;

	if(obj.collider.type == ColliderType.LINE)
	{
		//Init Line segments

		var xoffset = (obj.collider.hitbox.scale[0] / 2) + 0.1;
		var yoffset = (obj.collider.hitbox.scale[1] / 2) + 0.1;

		obj.collider.lineCount = 4;

		//Bottom Left to Bottom Right
		obj.collider.segments[0] = 
		[
			[(obj.transform.pos[0] - xoffset), (obj.transform.pos[1] - yoffset)], 
			[(obj.transform.pos[0] + xoffset), (obj.transform.pos[1] - yoffset)]
		];

		//Bottom Right to Top Right
		obj.collider.segments[1] = 
		[
			[(obj.transform.pos[0] + xoffset), (obj.transform.pos[1] - yoffset)], 
			[(obj.transform.pos[0] + xoffset), (obj.transform.pos[1] + yoffset)]
		];

		//Top Right to Top Left
		obj.collider.segments[2] = 
		[
			[(obj.transform.pos[0] + xoffset), (obj.transform.pos[1] + yoffset)], 
			[(obj.transform.pos[0] - xoffset), (obj.transform.pos[1] + yoffset)]
		];

		//Top Left to Bottom Left
		obj.collider.segments[3] = 
		[
			[(obj.transform.pos[0] - xoffset), (obj.transform.pos[1] + yoffset)], 
			[(obj.transform.pos[0] - xoffset), (obj.transform.pos[1] - yoffset)]
		];

		//CORNERS

		// Bottom Left
		obj.collider.corners[0] = 
		[
			(obj.transform.pos[0] - xoffset), (obj.transform.pos[1] - yoffset)
		];
		//Bottom Right to Top Right
		obj.collider.corners[1] = 
		[
			(obj.transform.pos[0] + xoffset), (obj.transform.pos[1] - yoffset)
		];
		//Top Right to Top Left
		obj.collider.corners[2] = 
		[
			(obj.transform.pos[0] + xoffset), (obj.transform.pos[1] + yoffset)
		];
		//Top Left to Bottom Left
		obj.collider.corners[3] = 
		[
			(obj.transform.pos[0] - xoffset), (obj.transform.pos[1] + yoffset)
		];

	}
	else if(obj.collider.type == ColliderType.CIRCLE)
	{
		//Init Radius
		var scaleX = obj.transform.scale[0] * obj.collider.hitbox.multiplier[0];
		var scaleY = obj.transform.scale[1] * obj.collider.hitbox.multiplier[1];

		vec2.multiply(obj.collider.hitbox.scale, obj.transform.scale, obj.collider.hitbox.multiplier);
		vec2.copy(obj.collider.hitbox.pos, obj.transform.pos);

		obj.collider.radius = ((scaleX + scaleY) / 2) / 2;
	}
}

function InitCollider(obj)
{
	if(obj.collider.type == ColliderType.LINE)
	{
		//Init Line segments
		vec2.multiply(obj.collider.hitbox.scale, obj.transform.scale, obj.collider.hitbox.multiplier);

		var xoffset = (obj.collider.hitbox.scale[0] / 2) + 0.1;
		var yoffset = (obj.collider.hitbox.scale[1] / 2) + 0.1;

		vec2.copy(obj.collider.hitbox.pos, obj.transform.pos);

		obj.collider.lineCount = 4;

		//Bottom Left to Bottom Right
		obj.collider.segments[0] = 
		[
			[(obj.transform.pos[0] - xoffset), (obj.transform.pos[1] - yoffset)], 
			[(obj.transform.pos[0] + xoffset), (obj.transform.pos[1] - yoffset)]
		];

		//Bottom Right to Top Right
		obj.collider.segments[1] = 
		[
			[(obj.transform.pos[0] + xoffset), (obj.transform.pos[1] - yoffset)], 
			[(obj.transform.pos[0] + xoffset), (obj.transform.pos[1] + yoffset)]
		];

		//Top Right to Top Left
		obj.collider.segments[2] = 
		[
			[(obj.transform.pos[0] + xoffset), (obj.transform.pos[1] + yoffset)], 
			[(obj.transform.pos[0] - xoffset), (obj.transform.pos[1] + yoffset)]
		];

		//Top Left to Bottom Left
		obj.collider.segments[3] = 
		[
			[(obj.transform.pos[0] - xoffset), (obj.transform.pos[1] + yoffset)], 
			[(obj.transform.pos[0] - xoffset), (obj.transform.pos[1] - yoffset)]
		];

		//CORNERS

		// Bottom Left
		obj.collider.corners[0] = 
		[
			(obj.transform.pos[0] - xoffset), (obj.transform.pos[1] - yoffset)
		];
		//Bottom Right to Top Right
		obj.collider.corners[1] = 
		[
			(obj.transform.pos[0] + xoffset), (obj.transform.pos[1] - yoffset)
		];
		//Top Right to Top Left
		obj.collider.corners[2] = 
		[
			(obj.transform.pos[0] + xoffset), (obj.transform.pos[1] + yoffset)
		];
		//Top Left to Bottom Left
		obj.collider.corners[3] = 
		[
			(obj.transform.pos[0] - xoffset), (obj.transform.pos[1] + yoffset)
		];

	}
	else if(obj.collider.type == ColliderType.CIRCLE)
	{
		//Init Radius
		var scaleX = obj.transform.scale[0] * obj.collider.hitbox.scale[0];
		var scaleY = obj.transform.scale[1] * obj.collider.hitbox.scale[1];

		vec2.multiply(obj.collider.hitbox.scale, obj.transform.scale, obj.collider.hitbox.multiplier);
		vec2.copy(obj.collider.hitbox.pos, obj.transform.pos);

		obj.collider.radius = ((scaleX + scaleY) / 2) / 2;
	}
}