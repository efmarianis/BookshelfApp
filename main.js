const judul = document.querySelector("#judul-buku");
const penulis = document.querySelector("#penulis-buku");
const tahun = document.querySelector("#tahun-buku");
const btnSubmit = document.querySelector("#book-form");
const listBook = document.querySelector(".list-grup");
const wrapperList = document.querySelector(".wrapper-showBook");
const cariList = document.querySelector(".btn-search-list");
const searchBook = document.querySelector("#cari-judul-buku");

wrapperList.addEventListener("click", deleteList);
wrapperList.addEventListener("click", selesaiList);
cariList.addEventListener("click", pencarianList);

function deleteList(e) {
  e.preventDefault();
  if (e.target.classList.contains("badge-delete")) {
    if (confirm("kamu yakin menghapus book-list ini?")) {
      const element = e.target.parentElement;
      console.log(element);
      element.remove();
    }
  }
}

function selesaiList(e) {
  e.preventDefault();

  if (e.target.classList.contains("badge-selesai")) {
    if (confirm("Apakah kamu sudah selesai membaca?")) {
      const el = e.target.parentElement;
      const els = e.target;
      el.style.backgroundColor = "#ccc";

      els.remove();
    }
  }
}

function pencarianList(e) {
  e.preventDefault();

  let dataFilter = searchBook.value;
  //const list = document.getElementsByTagName("li");
  const myList = document.getElementsByClassName("list-grup");

  for (let i = 0; i < myList.length; i++) {
    const list = myList[i].getElementsByTagName("li")[0];
    if (list) {
      let text = list.textContent || list.innerHTML;

      if (text.toLowerCase().indexOf(dataFilter.toLowerCase()) > -1) {
        myList[i].style.display = "";
      } else {
        myList[i].style.display = "none";
      }
    }
  }

  if (searchBook.value == "") {
    alert("Masukan judul buku terlebih dahulu");
  }
}

function showAlert(msg, className) {
  const alert = document.createElement("span");
  alert.className = `alert ${className}`;
  alert.appendChild(document.createTextNode(msg));

  const wrapper = document.querySelector("#wrapper");

  alert.style.width = "50%";
  alert.style.height = "2em";

  wrapper.appendChild(alert);

  //tampilkan selama 2 detik
  setTimeout(() => {
    alert.remove();
  }, 2000);
}

btnSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  if (judul.value == "" || penulis.value == "" || tahun.value == "") {
    // alert("Kamu belum mengisi data buku");
    showAlert("Masukan data terlebih dahulu", "error");
  } else {
    const ul = document.createElement("ul");
    ul.className = "list-grup";

    const li1 = document.createElement("li");
    li1.className = "list-item judul-list";
    li1.appendChild(document.createTextNode(judul.value));

    const li2 = document.createElement("li");
    li2.className = "list-item";
    li2.appendChild(document.createTextNode(penulis.value));

    const li3 = document.createElement("li");
    li3.className = "list-item";
    li3.appendChild(document.createTextNode(tahun.value));

    const spanSelesai = document.createElement("span");
    spanSelesai.className = "btn-selesai badge-selesai";
    spanSelesai.innerHTML = "Selesai";

    //button delete
    const spanDelete = document.createElement("span");
    spanDelete.className = "btn-delete badge-delete";
    spanDelete.innerHTML = "Delete";

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(spanSelesai);
    ul.appendChild(spanDelete);
    wrapperList.appendChild(ul);

    judul.value = "";
    penulis.value = "";
    tahun.value = "";

    showAlert("Buku berhasil ditambahkan ke rak", "success");
  }
});
