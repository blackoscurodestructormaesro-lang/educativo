// Manejo páginas
function showPage(page) {
    document.querySelectorAll('.page').forEach(section => {
      section.classList.add('hidden');
    });
    document.getElementById(page).classList.remove('hidden');
  
    if(page === 'wordGame') {
      setDifficulty(); // carga palabras según dificultad seleccionada
    }
    if(page === 'contact') {
      clearContact();
    }
  }
  
  // Salir (simulación)
  function exitApp() {
    if(confirm('¿Quieres salir de la aplicación?')) {
      document.body.innerHTML = '<h1 style="text-align:center; margin-top:3rem;">Gracias por usar la aplicación.</h1>';
    }
  }
  
  // Palabras con varios índices faltantes para diferentes niveles
  const words = [
    {word: 'sol', missingIndices: [1], image: 'sol.jpeg'},            // S _ L  (1 letra)
    {word: 'luna', missingIndices: [1, 3], image: 'luna.jpeg'},        // L _ N _ (2 letras)
    {word: 'flores', missingIndices: [0, 2, 4], image: 'flores.jpeg'}, // _ L _ R _ S (3 letras)
    {word: 'gato', missingIndices: [2], image: 'gato.jpeg'},           // G A _ O (1 letra)
    {word: 'homero', missingIndices: [1, 4], image: 'homero.jpeg'},    // H _ M E _ O (2 letras)
    {word: 'sapo', missingIndices: [1], image: 'sapo.jpeg'},           // S A _ O (1 letra)
    {word: 'sonic', missingIndices: [3], image: 'sonic.jpeg'},         // S O N _ C (1 letra)
    {word: 'goku', missingIndices: [1], image: 'goku.jpeg'},           // G _ K U (1 letra)
    {word: 'saga', missingIndices: [1, 2], image: 'saga.jpeg'},        // S _ G A (2 letras)
    {word: 'luffy', missingIndices: [1, 2, 3], image: 'luffy.jpeg'},   // L _ F F _ Y (3 letras)
    {word: 'gordo', missingIndices: [1], image: 'gordo.jpeg'},         // G _ R D O (1 letra)
    {word: 'niña', missingIndices: [2], image: 'niña.jpeg'},           // N I _ A (1 letra)
    {word: 'burro', missingIndices: [1, 3], image: 'burro.jpeg'},      // B _ R _ O (2 letras)
    {word: 'mario', missingIndices: [3], image: 'mario.jpeg'},         // M A R _ O (1 letra)
    {word: 'tanjiro', missingIndices: [3,4,5], image: 'tanjiro.jpeg'}, // T A N _ I R _ O (3 letras)
    {word: 'mono', missingIndices: [2], image: 'mono.jpeg'},           // M O _ O (1 letra)
    {word: 'naruto', missingIndices: [2], image: 'naruto.jpeg'},       // N A _ U T O (1 letra)
    {word: 'boruto', missingIndices: [3], image: 'boruto.jpg'},        // B O R _ T O (1 letra)
  ];
  
  // Variables para control
  let difficulty = 1;
  let filteredWords = [];
  let currentIndex = 0;
  let score = 0;
  
  function setDifficulty() {
    difficulty = parseInt(document.getElementById('difficulty').value);
    filteredWords = words.filter(w => w.missingIndices.length === difficulty);
  
    if(filteredWords.length === 0) {
      alert('No hay palabras para ese nivel.');
      document.getElementById('wordDisplay').innerHTML = '';
      document.getElementById('image').src = '';
      document.getElementById('letterInput').disabled = true;
      document.getElementById('letterInput').value = '';
      return;
    }
  
    currentIndex = 0;
    score = 0;
    displayWord(filteredWords[currentIndex]);
    displayScore();
  }
  
  function displayWord(wordObj) {
    const img = document.getElementById('image');
    img.src = wordObj.image;
    img.alt = `Imagen de ${wordObj.word}`;
  
    const wordDisplay = document.getElementById('wordDisplay');
    const chars = wordObj.word.split('');
    wordObj.missingIndices.forEach(i => {
      chars[i] = '<span style="border-bottom:2px solid #ff6f61; padding:0 8px;">_</span>';
    });
    wordDisplay.innerHTML = chars.join('');
  
    const input = document.getElementById('letterInput');
    input.value = '';
    input.maxLength = wordObj.missingIndices.length;
    input.style.width = (30 * wordObj.missingIndices.length) + 'px'; // ajustar ancho input
    input.disabled = false;
  
    document.getElementById('resultMessage').textContent = '';
  }
  
  function displayScore() {
    const scoreDiv = document.getElementById('scoreDisplay');
    scoreDiv.textContent = `Puntaje: ${score} 🎉`;
  }
  
  function checkLetter() {
    const input = document.getElementById('letterInput').value.toLowerCase();
    const result = document.getElementById('resultMessage');
    const wordObj = filteredWords[currentIndex];
  
    const soundCorrect = document.getElementById('soundCorrect');
    const soundWrong = document.getElementById('soundWrong');
  
    if(input.length !== wordObj.missingIndices.length){
      result.textContent = `Por favor, introduce las ${wordObj.missingIndices.length} letras faltantes.`;
      result.className = 'result incorrect';
      return;
    }
  
    let correct = true;
    for(let i = 0; i < wordObj.missingIndices.length; i++){
      if(input[i] !== wordObj.word[wordObj.missingIndices[i]]){
        correct = false;
        break;
      }
    }
  
    if(correct){
      result.innerHTML = '¡Muy bien! Letras correctas. 😊';
      result.className = 'result correct';
      score++;
      displayScore();
      document.getElementById('letterInput').disabled = true;
      if(soundCorrect){
        soundCorrect.currentTime = 0;
        soundCorrect.play();
      }
    } else {
      result.innerHTML = 'Intenta otra vez. 😠';
      result.className = 'result incorrect';
      if(soundWrong){
        soundWrong.currentTime = 0;
        soundWrong.play();
      }
    }
  }
  
  function nextWord(){
    currentIndex++;
    if(currentIndex >= filteredWords.length){
      alert(`¡Has terminado el juego!\nTu puntaje final es: ${score} / ${filteredWords.length} 🎉`);
      currentIndex = 0;
      score = 0;
    }
    document.getElementById('letterInput').disabled = false;
    displayWord(filteredWords[currentIndex]);
    displayScore();
  }
  
  function clearGame(){
    if(!document.getElementById('wordGame').classList.contains('hidden')){
      document.getElementById('letterInput').disabled = false;
      if(filteredWords.length > 0){
        displayWord(filteredWords[currentIndex]);
      } else {
        setDifficulty();
      }
      score = 0;
      displayScore();
    }
  }
  
  function clearContact(){
    document.getElementById('contactResponse').textContent = '';
    document.getElementById('contactForm').reset();
  }
  
  function submitContact(e){
    e.preventDefault();
    document.getElementById('contactResponse').textContent = 'Mensaje enviado. ¡Gracias!';
    document.getElementById('contactForm').reset();
  }
  
  // Mostrar inicio por defecto
  showPage('home');