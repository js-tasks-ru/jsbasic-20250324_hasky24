function isEmpty(obj) {
  let count = true;

  for (let key in obj) {
    count = false;
  }

  return count;
}

/*
Альтернативное решение задачи с помощью метода Object.keys 
(читала эту главу ранее при самостоятельном изучении учебника)

function isEmpty(obj) {
  if (Object.keys(obj).length == 0) return true;
  
  return false;
}
*/