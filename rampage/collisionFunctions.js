var playerCollisionFunc = function(player, other)
{
	//console.log("Collision between Player and " + other.name);
	//console.log("Velocity " + player.physics.vel);

	//Update PLayer Position Data
	//vec2.set(player.transform.oldPos, player.transform.pos[0], player.transform.pos[1]);
	//vec2.scaleAndAdd(player.transform.pos, player.transform.pos, player.physics.vel, dt);

	vec2.copy(player.transform.pos, player.transform.oldPos);
	vec2.copy(player.physics.vel, [0, 0]);

	vec2.copy(player.collider.hitbox.pos, player.transform.pos);

	manager.isOutdated = true;
}

var swordCollisionFunc = function(sword, other)
{
	console.log("Collision between sword and " + other.name);
}