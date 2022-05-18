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
    });
    coord_list.css({ width: "200px" });

    co_ac = false;
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
    if ($(e.target).closest(".coord_list").length != 0) return;
    hideCoordList();
  });

  //expand & hide list
  let expanded = false;

  $(document).on("click", "button[id^='coord-']", function () {
    if (expanded) {
      coord_list.css({ width: "200px" });
      $(".c_list").fadeOut("fast", function () {
        $(this).css({ display: "none" });
        $(this).empty();
        expanded = false;
      });
      return;
    }

    let c = $(this).val();
    let i = graphs.findIndex((g) => g.id == c);
    let coords = graphs[i].coords;

    coord_list.css({ width: "500px" });
    $(".c_list").fadeIn().css({ display: "flex" });
    let cl = coords.length > 30 ? 30 : coords.length;

    let cnt = 1;

    expanded = true;

    for (var j = 0; j < cl; j++) {
      var x = graphs[i].coords[j].x / gridLineWidth;
      var y = graphs[i].coords[j].y / gridLineWidth;
      var color = graphs[i].color.replaceAll(",", " ");
      $(".c_list").append(
        `<span id="coordinates" data-x="${x}" data-y="${y}" data-color="${color}">(${x}, ${y})</span>`
      );
      console.log(j);

      if (j == cl - 1) {
        //load coordinates on scroll
        $(".c_list").scroll(function () {
          if (
            this.scrollHeight - $(this).scrollTop() - $(this).outerHeight() <
            1
          ) {
            // 스크롤바가 아래 쪽에 위치할 때
            for (var j = 30 * cnt; j < 30 * (cnt + 1); j++) {
              var x = graphs[i].coords[j].x / gridLineWidth;
              var y = graphs[i].coords[j].y / gridLineWidth;
              $(".c_list").append(
                `<span id="coordinates" data-x="${x}" data-y="${y}" data-color="${color}">(${x}, ${y})</span>`
              );
              console.log(j);
            }
            cnt++;
          }
        });
      }
    }
  });

  //hover coordinates

  $(document).on("mouseover", "span[id='coordinates']", function () {
    let x = $(this).attr("data-x");
    let y = $(this).attr("data-y");
    let color = $(this).attr("data-color");

    $(".coord").css({
      display: "block",
      color: color,
      "font-size": fontsize,
    });
    $(".coord").text(`(${x}, ${y})`);

    var rect = c.getBoundingClientRect();
    let desX =
      (((3 * Number(x)) / 10 + center) * (rect.right - rect.left)) / width +
      rect.left;
    let desY =
      (((3 * Number(y)) / 10 + hcenter) * (rect.bottom - rect.top)) / width +
      rect.top;

    let converted_desX = parseInt(
      ((((desX * gridLineWidth - rect.left) / (rect.right - rect.left)) *
        canvas.width -
        center) *
        10) /
        3
    );

    let converted_desY = -parseInt(
      ((((desY * gridLineWidth - rect.top) / (rect.bottom - rect.top)) *
        canvas.height -
        hcenter) *
        10) /
        3
    );

    $(".coord").css({ top: converted_desY, left: converted_desX });
  });
});
