// viewer.js
function renderDXF(container, fileURL) {
    // Configura Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
  
    // Scarica il file DXF
    fetch(fileURL)
      .then(response => response.text())
      .then(dxfData => {
        // Usa il parser DXF di three-dxf
        const loader = new window.DxfParser();
        const dxf = loader.parseSync(dxfData);
        const viewer = new window.ThreeDxf.Viewer(dxf, renderer, camera, scene);
  
        // Aggiungi il viewer alla scena
        scene.add(viewer);
  
        // Posiziona la camera
        camera.position.set(100, 100, 100);
        camera.lookAt(scene.position);
  
        // Animazione del rendering
        function animate() {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        }
        animate();
      })
      .catch(err => {
        console.error("Errore durante il caricamento del file DXF:", err);
      });
  }
  
  // Esporta la funzione per l'uso esterno
  export default renderDXF;
  