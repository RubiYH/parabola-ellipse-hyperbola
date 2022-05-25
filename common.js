$(document).ready(function () {
  //graphs list

  let activated = false;

  //hide
  function hideList() {
    $(".history").fadeOut(function () {
      $(this).removeClass("toggle");
      $(".history").empty();
      $(".history").append("<div class='hlist'></div>");
      activated = false;
    });
  }

  $("#graphs_list").click(function (e) {
    e.stopPropagation();
    if (activated) {
      hideList();
      return;
    }

    hideCoordList();

    $(".history")
      .fadeIn(function () {
        $(this).css({ display: "block" });
      })
      .addClass("toggle");
    $(".history").append(
      '<div class="h-remove"><input id="h-sel" type="checkbox"/><button id="h-remove-confirm" disabled><i class="fa-solid fa-trash-can"></i></button></div>'
    );
    activated = true;

    for (var i = 0; i < graphs.length; i++) {
      // if (graphs[i].redraw) continue;
      $(".hlist").append(
        `<div class="h-item" value="${graphs[i].id}"><input type="checkbox" id="h-checkbox" value="${graphs[i].id}" /><button id="g-${graphs[i].id}" style="display: flex; flex-direction: row; align-items: center;"><span style="color: ${graphs[i].color}">● </span><img src=${graphs[i].equationURL} /></button></div>`
      );
    }
    if (graphs.length == 0) {
      $(".history").append("<p>기록이 없습니다.</p>");
      $("#h-sel").prop("disabled", true);
      $("#h-remove-confirm").prop("disabled", true);
    }
  });

  //selected
  function atleastSel() {
    if ($("input[id='h-checkbox']:checked").length > 0) {
      $("#h-remove-confirm").prop("disabled", false);
    } else {
      $("#h-remove-confirm").prop("disabled", true);
    }
  }
  $(document).on("change", "input[id='h-checkbox']", function () {
    atleastSel();
    let Q = graphs.length;
    if ($("input[id='h-checkbox']:checked").length < Q) {
      $("#h-sel").prop("checked", false);
    } else if ($("input[id='h-checkbox']:checked").length == Q) {
      $("#h-sel").prop("checked", true);
    }
  });

  //select all
  function selAll(condition) {
    if (condition) {
      $("input[id='h-checkbox']").each(function () {
        $(this).prop("checked", true);
      });
    } else {
      $("input[id='h-checkbox']").each(function () {
        $(this).prop("checked", false);
      });
    }
  }
  $(document).on("change", "input[id='h-sel']", function () {
    selAll($(this).is(":checked"));
    atleastSel();
  });

  //delete selected from list
  $(document).on("click", "#h-remove-confirm", function () {
    $("input[id='h-checkbox']:checked").each(function () {
      let idx = parseInt($(this).val());
      $(`div[class='h-item'][value='${idx}']`).remove();
      let index = graphs.findIndex((i) => i.id == idx);
      graphs.splice(index, 1);
      console.log(graphs);
      if (graphs.length == 0) {
        $(".history").append("<p>기록이 없습니다.</p>");
        $("#h-sel").prop("checked", false);
        $("#h-sel").prop("disabled", true);
        $("#h-remove-confirm").prop("disabled", true);
        listid = 0;
      }
    });
  });

  //unfocus
  $(document).click(function (e) {
    if ($(e.target).closest(".history").length != 0) return;
    hideList();
  });

  function redraw(id) {
    let idx = graphs.findIndex((g) => g.id == id);
    let graph = graphs.filter((g) => g.id == id)[0];

    switch (graph.type) {
      case "parabola":
        drawParabola(
          graph.F * 4 * gridLineWidth,
          (graph.F * 4 * gridLineWidth) / 4,
          graph.color
        );

        $(".list").append(
          `<div style="color: ${graph.color.replaceAll(
            ",",
            " "
          )}"><span>● <img src=${graph.equationURL} />
            </span></div>`
        );
        graph.active = true;
        graph.redraw = true;

        // $(`div[class='h-item'][value='${id}']`).remove();
        // graphs.splice(idx, 1);
        // listid -= 1;
        break;

      case "ellipse":
        drawEllipse(
          graph.a * gridLineWidth,
          graph.b * gridLineWidth,
          graph.F * gridLineWidth,
          graph.color
        );

        $(".list").append(
          `<div style="color: ${graph.color.replaceAll(",", " ")}">● <img src=${
            graph.equationURL
          } />
         </div>`
        );
        graph.active = true;
        graph.redraw = true;

        // $(`div[class='h-item'][value='${id}']`).remove();
        // graphs.splice(idx, 1);
        // listid -= 1;
        break;

      case "hyperbola":
        if (graphs[idx].shape === "x") {
          drawHyperbolaX(
            graph.a * gridLineWidth,
            graph.b * gridLineWidth,
            graph.f * gridLineWidth,
            graph.color
          );
        } else if (graphs[idx].shape === "y") {
          drawHyperbolaY(
            graph.a * gridLineWidth,
            graph.b * gridLineWidth,
            graph.f * gridLineWidth,
            graph.color
          );
        }

        $(".list").append(
          `<div style="color: ${graph.color.replaceAll(",", " ")}">● <img src=${
            graph.equationURL
          } />
             </div>`
        );
        graph.active = true;
        graph.redraw = true;

        // $(`div[class='h-item'][value='${id}']`).remove();
        // graphs.splice(idx, 1);
        // listid -= 1;
        break;
    }
  }

  //redraw graph
  $(document).on("click", "button", function () {
    for (var i = 0; i < graphs.length; i++) {
      let gID = `g-${graphs[i].id}`;
      let id = graphs[i].id;
      if ($(this).prop("id") == gID) {
        if (graphs[i].active) return alert("해당 그래프는 이미 존재합니다.");
        console.log(graphs[i]);
        redraw(id);
      }
    }
  });

  //fullscreen
  $("#fs").click(function () {
    toggleFullscreen("fs");
  });

  //좌표 기록
  let co_ac = false;
  let coord_list = $(".coord_list");

  function hideCoordList() {
    coord_list.fadeOut(function () {
      $(this).css({ display: "none" });
      coord_list.empty();
      coord_list.css({ width: "200px" });

      co_ac = false;
      expanded = false;
    });
  }

  $("#coord_list_btn").click(function (e) {
    e.stopPropagation();

    if (co_ac) {
      hideCoordList();
      return;
    }

    hideList();
    coord_list.fadeIn().css({ display: "flex" });
    coord_list.append("<div class='c_btns'></div><div class='c_list'></div>");

    for (var i = 0; i < graphs.length; i++) {
      $(".c_btns").append(
        `<button id="coord-${graphs[i].id}" value="${
          graphs[i].id
        }" style="color: ${graphs[i].color.replaceAll(",", " ")}">● <img src="${
          graphs[i].equationURL
        }" /></button>`
      );
    }

    if (graphs.length == 0) {
      $(".c_btns").css({ "align-items": "center" });
      $(".c_btns").append("<p>그래프가 없습니다.</p>");
    }

    co_ac = true;
  });

  //unfocus
  $(document).click(function (e) {
    if (
      $(e.target).closest(".bg").length != 0 ||
      $(e.target).closest(".coord_list").length != 0
    )
      return;
    hideCoordList();
  });

  //expand & hide list
  let expanded = false;

  $(document).on("click", "button[id^='coord-']", function () {
    if (expanded) {
      $(".c_list").fadeOut("fast", function () {
        $(this).css({ display: "none" });
        $(this).empty();
        expanded = false;
      });
      coord_list.css({ width: "200px" });
      return;
    }

    let c = $(this).val();
    let i = graphs.findIndex((g) => g.id == c);
    // let coords = graphs[i].coords;

    coord_list.css({ width: "600px" });
    $(".c_list").fadeIn().css({ display: "flex" });

    //range selector
    $(".c_list").append(
      `<div class='coords_menu'><input type='checkbox' class='c_selector' id='positiveX' value='${c}' /><label for='positiveX'>+x</label><input type='checkbox' class='c_selector' id='negativeX' value='${c}'/><label for='negativeX'>-x</label></div>`
    );

    expanded = true;
  });

  //range selector
  $(document).on("change", "input[class='c_selector']", function () {
    let c = $(this).val();
    let i = graphs.findIndex((g) => g.id == c);

    //1사분면
    var One = graphs[i].coords14[0];
    //2사분면
    var Two = graphs[i].coords23[0];
    //3사분면
    var Three = graphs[i].coords23[1];
    //4사분면
    var Four = graphs[i].coords14[1];

    //양수 좌표
    let PositiveCoords = [];
    for (var k = 0; k < One.length; k++) {
      PositiveCoords.push({
        x: One[k].x,
        y: { n: One[k].y, p: Four[k].y },
      });
    }

    //음수 좌표
    let NegativeCoords = [];
    for (var k = 0; k < Two.length; k++) {
      NegativeCoords.push({
        x: Two[k].x,
        y: { n: Two[k].y, p: Three[k].y },
      });
    }

    if ($("#positiveX").is(":checked") && $("#negativeX").is(":checked")) {
      $(".c_list").children().not(".coords_menu").remove();
      //전체 좌표
      let FullCoords = [].concat(
        ...NegativeCoords.reverse(),
        ...PositiveCoords
      );

      let cl = FullCoords.length < 30 ? FullCoords.length : 30;

      let cnt = 1;

      for (var q = 0; q < cl; q++) {
        let x = FullCoords[q].x / gridLineWidth;
        let Py = FullCoords[q].y.p / gridLineWidth;
        let Ny = FullCoords[q].y.n / gridLineWidth;
        let isDecimal = x % 1 == 0 ? false : true;

        if (Py == Ny) {
          $(".c_list").append(
            `<span id="coordinates" data-isDecimal="${isDecimal}">(${x}, ${Py.toFixed(
              6
            )})</span>`
          );
        } else {
          $(".c_list").append(
            `<span id="coordinates" data-isDecimal="${isDecimal}">(${x}, ${Py.toFixed(
              6
            )}), (${x}, ${Ny.toFixed(6)})</span>`
          );
        }

        if (q == cl - 1) {
          //load more coordinates on scroll
          $(".c_list").off("scroll");
          $(".c_list").scroll(function () {
            if (
              $(this).prop("scrollHeight") -
                $(this).scrollTop() -
                $(this).outerHeight() <
              2
            ) {
              // 스크롤바가 아래 쪽에 위치할 때
              for (var j = 30 * cnt; j < 30 * (cnt + 1); j++) {
                if (!FullCoords[j]) {
                  console.log("end of coordinates");
                  break;
                }
                let x = FullCoords[j].x / gridLineWidth;
                let Py = FullCoords[j].y.p / gridLineWidth;
                let Ny = FullCoords[j].y.n / gridLineWidth;
                let isDecimal = x % 1 == 0 ? false : true;

                if (Py == Ny) {
                  $(".c_list").append(
                    `<span id="coordinates" data-isDecimal="${isDecimal}">(${x}, ${Py.toFixed(
                      6
                    )})</span>`
                  );
                } else {
                  $(".c_list").append(
                    `<span id="coordinates" data-isDecimal="${isDecimal}">(${x}, ${Py.toFixed(
                      6
                    )}), (${x}, ${Ny.toFixed(6)})</span>`
                  );
                }
                console.log(j);
              }
              cnt++;
            }
          });
        }
      }
    } else if ($("#positiveX").is(":checked")) {
      $(".c_list").children().not(".coords_menu").remove();
      let cl = PositiveCoords.length < 30 ? PositiveCoords.length : 30;

      let cnt = 1;

      for (var q = 0; q < cl; q++) {
        let x = PositiveCoords[q].x / gridLineWidth;
        let Py = PositiveCoords[q].y.p / gridLineWidth;
        let Ny = PositiveCoords[q].y.n / gridLineWidth;
        let isDecimal = x % 1 == 0 ? false : true;

        if (Py == Ny) {
          $(".c_list").append(
            `<span id="coordinates" data-isDecimal="${isDecimal}">(${x}, ${Py.toFixed(
              6
            )})</span>`
          );
        } else {
          $(".c_list").append(
            `<span id="coordinates" data-isDecimal="${isDecimal}">(${x}, ${Py.toFixed(
              6
            )}), (${x}, ${Ny.toFixed(6)})</span>`
          );
        }

        if (q == cl - 1) {
          $(".c_list").off("scroll");

          //load more coordinates on scroll
          $(".c_list").scroll(function () {
            if (
              $(this).prop("scrollHeight") -
                $(this).scrollTop() -
                $(this).outerHeight() <
              2
            ) {
              // 스크롤바가 아래 쪽에 위치할 때
              for (var j = 30 * cnt; j < 30 * (cnt + 1); j++) {
                if (!PositiveCoords[j]) {
                  console.log("end of coordinates");
                  break;
                }
                let x = PositiveCoords[j].x / gridLineWidth;
                let Py = PositiveCoords[j].y.p / gridLineWidth;
                let Ny = PositiveCoords[j].y.n / gridLineWidth;
                let isDecimal = x % 1 == 0 ? false : true;

                if (Py == Ny) {
                  $(".c_list").append(
                    `<span id="coordinates" data-isDecimal="${isDecimal}">(${x}, ${Py.toFixed(
                      6
                    )})</span>`
                  );
                } else {
                  $(".c_list").append(
                    `<span id="coordinates" data-isDecimal="${isDecimal}">(${x}, ${Py.toFixed(
                      6
                    )}), (${x}, ${Ny.toFixed(6)})</span>`
                  );
                }
                console.log(j);
              }
              cnt++;
            }
          });
        }
      }
    } else if ($("#negativeX").is(":checked")) {
      $(".c_list").children().not(".coords_menu").remove();
      let cl = NegativeCoords.length < 30 ? NegativeCoords.length : 30;

      let cnt = 1;

      for (var q = 0; q < cl; q++) {
        let x = NegativeCoords[q].x / gridLineWidth;
        let Py = NegativeCoords[q].y.p / gridLineWidth;
        let Ny = NegativeCoords[q].y.n / gridLineWidth;
        let isDecimal = x % 1 == 0 ? false : true;

        if (Py == Ny) {
          $(".c_list").append(
            `<span id="coordinates" data-isDecimal="${isDecimal}" >(${x}, ${Py.toFixed(
              6
            )})</span>`
          );
        } else {
          $(".c_list").append(
            `<span id="coordinates" data-isDecimal="${isDecimal}">(${x}, ${Py.toFixed(
              6
            )}), (${x}, ${Ny.toFixed(6)})</span>`
          );
        }

        if (q == cl - 1) {
          $(".c_list").off("scroll");

          //load more coordinates on scroll
          $(".c_list").scroll(function () {
            if (
              $(this).prop("scrollHeight") -
                $(this).scrollTop() -
                $(this).outerHeight() <
              2
            ) {
              // 스크롤바가 아래 쪽에 위치할 때
              for (var j = 30 * cnt; j < 30 * (cnt + 1); j++) {
                if (!NegativeCoords[j]) {
                  console.log("end of coordinates");
                  break;
                }
                let x = NegativeCoords[j].x / gridLineWidth;
                let Py = NegativeCoords[j].y.p / gridLineWidth;
                let Ny = NegativeCoords[j].y.n / gridLineWidth;

                if (Py == Ny) {
                  $(".c_list").append(
                    `<span id="coordinates">(${x}, ${Py.toFixed(6)})</span>`
                  );
                } else {
                  $(".c_list").append(
                    `<span id="coordinates">(${x}, ${Py.toFixed(
                      6
                    )}), (${x}, ${Ny.toFixed(6)})</span>`
                  );
                }
                console.log(j);
              }
              cnt++;
            }
          });
        }
      }
    } else {
      $(".c_list").children().not(".coords_menu").remove();
    }
  });
});
