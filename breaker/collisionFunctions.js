var playerCollisionFunc = function(player, other)
{
	//console.log("Collision between Player and " + other.name);
	//console.log("Velocity " + player.physics.vel);

	if(other.name != "ball")
	{
		if(player.physics.vel[0] > 0)
		{
			//Particles Right
			player.particles.position = Position.RIGHT;
		}
		else
		{
			//Particles Left
			player.particles.position = Position.LEFT;
		}
		player.particles.emit = true;

		vec2.copy(player.transform.pos, player.transform.oldPos);
		vec2.copy(player.physics.vel, [0, 0]);

		vec2.copy(player.collider.hitbox.pos, player.transform.pos);

		manager.isOutdated = true;
	}
}

var brickCollisionFunction = function(brick, other)
{
	if(other.name == "ball")
	{
		brick.transform.pos[0] += 20;
		brick.transform.dirty = true;

		vec2.copy(brick.collider.hitbox.pos, brick.transform.pos);
		updateCollider(brick);
		//Increase Score
		BRICKCOUNT++;
		SCORE += 100;

		if(BRICKCOUNT == BRICKS)
		{
			//End Game
			resetLevel();
		}
	}
}

var ballCollisionFunction = function(ball, other)
{
	//console.log("Collision between ball and " + other.name);

	// calculate new velocity using reflection
	// normal of the line segment ~other.collider.segmentColliding
	// current velocity !ball.physics.vel
	// current position ~ball.transform.pos
	// 
	//console.log("Velocity " + ball.physics.vel);

	//console.log(other);

	if(other.name == "floor")
	{
		return;
	}

	var addVelocity = 1;
	var len = vec2.length(player.physics.vel);

	if(other.physics == null)
	{
		addVelocity = 1.01;
	}
	else
	{
		//vec2.set(addVelocity, Math.abs(other.physics.vel[0]), Math.abs(other.physics.vel[1]));
	}

	if(ball.collider.collision.last == ball.collider.collision.current)
	{
		console.log("Ricochet: " + ball.collider.collision.last);
		if(len < ball.physics.maxSpeed)
		{
			addVelocity = 1.1;//vec2.set(addVelocity, 1.3, 1.3);
		}
		else
		{
			addVelocity = 1;
		}
		
	}
	else if(~(ball.collider.collision.last).indexOf('Wall') && ~(ball.collider.collision.current).indexOf('Wall'))
	{
		console.log("Ricochet: " + ball.collider.collision.last);
		if(len < ball.physics.maxSpeed)
		{
			addVelocity = 1.05;//vec2.set(addVelocity, 1.3, 1.3);
		}
		else
		{
			addVelocity = 1;
		}
	}
	else if(ball.collider.collision.current == "player")
	{
		if(len > ball.physics.speed)
		{
			addVelocity = 0.9;//vec2.set(addVelocity, 1.3, 1.3);
		}
		else
		{
			addVelocity = 1;
		}
	}

	var point1 = vec2.create();
	var point2 = vec2.create();
	
	var l = vec2.create();
	var normal = vec2.create();

	var B = vec2.create();
	var T = vec2.create();
	var S = vec2.create();
	var s = vec2.create();
	var r = vec2.create();

	var depth = 0;
	var angle = 0;
	var magnitude = 0;

	//console.log(other.collider.collision.t);
	//console.log(other.collider.collision.normal);

	vec2.copy(normal, other.collider.collision.normal);

	//vec2.set(point1, other.collider.segments[i][0][0], other.collider.segments[i][0][1]);
	//vec2.set(point2, other.collider.segments[i][1][0], other.collider.segments[i][1][1]);

	//vec2.subtract(l, point2, point1);

	//vec2.set(normal, l[1], -l[0]);
	//vec2.normalize(normal, normal);

	/* Internet
	*/

	//Vector2 velocity; // the velocity vector that is to be reflected off of the surface/plane/line

	//Vector2 normal; // the plane or line's normal

	//velocity -= 2 * Vector2.DotProduct(velocity, normal) * normal; // now the velocity is reflected

	// NEW VELOCITY

	depth = vec2.dot(ball.physics.vel, normal);

	vec2.scale(S, normal, depth)
	vec2.scale(r, S, 2)

	vec2.subtract(ball.physics.vel, ball.physics.vel, r);

	vec2.scale(ball.physics.vel, ball.physics.vel, addVelocity);

	// NEW POSITION

	vec2.scaleAndAdd(B, ball.transform.oldPos, ball.physics.vel, other.collider.collision.t * dt)

	//console.log("Collisiion Point: " + B)
	vec2.copy(dot.transform.pos, B);
	dot.transform.dirty = true;

	vec2.subtract(T, B, ball.transform.pos);

	depth = vec2.dot(T, normal);

	vec2.scale(S, normal, depth);

	vec2.scale(s, S, 2.0);

	vec2.subtract(r, s, T);

	vec2.copy(ball.transform.oldPos, ball.transform.pos);
	vec2.add(ball.transform.pos, B, r);

	vec2.copy(ball.collider.hitbox.pos, ball.transform.pos);
	/* CS230
	vec2.scaleAndAdd(B, ball.transform.oldPos, ball.physics.vel, other.collider.collision.t * dt)

	vec2.subtract(T, B, ball.transform.pos);

	depth = vec2.dot(T, normal);

	vec2.scale(S, normal, depth);

	vec2.scale(s, S, 2.0);

	vec2.subtract(r, s, T);
	vec2.add(ball.transform.pos, B, r);

	//angle = Math.atan2f(r[1], r[0]);

	vec2.normalize(r, r);

	magnitude = vec2.length(ball.physics.vel);

	vec2.scale(r, r, magnitude);

	vec2.copy(ball.physics.vel, r);*/


	//other.collider.collision = null;

	//console.log("Velocity " + ball.physics.vel);
}

var wallCollisionFunction = function(wall, other)
{
	//console.log("Collision between wall and " + other.name);
}

var floorCollisionFunction = function(floor, other)
{
	// Reset positions | end game screen if out of lives | etc
	if(other.name == "ball")
		resetLevel();
}