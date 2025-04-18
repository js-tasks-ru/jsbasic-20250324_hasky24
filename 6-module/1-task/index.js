/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows = [];
  elem = null;

  constructor(rows) {
    this.#rows = rows || this.#rows;
    this.#render();
  }

  #template() {
    return `
    <table>
      <thead>
          <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Зарплата</th>
              <th>Город</th>
              <th></th>
          </tr>
      </thead>
      <tbody>
        ${this.#rows.map((row) => ` <tr>
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.salary}</td>
            <td>${row.city}</td>
            <td><button class='delete_button'>X</button></td>
            </tr>`)
        .join('')}
      </tbody>
    </table>
  `;
  }

  #createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }

  #deleteRow = (deleteButton) => {
    deleteButton.closest('tr').remove()
  }

  #render() {
    this.elem = this.#createElement(this.#template());

    this.elem.addEventListener('click', (event) => {
      const deleteButton = event.target.closest('.delete_button');

      if (deleteButton) {
        this.#deleteRow(deleteButton)
      }
    })
  }
}
