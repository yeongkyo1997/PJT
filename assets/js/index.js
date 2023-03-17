import { serviceKey } from "./key.js";
import { location } from "./location.js";
const getRandom = () => {
  // 0~11
  let random = Math.floor(Math.random() * 12);
  console.log(location[random]);
  return location[random];
};

let rand = getRandom();
let key = Object.keys(rand)[0];
let val = Object.values(rand)[0];
let localinfo;
const sendRequestLocation = async () => {
  const areaUrl = `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?MobileOS=ETC&MobileApp=aaa&_type=json&areaCode=${key}&serviceKey=${serviceKey}`;
  fetch(areaUrl, { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      let items = data.response.body.items;
      localinfo = items.item;
      setTitle(val);
      createList(items.item);
    });
};

function setTitle(title) {
  let travelList = document.querySelector(".travel-list-title");
  console.log(travelList);
  travelList.innerHTML = title;
}
function createList(items) {
  let travelList = document.querySelector(".travel-list-ul");

  for (let i = 0; i < items.length; i++) {
    if (items[i].firstimage === "") continue;
    let li = document.createElement("li");
    li.className = "travel-list-li";
    let img = document.createElement("img");
    img.src = items[i].firstimage;
    let label1 = document.createElement("label");
    label1.className = "travel-info";
    let label2 = document.createElement("label");
    label2.className = "travel-info";
    label1.innerHTML = items[i].addr1;
    label2.innerHTML = items[i].title;
    let div = document.createElement("div");
    div.className = "travel-info-content";
    div.appendChild(label1);
    div.appendChild(label2);
    li.appendChild(img);
    li.appendChild(div);
    let btn = document.createElement("button");
    btn.className = "travel-info-btn";
    btn.id = items[i].contentid;
    btn.innerHTML = "자세히 보기";

    li.appendChild(btn);
    travelList.appendChild(li);

    btn.addEventListener("click", (e) => {
      modal.classList.toggle("show");
      const modalBody = document.querySelector(".modal-body");
      // 카카오맵 api
      var mapContainer = document.getElementById("map");
      var mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      var map = new kakao.maps.Map(mapContainer, mapOption);

      if (modal.classList.contains("show")) {
        document.body.style.overflow = "hidden";
      }
    });
  }
}

const modal = document.querySelector(".modal");

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.toggle("show");

    if (!modal.classList.contains("show")) {
      document.body.style.overflow = "auto";
    }
  }
});

sendRequestLocation();
