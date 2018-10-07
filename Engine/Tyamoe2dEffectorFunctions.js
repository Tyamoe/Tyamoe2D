var effectFuncParticlesTheme = function(effector, other)
{
	if(other.particles == null)
	{
		return;
	}
	//console.log("Effector: " + effector.material.id);
	
	if(effector.material.id == MaterialType.DIRT)
	{
		//[0.24, 0.47], [0.14, 0.27], [0.0, 0.01]
		other.particles.themeR = [0.24, 0.47];
		other.particles.themeG = [0.14, 0.27];
		other.particles.themeB = [0.0, 0.01];
	}
	else if(effector.material.id == MaterialType.GRASS)
	{
		other.particles.themeR = [0.24, 0.47];
		other.particles.themeG = [0.24, 0.80];
		other.particles.themeB = [0.0, 0.01];
	}
	else if(effector.material.id == MaterialType.SAND)
	{
		other.particles.themeR = [0.90, 0.93];
		other.particles.themeG = [0.75, 0.84];
		other.particles.themeB = [0.46, 0.68];
	}
	else if(effector.material.id == MaterialType.COBBLE)
	{
		other.particles.themeR = [0.4, 0.55];
		other.particles.themeG = [0.4, 0.55];
		other.particles.themeB = [0.4, 0.55];
	}
	else if(effector.material.id == MaterialType.METAL)
	{
		other.particles.themeR = [0.23, 0.24];
		other.particles.themeG = [0.14, 0.20];
		other.particles.themeB = [0.04, 0.16];
	}
}