import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import {RectAreaLightUniformsLib} from 'three/addons/lights/RectAreaLightUniformsLib.js';
import {RectAreaLightHelper} from 'three/addons/helpers/RectAreaLightHelper.js';

//ChatGPT suggested I add this line of code to debug my shapes not spinning 
let cube, sphere, tetrahedron; // Declare variables at higher scope

function main() {
	const scene = new THREE.Scene();
	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
    renderer.setPixelRatio(window.devicePixelRatio); //chat gpt helped me with this along with course tutor
    resizeRendererToDisplaySize(renderer); //chat gpt helped me with this

	function updateLight() {

		light.target.updateMatrixWorld();
		helper.update();
	}

    window.addEventListener('resize', () => {
        resizeRendererToDisplaySize(renderer);
    }); //chat gpt helped me with this, a course tutor suggested me to add this as well

	renderer.setPixelRatio( window.devicePixelRatio );//chat gpt helped me with this
	renderer.setSize( window.innerWidth, window.innerHeight );//chat gpt helped me with this
	//canvas.appendChild( renderer.domElement );

// Add sky2block
{

	const loader = new THREE.CubeTextureLoader();
	const texture = loader.load([
		'afternoon_sky.jpg',
		'afternoon_sky.jpg',
		'afternoon_sky.jpg',
		'afternoon_sky.jpg',
		'afternoon_sky.jpg',
		'afternoon_sky.jpg',

	] );
	scene.background = texture;

}

//Camera Setup
//Update from last time
	const fov = 45;
	const aspect = window.innerWidth/window.innerHeight; // the canvas default (//chat gpt helped me with this)
	const near = 0.1;
	const far = 1000;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 0, 20, 70 );

	class MinMaxGUIHelper {

		constructor( obj, minProp, maxProp, minDif ) {

			this.obj = obj;
			this.minProp = minProp;
			this.maxProp = maxProp;
			this.minDif = minDif;

		}
		get min() {

			return this.obj[ this.minProp ];

		}
		set min( v ) {

			this.obj[ this.minProp ] = v;
			this.obj[ this.maxProp ] = Math.max( this.obj[ this.maxProp ], v + this.minDif );

		}
		get max() {

			return this.obj[ this.maxProp ];

		}
		set max( v ) {

			this.obj[ this.maxProp ] = v;
			this.min = this.min; // this will call the min setter

		}

	}

	function updateCamera() {

		camera.updateProjectionMatrix();

	}


//Passed the OrbitControls a camera to control
	const controls = new OrbitControls( camera, canvas );
	controls.target.set( 0, 5, 0 ); //orbit around 5 units above the origin and call control.update.
	controls.update();
	// /scene.background = new THREE.Color( 'black' );


// Floor 
	{
		//Load grass texture, 
	 const planeSize = 80;    //size of the floor.

		const loader = new THREE.TextureLoader();
		const texture = loader.load( 'grasslight-big.jpg' );
		texture.wrapS = THREE.RepeatWrapping;   //repeat the texture 
		texture.wrapT = THREE.RepeatWrapping;   //repeat the texture
		texture.magFilter = THREE.NearestFilter;   //set filtering to nearest.
		//texture.colorSpace = THREE.SRGBColorSpace;
		const repeats = planeSize / 20;  //"Since the texture is a 2x2 pixel checkerboard, by repeating and setting the repeat to half the size of the plane each check on the checkerboard will be exactly 1 unit large"
		texture.repeat.set( repeats, repeats );


		//Make Plane geometry. (Default Xy plane), ground (XZ) plane
		const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
		const planeMat = new THREE.MeshStandardMaterial( {  //make material for the plane
			map: texture,
			side: THREE.DoubleSide,
		} );
		//Create a mesh to insert it in the scene.
		const mesh = new THREE.Mesh( planeGeo, planeMat );
		mesh.rotation.x = Math.PI * - .5;
		scene.add( mesh );

	}


//White bone

	{
		//White rectangle
		const cubeGeo = new THREE.BoxGeometry( 4, 0.3, 0.6);
		const cubeMat = new THREE.MeshStandardMaterial( { color: '#ffffff' } );
		const mesh = new THREE.Mesh( cubeGeo, cubeMat );
		mesh.position.set( 7, 0.7, 0 );
		scene.add( mesh );

	}

	{
		//left sphere
		//3A Sphere (red)
		const sphere_geometry = new THREE.SphereGeometry( 0.7, 32, 16 ); 
		const sphere_material = new THREE.MeshStandardMaterial( { color: '#ffffff' } ); 
		sphere = new THREE.Mesh( sphere_geometry, sphere_material ); 

		sphere.position.set(5,0.7,0);  //chatgpt suggested I use this function to set the position on the screen, I put the values on my own

		scene.add( sphere );

	}

	{
		//Right sphere
		const sphere_geometry = new THREE.SphereGeometry( 0.7, 32, 16 ); 
		const sphere_material = new THREE.MeshStandardMaterial( { color: '#ffffff' } ); 
		sphere = new THREE.Mesh( sphere_geometry, sphere_material ); 

		sphere.position.set(9,0.7,0);  //chatgpt suggested I use this function to set the position on the screen, I put the values on my own

		scene.add( sphere );
	}



// White bone ends


//Blue Bone

{
	//White rectangle
	const cubeGeo = new THREE.BoxGeometry( 4, 0.3, 0.6);
	const cubeMat = new THREE.MeshStandardMaterial( { color: '#0000FF' } );
	const mesh = new THREE.Mesh( cubeGeo, cubeMat );
	mesh.position.set( 0, 0.7, -11 );
	scene.add( mesh );

}

{
	//left sphere
	//3A Sphere (red)
	const sphere_geometry = new THREE.SphereGeometry( 0.7, 32, 16 ); 
	const sphere_material = new THREE.MeshStandardMaterial( { color: '#0000FF' } ); 
	sphere = new THREE.Mesh( sphere_geometry, sphere_material ); 

	sphere.position.set(2,0.7,-11);  

	scene.add( sphere );

}

{
	//Right sphere
	const sphere_geometry = new THREE.SphereGeometry( 0.7, 32, 16 ); 
	const sphere_material = new THREE.MeshStandardMaterial( { color: '#0000FF' } ); 
	sphere = new THREE.Mesh( sphere_geometry, sphere_material ); 

	sphere.position.set(-2,0.7,-11);  

	scene.add( sphere );
}

//Blue bone ends



//Bone in mouth

{
	//White rectangle
	const cubeGeo = new THREE.BoxGeometry( 4, 0.2, 0.4);
	const cubeMat = new THREE.MeshStandardMaterial( { color: '#ffffff' } );
	const mesh = new THREE.Mesh( cubeGeo, cubeMat );
	mesh.position.set( 0, 3, 32.8 );
	scene.add( mesh );

}

{
	//left sphere
	const sphere_geometry = new THREE.SphereGeometry( 0.4, 32, 16 ); 
	const sphere_material = new THREE.MeshStandardMaterial( { color: '#ff0000' } ); 
	sphere = new THREE.Mesh( sphere_geometry, sphere_material ); 

	sphere.position.set(2,3,32.8);  

	scene.add( sphere );

}

{
	//Right sphere
	const sphere_geometry = new THREE.SphereGeometry( 0.4, 32, 16 ); 
	const sphere_material = new THREE.MeshStandardMaterial( { color: '#ff0000' } ); 
	sphere = new THREE.Mesh( sphere_geometry, sphere_material ); 

	sphere.position.set(-2,3,32.8);  

	scene.add( sphere );
}

//Bone in mouth ends




//Bone obj file
{
	const objLoader = new OBJLoader();
	objLoader.load('./bone2.obj', (object) => {
	object.rotation.set(0,0,0);  //z axis rotates the object left to right
	object.scale.set(1, 1, 1); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(-5,0.01004,6);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	console.log('Bone object added to scene:', object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			child.material = new THREE.MeshStandardMaterial({ color: 0x0000FF }); // Chat GPT helped me with this line of code (simply add a color to the obj file, no texture)
		}
	});
	});
}


	{
		//Green Sphere
		const sphereRadius = 0.7;
		const sphereWidthDivisions = 32;
		const sphereHeightDivisions = 16;
		const sphereGeo = new THREE.SphereGeometry( sphereRadius, sphereWidthDivisions, sphereHeightDivisions );
		const sphereMat = new THREE.MeshStandardMaterial( { color: '#00FF00' } );
		const mesh = new THREE.Mesh( sphereGeo, sphereMat );
		mesh.position.set(-6, 0.8, -5 );
		scene.add( mesh );

	}
	{
		//3A cube (duck):
		const boxWidth = 2;
		const boxHeight = 2;
		const boxDepth = 2;
		const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );

		const loader = new THREE.TextureLoader();
		const texture = loader.load( 'rubber_duck.jpg');
		texture.colorSpace = THREE.SRGBColorSpace;

		const material = new THREE.MeshStandardMaterial( { map: texture} ); // greenish blue hex number
		cube = new THREE.Mesh( geometry, material );
		//cube.visible = false
		cube.position.set(0,1.5,0);
		scene.add( cube );
	}

	{
		//3A Sphere (red)
		const sphere_geometry = new THREE.SphereGeometry( 0.7, 32, 16 ); 
		const sphere_material = new THREE.MeshStandardMaterial( { color: 0xff0000 } ); 
		sphere = new THREE.Mesh( sphere_geometry, sphere_material ); 

		sphere.position.set(-10,0.8,0);  //chatgpt suggested I use this function to set the position on the screen, I put the values on my own

		scene.add( sphere );
	}


// DOG PARK OBSTACLES

//Cylinders

	{
	const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32, ); 
	const material = new THREE.MeshBasicMaterial( {color: 0x808080} ); 
	const cylinder = new THREE.Mesh( geometry, material ); scene.add( cylinder );
	cylinder.rotation.set(Math.PI/2,0,0)   //CHATGPT helped me determine and use MATH.PI/2 to rotate to make various shapes in my code lay flat on my floor. I first found out how to use it here then I used Math.PI/2 elsewhere
	cylinder.scale.set(0.3,0.3,0.3)
	cylinder.position.set(-6,0,-15)
	}


	{
	const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32,); 
	const material = new THREE.MeshBasicMaterial( {color: 0x808080} ); 
	const cylinder = new THREE.Mesh( geometry, material ); scene.add( cylinder );
	cylinder.rotation.set(Math.PI/2,0,0)
	cylinder.scale.set(0.3,0.3,0.3)
	cylinder.position.set(-11,0,-15)
	}


	{
	const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32,); 
	const material = new THREE.MeshBasicMaterial( {color: 0x808080} ); 
	const cylinder = new THREE.Mesh( geometry, material ); scene.add( cylinder );
	cylinder.rotation.set(Math.PI/2,0,0)
	cylinder.scale.set(0.3,0.3,0.3)
	cylinder.position.set(-16,0,-15)
	}

	{
	const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 ); 
	const material = new THREE.MeshBasicMaterial( {color: 0x808080} ); 
	const cylinder = new THREE.Mesh( geometry, material ); scene.add( cylinder );
	cylinder.rotation.set(Math.PI/2,0,0)
	cylinder.scale.set(0.3,0.3,0.3)
	cylinder.position.set(-21,0,-15)
	}

//Yellow Ring
	{
	const geometry = new THREE.TorusGeometry( 10, 1, 16, 100 ); 
	const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
	const torus = new THREE.Mesh( geometry, material ); scene.add( torus );
	torus.rotation.set(0,Math.PI/2,0)
	torus.scale.set(0.4,0.4,0.4);
	torus.position.set(-23, 4.4,-15)
	}

//Rings next to eachother:
	{
	const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
	const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
	const torus = new THREE.Mesh( geometry, material ); scene.add( torus );
	//torus.rotation.set(0,Math.PI/2,0)
	torus.scale.set(0.2,0.2,0.2);
	torus.position.set(26, 2.6,-15)
	}

	{
	const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
	const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
	const torus = new THREE.Mesh( geometry, material ); scene.add( torus );
	//torus.rotation.set(0,Math.PI/2,0)
	torus.scale.set(0.2,0.2,0.2);
	torus.position.set(26, 2.6,-13)
	}


	{
	const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
	const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
	const torus = new THREE.Mesh( geometry, material ); scene.add( torus );
	//torus.rotation.set(0,Math.PI/2,0)
	torus.scale.set(0.2,0.2,0.2);
	torus.position.set(26, 2.6,-11)
	}


	{
	const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
	const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
	const torus = new THREE.Mesh( geometry, material ); scene.add( torus );
	//torus.rotation.set(0,Math.PI/2,0)
	torus.scale.set(0.2,0.2,0.2);
	torus.position.set(26, 2.6,-9)
	}



	//Obj obstacles
{
	const objLoader = new OBJLoader();
	objLoader.load('./obstacle_1.obj', (object) => {
	object.rotation.set((-Math.PI/2),0,Math.PI/2);  //z axis rotates the object left to right
	object.scale.set(0.5, 0.5, 0.5); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(-30,0.05,15);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			const loader = new THREE.TextureLoader();
			const dogTexture = loader.load('wood.jpg');
			child.material.map = dogTexture;
		}
	});
	});
}


// stool-like obstacles

{
	const objLoader = new OBJLoader();
	objLoader.load('./chair_obstacle.obj', (object) => {
	object.rotation.set((-Math.PI/2),Math.PI/2,Math.PI/2);  //z axis rotates the object left to right
	object.scale.set(1, 0.3, 1); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(12,0.05,20);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			const loader = new THREE.TextureLoader();
			const dogTexture = loader.load('wood.jpg');
			child.material.map = dogTexture;
		}
	});
	});
}

{
	const objLoader = new OBJLoader();
	objLoader.load('./chair_obstacle.obj', (object) => {
	object.rotation.set((-Math.PI/2),Math.PI/2,Math.PI/2);  //z axis rotates the object left to right
	object.scale.set(1, 0.5, 1); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(16,0.05,20);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			const loader = new THREE.TextureLoader();
			const dogTexture = loader.load('wood.jpg');
			child.material.map = dogTexture;
		}
	});
	});
}


{
	const objLoader = new OBJLoader();
	objLoader.load('./chair_obstacle.obj', (object) => {
	object.rotation.set((-Math.PI/2),Math.PI/2,Math.PI/2);  //z axis rotates the object left to right
	object.scale.set(1, 0.7, 1); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(20,0.05,20);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			const loader = new THREE.TextureLoader();
			const dogTexture = loader.load('wood.jpg');
			child.material.map = dogTexture;
		}
	});
	});
}

{
	const objLoader = new OBJLoader();
	objLoader.load('./chair_obstacle.obj', (object) => {
	object.rotation.set((-Math.PI/2),Math.PI/2,Math.PI/2);  //z axis rotates the object left to right
	object.scale.set(1, 0.5, 1); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(24,0.05,20);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			const loader = new THREE.TextureLoader();
			const dogTexture = loader.load('wood.jpg');
			child.material.map = dogTexture;
		}
	});
	});
}

{
	const objLoader = new OBJLoader();
	objLoader.load('./chair_obstacle.obj', (object) => {
	object.rotation.set((-Math.PI/2),Math.PI/2,Math.PI/2);  //z axis rotates the object left to right
	object.scale.set(1, 0.3, 1); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(28,0.05,20);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			const loader = new THREE.TextureLoader();
			const dogTexture = loader.load('wood.jpg');
			child.material.map = dogTexture;
		}
	});
	});
}

// DOG PARK OBSTACLES END

// Dog next to stool-like obstacles
{
	const objLoader = new OBJLoader();
	objLoader.load('./sitting_dog.obj', (object) => {
	object.rotation.set(-Math.PI/2,0,-Math.PI/2);
	object.scale.set(0.1, 0.1, 0.1); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(30,0,19);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			const loader = new THREE.TextureLoader();
			const dogTexture = loader.load('black_dog_texture.jpg');
			child.material.map = dogTexture;
		}
	});
	});
}

//Dog jumping over stools
{
	const objLoader = new OBJLoader();
	objLoader.load('./PitbullDog.obj', (object) => {
	object.rotation.set(-Math.PI/2,30.5,-Math.PI/2);
	object.scale.set(1, 1, 1); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(21,6,20);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			const loader = new THREE.TextureLoader();
			const dogTexture = loader.load('light_brown_fur.jpg');
			child.material.map = dogTexture;
		}
	});
	});
}

//puppy resting on stool like object
{ //puppy next to water bowl
	const objLoader = new OBJLoader();
	objLoader.load('./puppy.obj', (object) => {
		object.rotation.set(-Math.PI/2, 0, -Math.PI/2);
		object.scale.set(0.1, 0.1, 0.1); // Adjust the scaling factor
		object.position.set(10, 2.3, 19.5); // Set position

		scene.add(object);

		// Apply texture to the material of the 3D dog object
		object.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const loader = new THREE.TextureLoader();
				const dogTexture = loader.load('brown_fur.jpg');
				child.material.map = dogTexture;
			}
		});
		});
	}


//DOG HOUSE Code

{
	const objLoader = new OBJLoader();
	objLoader.load('./doghouse.obj', (object) => {
	object.rotation.set(Math.PI/2,Math.PI/2,-Math.PI/2);  //z axis rotates the object left to right
	object.scale.set(10, 10, 10); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(-34,0.05,34);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			const loader = new THREE.TextureLoader();
			const dogTexture = loader.load('wood.jpg');
			child.material.map = dogTexture;
		}
	});
	});
}


//Puppy inside dog house
{
	const objLoader = new OBJLoader();
	objLoader.load('./puppy.obj', (object) => {
		object.rotation.set(-Math.PI/2, 0, Math.PI/2);
		object.scale.set(0.1, 0.1, 0.1); // Adjust the scaling factor
		object.position.set(-32, 0.1, 35); // Set position

		scene.add(object);

		// Apply texture to the material of the 3D dog object
		object.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const loader = new THREE.TextureLoader();
				const dogTexture = loader.load('light_brown_fur.jpg');
				child.material.map = dogTexture;
			}
		});
		});
	}


//Pink donut
	{
	const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
	const material = new THREE.MeshBasicMaterial( { color: 0xFFC0CB} ); 
	const torus = new THREE.Mesh( geometry, material ); scene.add( torus );
	torus.rotation.set(Math.PI/2,0,0)
	torus.scale.set(0.1,0.1,0.1);
	torus.position.set(12,0.3,-7);
	}



//first dog
	{
	const objLoader = new OBJLoader();
	objLoader.load('./white_dog.obj', (object) => {
	//object.rotation.set(0,60,0);
	object.scale.set(0.5, 0.5, 0.5); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(0,-0.1,30);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			const loader = new THREE.TextureLoader();
			const dogTexture = loader.load('gs_dog_texture.webp');
			child.material.map = dogTexture;
		}
	});
	});
	}

	//Sitting dog obj file:
{
	const objLoader = new OBJLoader();
	objLoader.load('./sitting_dog.obj', (object) => {
	object.rotation.set(-Math.PI/2,0,Math.PI/2);
	object.scale.set(0.1, 0.1, 0.1); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(-15,0,-2);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			const loader = new THREE.TextureLoader();
			const dogTexture = loader.load('black_dog_texture.jpg');
			child.material.map = dogTexture;
		}
	});
	});
}


//Sitting dog next to wooden obstacle:
	//Sitting dog obj file:
	{
		const objLoader = new OBJLoader();
		objLoader.load('./sitting_dog.obj', (object) => {
		object.rotation.set(-Math.PI/2,0,-Math.PI/2);
		object.scale.set(0.1, 0.1, 0.1); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
		object.position.set(-24,0,13);    //I added the appropriate numbers to get close to the cube
	
		
		scene.add(object);
		// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
		// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
		object.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const loader = new THREE.TextureLoader();
				const dogTexture = loader.load('white_fur.jpg');
				child.material.map = dogTexture;
			}
		});
		});
	}


// Dog jumping over wooden obstacle
{
	//3A Dog Obj File
	//Stuff for obj file
	//create init object
	const objLoader = new OBJLoader();
	objLoader.load('./white_dog.obj', (object) => {
	//object.rotation.set(0,60,0);
	object.rotation.set(-Math.PI/2,30.5,-Math.PI/2);
	object.scale.set(0.5, 0.5, 0.5); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(-30.5,2,15);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			const loader = new THREE.TextureLoader();
			const dogTexture = loader.load('black_dog_texture.webp');
			child.material.map = dogTexture;
		}
	});
	});
	}


//Wolf jumping over rings 
{
//torus.position.set(26, 2.6,-15)
const objLoader = new OBJLoader();
objLoader.load('./Wolf_obj.obj', (object) => {
    object.rotation.set(19, 0, 0); // Adjust the Y-axis rotation incrementally
    object.scale.set(5, 5, 5); // Adjust the scaling factor
    object.position.set(26, 1.6, -12); // Adjust the position

    scene.add(object);

    // Apply texture to the material of the 3D wolf object
    object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            const loader = new THREE.TextureLoader();
            const wolfTexture = loader.load('Wolf_Body.jpg');
            child.material.map = wolfTexture;
        }
    });
});
}

//wolf behind rings
{
const objLoader = new OBJLoader();
objLoader.load('./Wolf_obj.obj', (object) => {
    object.rotation.set(0, 0, 0); // Adjust the Y-axis rotation incrementally
    object.scale.set(5, 5, 5); // Adjust the scaling factor
    object.position.set(26, 0, -19); // Adjust the position

    scene.add(object);

    // Apply texture to the material of the 3D wolf object
    object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            const loader = new THREE.TextureLoader();
            const wolfTexture = loader.load('Wolf_Body.jpg');
            child.material.map = wolfTexture;
        }
    });
});
}

//wolf in front of rings
{
	const objLoader = new OBJLoader();
	objLoader.load('./Wolf_obj.obj', (object) => {
		object.rotation.set(0, 0, 0); // Adjust the Y-axis rotation incrementally
		object.scale.set(5, 5, 5); // Adjust the scaling factor
		object.position.set(26, 0, -5); // Adjust the position
	
		scene.add(object);
	
		// Apply texture to the material of the 3D wolf object
		object.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const loader = new THREE.TextureLoader();
				const wolfTexture = loader.load('Wolf_Body.jpg');
				child.material.map = wolfTexture;
			}
		});
	});
	}

// Pitbull obj file

{
	const objLoader = new OBJLoader();
	objLoader.load('./PitbullDog.obj', (object) => {
	object.rotation.set(0,-Math.PI/2,0);
	object.scale.set(1, 1, 1); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(-3,0,-15);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			const loader = new THREE.TextureLoader();
			const dogTexture = loader.load('pitbull_texture.jpg');
			child.material.map = dogTexture;
		}
	});
	});
}


// Jumping pitbull Obj File:
//object.rotation.set(-Math.PI/2,30.5,-Math.PI/2);
{
	const objLoader = new OBJLoader();
	objLoader.load('./PitbullDog.obj', (object) => {
	object.rotation.set(-Math.PI/2,30.5,-Math.PI/2);
	object.scale.set(1, 1, 1); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(-16.5,2.5,-15);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			const loader = new THREE.TextureLoader();
			const dogTexture = loader.load('light_brown_fur.jpg');
			child.material.map = dogTexture;
		}
	});
	});
}

// Jumping pitbull Obj File inside ring:
//object.rotation.set(-Math.PI/2,30.5,-Math.PI/2);
{
	const objLoader = new OBJLoader();
	objLoader.load('./PitbullDog.obj', (object) => {
	object.rotation.set(-Math.PI/2, 42 ,-Math.PI/2);
	object.scale.set(1, 1, 1); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(-25,1.5,-15);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			const loader = new THREE.TextureLoader();
			const dogTexture = loader.load('gs_dog_texture.webp');
			child.material.map = dogTexture;
		}
	});
	});
}


// Puppy OBJ File

{
	const objLoader = new OBJLoader();
	objLoader.load('./puppy.obj', (object) => {
		object.rotation.set(-Math.PI/2, 0, -Math.PI/2);
		object.scale.set(0.1, 0.1, 0.1); // Adjust the scaling factor
		object.position.set(13, 0, -7.5); // Set position

		scene.add(object);

		// Apply texture to the material of the 3D dog object
		object.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const loader = new THREE.TextureLoader();
				const dogTexture = loader.load('light_brown_fur.jpg');
				child.material.map = dogTexture;
			}
		});
		});
	}

// Puppy next to food bowl
{
	const objLoader = new OBJLoader();
	objLoader.load('./puppy.obj', (object) => {
		object.rotation.set(-Math.PI/2, 0, -Math.PI/2);
		object.scale.set(0.1, 0.1, 0.1); // Adjust the scaling factor
		object.position.set(4, 0, 7.5); // Set position

		scene.add(object);

		// Apply texture to the material of the 3D dog object
		object.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const loader = new THREE.TextureLoader();
				const dogTexture = loader.load('black_dog_texture.jpg');
				child.material.map = dogTexture;
			}
		});
		});
	}

{ //bowl
	const objLoader = new OBJLoader();
	objLoader.load('./dogbowl.obj', (object) => {
		object.rotation.set(Math.PI/2, Math.PI/2,-Math.PI/2);
		object.scale.set(2, 2, 2); // Adjust the scaling factor
		object.position.set(2, -0.3, 8); // Set position

		scene.add(object);

		// Apply texture to the material of the 3D dog object
		object.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const loader = new THREE.TextureLoader();
				const dogTexture = loader.load('dogbowl_metal.jpg');
				child.material.map = dogTexture;
			}
		});
		});
	}


	//food in bowl
	{
		// Food in bowl
		const sphereRadius = 0.2;
		const sphereWidthDivisions = 32;
		const sphereHeightDivisions = 16;
		const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
		const sphereMat = new THREE.MeshStandardMaterial({ color: '#7B3F00' });

 //ChatGPT helped me learn how to write a for loop that makes multiple copies of the same object compacted together in the next 12 lines of code.
		const numSpheres = 100; // Total number of spheres
		const centerX = 2; // Center position X
		const centerZ = 8; // Center position Z
		const maxRadius = 1.5; // Maximum radius of the circle

		for (let i = 0; i < numSpheres; i++) {
			const angle = Math.random() * Math.PI * 2; // Random angle for each sphere
			const radius = Math.sqrt(Math.random()) * maxRadius; // Random radius with square root for more density towards center
			const x = centerX + Math.cos(angle) * radius;
			const z = centerZ + Math.sin(angle) * radius;
			const mesh = new THREE.Mesh(sphereGeo, sphereMat);
			mesh.position.set(x, 0.3, z);
			scene.add(mesh);
		}
	}
	

	//bowl for water
	{
		const objLoader = new OBJLoader();
		objLoader.load('./dogbowl.obj', (object) => {
			object.rotation.set(Math.PI/2, Math.PI/2,-Math.PI/2);
			object.scale.set(2, 2, 2); // Adjust the scaling factor
			object.position.set(-10, -0.3, 8); // Set position
	
			scene.add(object);
	
			// Apply texture to the material of the 3D dog object
			object.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					const loader = new THREE.TextureLoader();
					const dogTexture = loader.load('dogbowl_metal.jpg');
					child.material.map = dogTexture;
				}
			});
			});
		}


//water in bowl
{
	const geometry = new THREE.TorusGeometry( 10, 11, 16, 100 ); 
	const material = new THREE.MeshBasicMaterial( { color: 0x0E87CC} ); 
	const torus = new THREE.Mesh( geometry, material ); scene.add( torus );
	torus.rotation.set(Math.PI/2,0,0)
	torus.scale.set(0.1,0.1,0.1);
	torus.position.set(-10,0,8);
	}

	{ //puppy next to water bowl
		const objLoader = new OBJLoader();
		objLoader.load('./puppy.obj', (object) => {
			object.rotation.set(-Math.PI/2, 0, Math.PI/2);
			object.scale.set(0.1, 0.1, 0.1); // Adjust the scaling factor
			object.position.set(-12, 0, 8.5); // Set position
	
			scene.add(object);
	
			// Apply texture to the material of the 3D dog object
			object.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					const loader = new THREE.TextureLoader();
					const dogTexture = loader.load('brown_fur.jpg');
					child.material.map = dogTexture;
				}
			});
			});
		}

	//Clifford the big red dog!!
{
	const objLoader = new OBJLoader();
	objLoader.load('./sitting_dog.obj', (object) => {
	object.rotation.set(-Math.PI/2,0,-Math.PI/4);
	object.scale.set(0.4, 0.4, 0.4); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(27,0,-32);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			child.material = new THREE.MeshStandardMaterial({ color: 0xFF0000 }); // Chat GPT helped me with this line of code (simply add a color to the obj file, no texture)
		}
	});
	});
}


//Tree 1
{
	const objLoader = new OBJLoader();
	objLoader.load('./Tree.obj', (object) => {
	object.rotation.set(-Math.PI/2,Math.PI/2,Math.PI/2);
	object.scale.set(4, 5, 4); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(-25,0,-30);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			child.material = new THREE.MeshStandardMaterial({ color: 0x4F7942 }); // Chat GPT helped me with this line of code (simply add a color to the obj file, no texture)
		}
	});
	});
}

//Tree 2
{
	const objLoader = new OBJLoader();
	objLoader.load('./Tree.obj', (object) => {
	object.rotation.set(-Math.PI/2,Math.PI/2,Math.PI/2);
	object.scale.set(4, 5, 4); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(35,0,-10);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			child.material = new THREE.MeshStandardMaterial({ color: 0x4F7942 }); // Chat GPT helped me with this line of code (simply add a color to the obj file, no texture)
		}
	});
	});
}

//Tree 3
{
	const objLoader = new OBJLoader();
	objLoader.load('./Tree.obj', (object) => {
	object.rotation.set(-Math.PI/2,Math.PI/2,Math.PI/2);
	object.scale.set(4, 5, 4); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(0,0,-4);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			child.material = new THREE.MeshStandardMaterial({ color: 0x4F7942 }); // Chat GPT helped me with this line of code (simply add a color to the obj file, no texture)
		}
	});
	});
}


//Tree 4
{
	const objLoader = new OBJLoader();
	objLoader.load('./Tree.obj', (object) => {
	object.rotation.set(-Math.PI/2,Math.PI/2,Math.PI/2);
	object.scale.set(4, 5, 4); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(-30,0,9);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			child.material = new THREE.MeshStandardMaterial({ color: 0x4F7942 }); // Chat GPT helped me with this line of code (simply add a color to the obj file, no texture)
		}
	});
	});
}

//Tree 5
{
	const objLoader = new OBJLoader();
	objLoader.load('./Tree.obj', (object) => {
	object.rotation.set(-Math.PI/2,Math.PI/2,Math.PI/2);
	object.scale.set(4, 5, 4); // Adjust the scaling factor (CHATgpt helped me come up with this line of code, I input the numbers by myself)
	object.position.set(22,0,12);    //I added the appropriate numbers to get close to the cube

	
	scene.add(object);
	// Apply texture to the material of the 3D dog object (chatgpt helped me come up with the next 4 lines, I learned its a standard way of applying textures to 3d object like this using children)
	// Similar to this: https://discourse.threejs.org/t/how-to-texture-a-3d-model-in-three-js/25035
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			child.material = new THREE.MeshStandardMaterial({ color: 0x4F7942 }); // Chat GPT helped me with this line of code (simply add a color to the obj file, no texture)
		}
	});
	});
}


//Fencing------------------------------------
//right
{ 
	const objLoader = new OBJLoader();
	objLoader.load('./fence.obj', (object) => {
		object.rotation.set(-Math.PI/2, 0, Math.PI/2);
		object.scale.set(0.1, 0.1, 0.1); // Adjust the scaling factor
		object.position.set(-39, -0.3, 30); // Set position

		scene.add(object);

		// Apply texture to the material of the 3D dog object
		object.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const loader = new THREE.TextureLoader();
				const dogTexture = loader.load('fence_texture.jpg');
				child.material.map = dogTexture;
			}
		});
		});
	}
	{ 
		const objLoader = new OBJLoader();
		objLoader.load('./fence.obj', (object) => {
			object.rotation.set(-Math.PI/2, 0, Math.PI/2);
			object.scale.set(0.1, 0.1, 0.1); // Adjust the scaling factor
			object.position.set(-39, -0.3, 10.5); // Set position
	
			scene.add(object);
	
			// Apply texture to the material of the 3D dog object
			object.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					const loader = new THREE.TextureLoader();
					const dogTexture = loader.load('fence_texture.jpg');
					child.material.map = dogTexture;
				}
			});
			});
		}
	{ 
		const objLoader = new OBJLoader();
		objLoader.load('./fence.obj', (object) => {
			object.rotation.set(-Math.PI/2, 0, Math.PI/2);
			object.scale.set(0.1, 0.1, 0.1); // Adjust the scaling factor
			object.position.set(-39, -0.3, -9); // Set position
	
			scene.add(object);
	
			// Apply texture to the material of the 3D dog object
			object.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					const loader = new THREE.TextureLoader();
					const dogTexture = loader.load('fence_texture.jpg');
					child.material.map = dogTexture;
				}
			});
			});
		}
		{ 
			const objLoader = new OBJLoader();
			objLoader.load('./fence.obj', (object) => {
				object.rotation.set(-Math.PI/2, 0, Math.PI/2);
				object.scale.set(0.12, 0.1, 0.1); // Adjust the scaling factor
				object.position.set(-39, -0.3, -28.5); // Set position
		
				scene.add(object);
		
				// Apply texture to the material of the 3D dog object
				object.traverse((child) => {
					if (child instanceof THREE.Mesh) {
						const loader = new THREE.TextureLoader();
						const dogTexture = loader.load('fence_texture.jpg');
						child.material.map = dogTexture;
					}
				});
				});
			}

//left
{ 
	const objLoader = new OBJLoader();
	objLoader.load('./fence.obj', (object) => {
		object.rotation.set(-Math.PI/2, 0, -Math.PI/2);
		object.scale.set(0.1, 0.1, 0.1); // Adjust the scaling factor
		object.position.set(39, -0.3, 30); // Set position

		scene.add(object);

		// Apply texture to the material of the 3D dog object
		object.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const loader = new THREE.TextureLoader();
				const dogTexture = loader.load('fence_texture.jpg');
				child.material.map = dogTexture;
			}
		});
		});
	}
	{ 
		const objLoader = new OBJLoader();
		objLoader.load('./fence.obj', (object) => {
			object.rotation.set(-Math.PI/2, 0, -Math.PI/2);
			object.scale.set(0.1, 0.1, 0.1); // Adjust the scaling factor
			object.position.set(39, -0.3, 10.5); // Set position
	
			scene.add(object);
	
			// Apply texture to the material of the 3D dog object
			object.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					const loader = new THREE.TextureLoader();
					const dogTexture = loader.load('fence_texture.jpg');
					child.material.map = dogTexture;
				}
			});
			});
		}
	{ 
		const objLoader = new OBJLoader();
		objLoader.load('./fence.obj', (object) => {
			object.rotation.set(-Math.PI/2, 0, -Math.PI/2);
			object.scale.set(0.1, 0.1, 0.1); // Adjust the scaling factor
			object.position.set(39, -0.3, -9); // Set position
	
			scene.add(object);
	
			// Apply texture to the material of the 3D dog object
			object.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					const loader = new THREE.TextureLoader();
					const dogTexture = loader.load('fence_texture.jpg');
					child.material.map = dogTexture;
				}
			});
			});
		}
		{ 
			const objLoader = new OBJLoader();
			objLoader.load('./fence.obj', (object) => {
				object.rotation.set(-Math.PI/2, 0, -Math.PI/2);
				object.scale.set(0.12, 0.1, 0.1); // Adjust the scaling factor
				object.position.set(39, -0.3, -28.5); // Set position
		
				scene.add(object);
		
				// Apply texture to the material of the 3D dog object
				object.traverse((child) => {
					if (child instanceof THREE.Mesh) {
						const loader = new THREE.TextureLoader();
						const dogTexture = loader.load('fence_texture.jpg');
						child.material.map = dogTexture;
					}
				});
				});
			}

//back
{ 
	const objLoader = new OBJLoader();
	objLoader.load('./fence.obj', (object) => {
		object.rotation.set(-Math.PI/2, 0, -Math.PI/180);
		object.scale.set(0.12, 0.1, 0.1); // Adjust the scaling factor
		object.position.set(-28, -0.3, -39); // Set position

		scene.add(object);

		// Apply texture to the material of the 3D dog object
		object.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const loader = new THREE.TextureLoader();
				const dogTexture = loader.load('fence_texture.jpg');
				child.material.map = dogTexture;
			}
		});
		});
	}

{ 
	const objLoader = new OBJLoader();
	objLoader.load('./fence.obj', (object) => {
		object.rotation.set(-Math.PI/2, 0, -Math.PI/180);
		object.scale.set(0.12, 0.1, 0.1); // Adjust the scaling factor
		object.position.set(-5, -0.3, -39); // Set position

		scene.add(object);

		// Apply texture to the material of the 3D dog object
		object.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const loader = new THREE.TextureLoader();
				const dogTexture = loader.load('fence_texture.jpg');
				child.material.map = dogTexture;
			}
		});
		});
	}

{ 
	const objLoader = new OBJLoader();
	objLoader.load('./fence.obj', (object) => {
		object.rotation.set(-Math.PI/2, 0, -Math.PI/180);
		object.scale.set(0.17, 0.1, 0.1); // Adjust the scaling factor
		object.position.set(23, -0.3, -39); // Set position

		scene.add(object);

		// Apply texture to the material of the 3D dog object
		object.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const loader = new THREE.TextureLoader();
				const dogTexture = loader.load('fence_texture.jpg');
				child.material.map = dogTexture;
			}
		});
		});
	}

//front
{ 
	const objLoader = new OBJLoader();
	objLoader.load('./fence.obj', (object) => {
		object.rotation.set(-Math.PI/2, 0, -Math.PI/180);
		object.scale.set(0.12, 0.1, 0.1); // Adjust the scaling factor
		object.position.set(-28, -0.3, 40); // Set position

		scene.add(object);

		// Apply texture to the material of the 3D dog object
		object.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const loader = new THREE.TextureLoader();
				const dogTexture = loader.load('fence_texture.jpg');
				child.material.map = dogTexture;
			}
		});
		});
	}

{ 
	const objLoader = new OBJLoader();
	objLoader.load('./fence.obj', (object) => {
		object.rotation.set(-Math.PI/2, 0, -Math.PI/180);
		object.scale.set(0.12, 0.1, 0.1); // Adjust the scaling factor
		object.position.set(-5, -0.3, 40); // Set position

		scene.add(object);

		// Apply texture to the material of the 3D dog object
		object.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const loader = new THREE.TextureLoader();
				const dogTexture = loader.load('fence_texture.jpg');
				child.material.map = dogTexture;
			}
		});
		});
	}

{ 
	const objLoader = new OBJLoader();
	objLoader.load('./fence.obj', (object) => {
		object.rotation.set(-Math.PI/2, 0, -Math.PI/180);
		object.scale.set(0.17, 0.1, 0.1); // Adjust the scaling factor
		object.position.set(23, -0.3, 40); // Set position

		scene.add(object);

		// Apply texture to the material of the 3D dog object
		object.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				const loader = new THREE.TextureLoader();
				const dogTexture = loader.load('fence_texture.jpg');
				child.material.map = dogTexture;
			}
		});
		});
	}

//Lighting ------------------------------------------------
//GUI setup:

class ColorGUIHelper {
	constructor(object, prop) {
	this.object = object;
	this.prop = prop;
	}
	get value() {
	return `#${this.object[this.prop].getHexString()}`;
	}
	set value(hexString) {
	this.object[this.prop].set(hexString);
	}
}

//Ambient Lighting
{
	const color = 0xFFFFFF;
	const intensity = 1;
	const light = new THREE.AmbientLight(color, intensity);
	scene.add(light);

	// I believe these lines of code I got help from chat gpt to try and fix the lighting controls, but nothing worked.
	const ambientGUI = new GUI();
	const ambientContainer = document.getElementById('ambient-container'); // Create a container for ambient GUI controls
	ambientContainer.appendChild(ambientGUI.domElement); // Append to the ambient container
	//document.getElementById('ambient-container').appendChild(ambientGUI.domElement); // Append to a container div (chatgpt)
	ambientGUI.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
	ambientGUI.add(light, 'intensity', 0, 2, 0.01);


}

// RectArea Light
{
	class DegRadHelper {
		constructor(obj, prop) {
		  this.obj = obj;
		  this.prop = prop;
		}
		get value() {
		  return THREE.MathUtils.radToDeg(this.obj[this.prop]);
		}
		set value(v) {
		  this.obj[this.prop] = THREE.MathUtils.degToRad(v);
		}
	  }
	
	RectAreaLightUniformsLib.init();
	const color = 0xFFFFFF;
	const intensity = 5;
	const width = 12;
	const height = 4;
	const light = new THREE.RectAreaLight(color, intensity, width, height);
	light.position.set(0, 10, 0);
	light.rotation.x = THREE.MathUtils.degToRad(-90);
	scene.add(light);
	 
	const helper = new RectAreaLightHelper(light);
	light.add(helper);

//GUI (This was ChatGPT attempting to help me fix lighting controls)
	const gui = new GUI();
	gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
	gui.add(light, 'intensity', 0, 10, 0.01);
	gui.add(light, 'width', 0, 20);
	gui.add(light, 'height', 0, 20);
	gui.add(new DegRadHelper(light.rotation, 'x'), 'value', -180, 180).name('x rotation');
	gui.add(new DegRadHelper(light.rotation, 'y'), 'value', -180, 180).name('y rotation');
	gui.add(new DegRadHelper(light.rotation, 'z'), 'value', -180, 180).name('z rotation');
	
	makeXYZGUI(gui, light.position, 'position');

}


//Directional Light
// I believe some of these lines of code I got help from chat gpt to try and fix the lighting controls, but nothing worked.
function makeXYZGUI( gui, vector3, name, onChangeFn ) {

	const folder = gui.addFolder( name );
	folder.add( vector3, 'x', - 10, 10 ).onChange( onChangeFn );
	folder.add( vector3, 'y', 0, 10 ).onChange( onChangeFn );
	folder.add( vector3, 'z', - 10, 10 ).onChange( onChangeFn );
	folder.open();

}

{

	const color = 0xFFFFFF;
	const intensity = 1;
	const light = new THREE.DirectionalLight( color, intensity );
	light.position.set( 0, 10, 0 );
	light.target.position.set( - 5, 0, 0 );
	scene.add( light );
	scene.add( light.target );

	const helper = new THREE.DirectionalLightHelper( light );
	scene.add( helper );

	function updateLight() {

		light.target.updateMatrixWorld();
		helper.update();

	}

	updateLight();

// I believe some of these lines of code I got help from chat gpt to try and fix the lighting controls, but nothing worked.
	const directionalGUI = new GUI();
    const directionalContainer = document.getElementById('directional-container'); // Create a container for directional GUI controls
    directionalContainer.appendChild(directionalGUI.domElement); // Append to the directional container
	//document.getElementById('directional-container').appendChild(directionalGUI.domElement); // Append to a container div
	directionalGUI.addColor( new ColorGUIHelper( light, 'color' ), 'value' ).name( 'color' );
	directionalGUI.add( light, 'intensity', 0, 5, 0.01 );

	makeXYZGUI( directionalGUI, light.position, 'position', updateLight );
	makeXYZGUI( directionalGUI, light.target.position, 'target', updateLight );

}

// Directional Light End ---------------------------

	function resizeRendererToDisplaySize( renderer ) { //chat gpt helped me restructure this code to acheive a full window project

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
		}

		return needResize;

	}

    function render(time) { //chat gpt helped me restructure this code when I was working to debug my project to appear on the entire window on the webpage.
        resizeRendererToDisplaySize(renderer);

        time *= 0.001; // convert time to seconds
        cube.rotation.x = time;
        cube.rotation.y = time;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    
	}

	requestAnimationFrame( render );

}


main();

/*Assignment notes to grader: Notes to grader: Most code based off of threejs.org guides that were linked on assignment 5.B instructions. ChatGPT sometimes helped me learn, debug and get unstuck with my code, and I made comments in my code indicating where it was used. Also recieved help from a course tutor. 

A course tutor and chatGPT helped me get my assignment to show on a full screen for the website.

Old Asgn3B Notes: I was able to get my 3 different types of light sources in my implementation (ambient, directional, rectArea) but I could't figure out how to seperate the controls on my html page correctly. I was able to get the 3 light sources on my implementation with just the three.js.org guides, but I tried asking chatgpt for help on fixing the lighting controls on the top right corner (not part of the assignment) after meeting with various course tutors on how to fix it but they didn't know. The GUI implementations (for lighting controls) are a mix of three.js.org code and chat gpt suggested code that didn't really work every even after hours of trying to debug. I ended up not being able to fix the lighting controls, but I did all of the required points for 5B.
*/
