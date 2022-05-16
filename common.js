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

    $(".history")
      .fadeIn(function () {
        $(this).css({ display: "block" });
      })
      .addClass("toggle");
    $(".history").append(
      '<div class="h-remove"><input id="h-sel" type="checkbox"/><button id="h-remove-confirm" disabled><i class="fa-solid fa-trash-can"></i></button></div>'
    );
    activated = true;
    let cnt = 0;
    for (var i = 0; i < graphs.length; i++) {
      // if (graphs[i].redraw) continue;
      $(".hlist").append(
        `<div class="h-item" value="${graphs[i].id}"><input type="checkbox" id="h-checkbox" value="${graphs[i].id}" /><button id="g-${graphs[i].id}"><span style="color: ${graphs[i].color}">● </span><img src=${graphs[i].equationURL} /></button></div>`
      );
      cnt++;
    }
    if (cnt == 0) {
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
});
