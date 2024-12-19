async function main() {
  // Membuat scene
  var scene = new THREE.Scene();

  // Membuat kamera
  var camera = new THREE.PerspectiveCamera(
    75, // Sudut pandang
    window.innerWidth / window.innerHeight, // Rasio aspek
    0.1, // Jarak dekat
    1000 // Jarak jauh
  );

  // Membuat renderer dan menambahkannya ke DOM
  var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("myCanvas"),
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Menempatkan kamera
  camera.position.x = 0; // Tepat di atas objek pada sumbu X
  camera.position.y = 7; // Tinggi di atas objek
  camera.position.z = 0; // Tepat di atas objek pada sumbu Z

  // Mengarahkan kamera ke bawah
  camera.lookAt(0, 0, 0); // Mengarahkan kamera ke pusat scene (0,0,0)

  // Opsional: Menambahkan OrbitControls untuk navigasi
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();

  // Menambahkan pencahayaan
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Variabel untuk menyimpan objek
  var object;

  // Memuat file MTL
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.load("./final.mtl", function (materials) {
    materials.preload();

    // Memuat file OBJ
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("./final.obj", function (obj) {
      object = obj;
      scene.add(object);
    });
  });

  // Create a canvas to draw the text
  var textCanvas = document.createElement("canvas");
  textCanvas.width = 512;
  textCanvas.height = 128;
  var context = textCanvas.getContext("2d");

  // Draw border
  context.strokeStyle = "#FFFFFF"; // Border color
  context.lineWidth = 4;
  context.strokeRect(0, 0, textCanvas.width, textCanvas.height);

  // Set text properties
  context.font = "30px Arial";
  context.fillStyle = "#FFFFFF"; // Text color
  context.fillText("Nama: Ahmad Alvin Jauhari", 10, 50);
  context.fillText("NRP: 5025221180", 10, 100);

  // Create texture from canvas
  var texture = new THREE.CanvasTexture(textCanvas);

  // Create sprite material
  var material = new THREE.SpriteMaterial({ map: texture });

  // Create sprite
  var sprite = new THREE.Sprite(material);

  // Position the sprite at the top-left corner
  sprite.position.set(-5, 5, 0); // Adjust position as needed

  // Scale the sprite
  sprite.scale.set(5, 1.25, 1); // Adjust scale based on canvas size

  // Add sprite to the scene
  scene.add(sprite);

  // Fungsi render dengan animasi rotasi
  function animate() {
    requestAnimationFrame(animate);

    // Rotasi objek jika sudah dimuat
    if (object) {
      object.rotation.y += 0.01; // Atur kecepatan rotasi sesuai keinginan
    }

    renderer.render(scene, camera);
  }
  animate();
}

main();
