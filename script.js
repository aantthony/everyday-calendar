const d = document;

class Calendar {
  constructor(year) {
    this.year = year;
    const el = d.createElement('div');
    const date = new Date(year, 0, 1);

    function onClick(e) {
      const elDate = e.currentTarget;
      elDate.classList.toggle('done');
      if (elDate.classList.contains('done')) {
        localStorage.setItem(elDate.identifier, true);
      } else {
        localStorage.removeItem(elDate.identifier);
      }
    }

    const months = [];
    for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
      const elMonth = d.createElement('month');;
      months[monthIndex] = elMonth;
      el.appendChild(elMonth);
    }

    while (date.getFullYear() === year) {
      const name = date.getDate();
      const id = date.toISOString().substring(0, 10);
      const checked = !!localStorage.getItem(id);
      const elDate = d.createElement('button');
      elDate.addEventListener('click', onClick, true);
      elDate.className = 'day';
      if (checked) {
        elDate.classList.add('done');
      }
      const elText = d.createElement('span');
      elText.appendChild(d.createTextNode(name));
      elDate.appendChild(elText);
      elDate.identifier = id;
      console.log(elDate.identifier, id)
      months[date.getMonth()].appendChild(elDate);
      date.setDate(date.getDate() + 1);
    }
    this.el = el;
  }
}

const cal = new Calendar(new Date().getFullYear());
document.getElementById('calendar').appendChild(cal.el);