function makeFriendsList(friends) {
  let ul = document.createElement('ul');

  for (let friend of friends) {
    let li = document.createElement('li');
    li.innerHTML = `${friend.firstName} ${friend.lastName}`;
    ul.append(li);
  }

  return ul;
}

/* Второй вариант

function makeFriendsList(friends) {
  let ul = document.createElement('ul');

  for (let friend of friends) {
    ul.innerHTML += `<li>${friend.firstName} ${friend.lastName}</li>`;
  }
  return ul;
}
*/
