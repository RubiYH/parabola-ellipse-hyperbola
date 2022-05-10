$(document).ready(function () {
  //graphs list
  let activated = false;
  function hideList() {
    $(".history").fadeOut(function () {
      $(this).removeClass("toggle");
      $(".history").empty();
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
        $(this).css({ display: "flex" });
      })
      .addClass("toggle");

    activated = true;
    let cnt = 0;
    for (var i = 0; i < graphs.length; i++) {
      if (graphs[i].redraw) continue;
      $(".history").append(
        `<button id="g-${graphs[i].id}"><span style="color: ${graphs[i].color}">● </span><img src=${graphs[i].equationURL} /></button>`
      );
      cnt++;
    }
    if (cnt == 0) {
      $(".history").append("<p>기록이 없습니다.</p>");
    }
  });

  //unfocus
  $(document).click(function (e) {
    if ($(e.target).closest(".history").length != 0) return;
    hideList();
  });

  function redraw(id) {
    let graph = graphs[id];
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
        $(`#g-${graphs[id].id}`).remove();
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
        $(`#g-${graphs[id].id}`).remove();
        break;
      case "hyperbola":
        if (graphs[id].shape === "x") {
          drawHyperbolaX(
            graph.a * gridLineWidth,
            graph.b * gridLineWidth,
            graph.f * gridLineWidth,
            graph.color
          );
        } else if (graphs[id].shape === "y") {
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
        $(`#g-${graphs[id].id}`).remove();
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
});
