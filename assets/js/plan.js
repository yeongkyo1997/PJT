import { serviceKey } from "./key.js";
import { location } from "./location.js";

let areaUrl = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${serviceKey}&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`;
let btn = document.getElementById("btn-search");
let idx = 0;
fetch(areaUrl)
  .then((response) => response.json())
  .then((data) => makeOption(data));

function makeOption(data) {
  let areas = data.response.body.items.item;
  let sel = document.getElementById("search-area");
  areas.forEach(function (area) {
    let opt = document.createElement("option");
    opt.setAttribute("value", area.code);
    opt.appendChild(document.createTextNode(area.name));
    sel.appendChild(opt);
  });
}

btn.addEventListener("click", () => {
  let areaEle = document.getElementById("search-area").value;
  let keywordEle = document.getElementById("search-keyword").value;

  let url = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${serviceKey}&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=${keywordEle}&areaCode=${areaEle}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let items = data.response.body.items.item;
      console.log(data);
      let contentEle = document.getElementById("search-content-id").value;
      let bodyEle = document.getElementById("trip-list");
      console.log(bodyEle);

      bodyEle.innerHTML = "";
      items.forEach((item) => {
        let type = item.contenttypeid;

        if (contentEle == type && item.title.indexOf(keywordEle) != -1) {
          let sel = document.getElementById("trip-list");
          let trEle = document.createElement("tr");
          let imgTd = document.createElement("td");

          imgTd.className = "imgTd";

          let titleTd = document.createElement("td");
          titleTd.className = "titleTd";

          let addTd = document.createElement("td");
          addTd.className = "addTd";

          let btnTd = document.createElement("td");
          btnTd.className = "btnTd";
          trEle.setAttribute("class", "plan-item");
          trEle.setAttribute("id", `tr${++idx}`);

          if (item.firstimage === "")
            imgTd.innerHTML = `<img src="../assets/img/noimage.png">`;
          else imgTd.innerHTML = `<img src="${item.firstimage}"/>`;

          titleTd.innerHTML = `<div>${item.title}</div>`;

          addTd.innerHTML = `<div>${item.addr1}</div>`;

          btnTd.innerHTML = `<div class="checks etrans">
                              <input id="${idx}" type="checkbox" />
                              <label for="ex_chk3"></label>
                            </div>`;

          trEle.appendChild(imgTd);
          trEle.appendChild(titleTd);
          trEle.appendChild(addTd);
          trEle.appendChild(btnTd);
          sel.appendChild(trEle);
        }
      });
    });
});
