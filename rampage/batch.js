function createMasks(maskk, shadow)
{
	var mask;
	var intersect = false;


	for(var i = -10; i < 10; i++)
	{
		for(var j = -8; j < 8; j++)
		{
			mask = new GameObject("mask", ShaderType.MASK, 10);

			mask.transform = new Transform(TransformInput.POS_SCALE, i, j, 1, 1);
			mask.mesh = new Mesh();

			for(var k = 0; k < Lights.length; )
			{
				//Check if mask position intercepts any lights
				var radius = 0.5 + Lights[k + 2];

				if(intersectCircleCircle([Lights[k], Lights[k + 1]], [i, j], radius))
				{
					//If so split mask into 100|25 masks

					// LIGHT ZONE
					for(var a = i - 0.4; a < i + 0.5; )
					{
						for(var b = j - 0.4; b < j + 0.5; )
						{
							mask = new GameObject("mask", ShaderType.SHADOW, 11);

							mask.transform = new Transform(TransformInput.POS_SCALE, a, b, 0.2, 0.2);
							mask.mesh = new Mesh();

							AddObject(shadow, mask);
							b += 0.2;
						}
						a += 0.2;
					}

					intersect = true;
					break;
				}

				k += 3;
			}	
			if(!intersect)
			{
				AddObject(maskk, mask);
			}
			else
			{
				intersect = false;
			}

		}
	}

}

function createGround(shader)
{
	var ground;

	for(var i = -10; i < 10; i++)
	{
		for(var j = -8; j < 8; j++)
		{
			ground = new GameObject("ground", ShaderType.TEXTURE, 0);

			ground.transform = new Transform(TransformInput.POS, i, j);
			ground.mesh = new Mesh();
			ground.material = new Material(MaterialType.DIRT, [effectFuncParticlesTheme]);
			ground.sprite = new Sprite(textureDirt);

			AddObject(shader, ground);
		}
	}
}