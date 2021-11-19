/*jshint esversion: 6 */

$(function () {
  const konyvek = [];
  let eleresiut = "http://localhost:3000/konyvek";

  let konkretRekkord = eleresiut + "?_id=2&id=3";
  let nevSzerint = eleresiut + "?_sort=cim&_order=desc";
  let regenyek = "?kategoria=Regény";
  let adottSzerzo = eleresiut + "?kategoria=Laczkfi";
  let szovegReszlet = eleresiut + "?cim_like=elve";
  let arKozott = eleresiut + "?ar_gte=1000&ar_lte=2000";
  let listaKozott = eleresiut + "?_start=5&_limit=2";

  let adat = {
    nev: "József Attila",
    cim: "Téli éjszaka",
    ar: 4614,
    kategoria: "vers",
  };

  function myAjax(eleresiut, tomb, myCallback) {
    tomb.splice(0, tomb.lenght);
    $.ajax({
      url: eleresiut,
      type: "GET",
      success: function (result) {
        console.log(result);
        result.forEach((element) => {
          tomb.push(element);
        });
        myCallback(tomb);
      },
    });
  }

  $(".ujAdat").on("click", () => myAjaxPost(eleresiut, adat));
  myAjax(eleresiut, konyvek, kiir);

  function myAjaxPost(eleresiut, adat) {
    $.ajax({
      url: eleresiut,
      type: "POST",
      data: adat,
      success: function (result) {
        console.log(result);
        myAjax(eleresiut, konyvek, kiir);
      },
    });
  }
  $(".torles").on("click", () => myAjaxDelete(eleresiut, 4));

  function myAjaxDelete(eleresiut, id) {
    $.ajax({
      url: eleresiut + "/" + id,
      type: "DELETE",
      success: function (result) {
        console.log(result);
        myAjax(eleresiut, konyvek, kiir);
      },
    });
  }

  $(".szerkeszt").on("click", () => myAjaxPut(eleresiut, 1, adat));

  function myAjaxPut(eleresiut, id, adat) {
    $.ajax({
      url: eleresiut + "/" + id,
      type: "PUT",
      data: adat,
      success: function (result) {
        console.log(result);
        myAjax(eleresiut, konyvek, kiir);
      },
    });
  }

  function kiir(tomb, szoveg) {
    console.log(tomb);
    let sablon = "";
    tomb.forEach(({ nev, cim, kategoria, ar }) => {
      sablon += `
    <div >
    <h3 >${nev}</h3>

    <h4 class"cim">
    ${cim}
    </h4>
    <p>${kategoria}</p>

    <span class="ar">${ar}</span>
    </div>`;
    });
    $("#adatok").html(sablon);
  }
});
