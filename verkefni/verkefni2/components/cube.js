import { BoxBufferGeometry,TextureLoader,MathUtils, Mesh, MeshStandardMaterial } from 'https://cdn.skypack.dev/three@0.132.2';

function createMaterial() {
  // create a texture loader.
  const textureLoader = new TextureLoader();

  // load a texture
  const texture = textureLoader.load(
    '/textures/uv-test-bw.png',
  );
  
  // create a "standard" material using
  // the texture we just loaded as a color map
  const material = new MeshStandardMaterial({
    map: texture,
  });
  
  return material;
}

function createCube() {
  // create a geometry
  const geometry = new BoxBufferGeometry(1, 1, 1);

  // create a default (white) Basic material
  /* const material = new MeshStandardMaterial({ color: "purple" }); */

  const material = createMaterial();

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);

  cube.rotation.set(-0.5, -0.1, 0.8);

  const radiansPerSecond = MathUtils.degToRad(30);

  // this method will be called once per frame
  cube.tick = (delta) => {
    // increase the cube's rotation each frame
    //cube.rotation.z += radiansPerSecond * delta;
    //cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  
  return cube;
}

export { createCube };