var collFuncFreeze = function(player, other)
{
	vec2.copy(player.transform.pos, player.transform.oldPos);
	vec2.copy(player.physics.vel, [0, 0]);
}

var collFuncOutput = function(obj1, obj2)
{
	console.log("Collision " + obj1.name + " and " + obj2.name);
}