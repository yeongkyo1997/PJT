window.onload = function () {
  // 장바구니에 담긴 상품의 수량과 합계를 계산하는 함수
  function updateCart() {
    var cartTable = document.getElementById("cart-table");
    var total = 0;
    for (var i = 1; i < cartTable.rows.length - 1; i++) {
      var priceCell = cartTable.rows[i].cells[1];
      var quantityCell = cartTable.rows[i].cells[2];
      var subtotalCell = cartTable.rows[i].cells[3];
      var price = parseFloat(priceCell.innerHTML.replace(",", ""));
      var quantity = parseInt(quantityCell.firstChild.value);
      if (isNaN(quantity) || quantity < 0) {
        quantity = 0;
        quantityCell.firstChild.value = 0;
      }
      var subtotal = price * quantity;
      subtotalCell.innerHTML = subtotal.toLocaleString();
      total += subtotal;
    }
    var totalCell = cartTable.rows[cartTable.rows.length - 1].cells[3];
    totalCell.innerHTML = total.toLocaleString();
  }

  // 상품 수량 조절 input 요소의 변경 이벤트를 처리하는 함수
  function handleQuantityChange(event) {
    var input = event.target;
    updateCart();
  }

  // 상품 삭제 버튼 클릭 이벤트를 처리하는 함수
  function handleRemoveButtonClick(event) {
    var button = event.target;
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateCart();
  }

  // 상품 수량 조절 input 요소와 삭제 버튼에 이벤트 리스너 등록
  var inputs = document.querySelectorAll("#cart-table input[type='number']");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", handleQuantityChange);
  }
  var buttons = document.querySelectorAll(".remove-button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", handleRemoveButtonClick);
  }

  // 초기 상태에서 장바구니 합계를 계산
  updateCart();

  // 결제 버튼 클릭 이벤트를 처리하는 함수
  document
    .getElementById("checkout-button")
    .addEventListener("click", function () {
      alert("결제가 완료되었습니다!");
    });
};
