let fontsize = "2rem";

$(document).ready(function () {
  //좌표 표시
  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: parseInt(
        ((((evt.clientX - rect.left) / (rect.right - rect.left)) *
          canvas.width -
          center) *
          10) /
          3
      ),
      y: -parseInt(
        ((((evt.clientY - rect.top) / (rect.bottom - rect.top)) *
          canvas.height -
          hcenter) *
          10) /
          3
      ),
    };
  }

  //마우스 호버
  $("#canvas").mousemove(function (e) {
    let sensitivity = 10; //반경

    for (const v in graphs) {
      console.log(graphs[v]);
      var Pos = getMousePos(c, e);
      console.log(Pos);
      let x = Pos.x;
      let y = Pos.y;
      let f = graphs[v].F;
      let p = graphs[v].F / 4;

      var passed;

      function isParabola(ax, ay) {
        if (!graphs[v].active) return;
        if (graphs[v].type !== "parabola") return;

        //포물선 그래프
        if (ay * ay == f * 4 * gridLineWidth * ax) {
          $(".coord").css({
            display: "block",
            color: graphs[v].color,
            "font-size": fontsize,
          });
          $(".coord").text(`(${ax / gridLineWidth}, ${ay / gridLineWidth})`);
          $(".coord").css({ top: e.clientY, left: e.clientX });
          return true;
        }
        //포물선 초점
        else if (ax / gridLineWidth == graphs[v].F && ay / gridLineWidth == 0) {
          $(".coord").css({ display: "block", color: graphs[v].color });
          $(".coord").text(
            `초점 F(${ax / gridLineWidth}, ${ay / gridLineWidth})`
          );
          $(".coord").css({ top: e.clientY, left: e.clientX });
          return true;
        }
        //포물선 준선
        else if (ax / gridLineWidth == -graphs[v].F) {
          $(".coord").css({
            display: "block",
            color: graphs[v].color,
            "font-size": fontsize,
          });
          $(".coord").text(`준선 (x = ${ax / gridLineWidth})`);
          $(".coord").css({ top: e.clientY, left: e.clientX });
          return true;
        } else {
          return false;
        }
      }

      function isEllipse(ax, ay) {
        if (!graphs[v].active) return;
        if (graphs[v].type !== "ellipse") return;

        let f = graphs[v].F;
        let a = graphs[v].a;
        let b = graphs[v].b;

        //타원 그래프
        if (
          b ** 2 * (ax / gridLineWidth) ** 2 +
            a ** 2 * (ay / gridLineWidth) ** 2 ==
          a ** 2 * b ** 2
        ) {
          $(".coord").css({
            display: "block",
            color: graphs[v].color,
            "font-size": fontsize,
          });
          $(".coord").text(`(${ax / gridLineWidth}, ${ay / gridLineWidth})`);
          $(".coord").css({ top: e.clientY, left: e.clientX });
          return true;
        }
        //타원 초점 F
        else if (
          a > b
            ? ax / gridLineWidth == f.toFixed(2) && ay == 0
            : ay / gridLineWidth == f.toFixed(2) && ax == 0
        ) {
          $(".coord").css({ display: "block", color: graphs[v].color });

          a > b
            ? $(".coord").text(`초점 F(${f}, 0)`)
            : $(".coord").text(`초점 F(0, ${f})`);

          $(".coord").css({ top: e.clientY, left: e.clientX });
          return true;
        }
        //타원 초점 F′
        else if (
          a > b
            ? ax / gridLineWidth == -f.toFixed(2) && ay == 0
            : ay / gridLineWidth == -f.toFixed(2) && ax == 0
        ) {
          $(".coord").css({ display: "block", color: graphs[v].color });

          a > b
            ? $(".coord").text(`초점 F′(-${f}, 0)`)
            : $(".coord").text(`초점 F′(0, -${f})`);

          $(".coord").css({ top: e.clientY, left: e.clientX });
          return true;
        }
      }

      function isHyperbola(ax, ay) {
        if (!graphs[v].active) return;
        if (graphs[v].type !== "hyperbola") return;

        let a = graphs[v].a;
        let b = graphs[v].b;
        let f = graphs[v].c;

        //쌍곡선 그래프
        if (
          b ** 2 * (ax / gridLineWidth) ** 2 -
            a ** 2 * (ay / gridLineWidth) ** 2 ==
            a ** 2 * b ** 2 ||
          b ** 2 * (ax / gridLineWidth) ** 2 -
            a ** 2 * (ay / gridLineWidth) ** 2 ==
            -(a ** 2 * b ** 2)
        ) {
          $(".coord").css({
            display: "block",
            color: graphs[v].color,
            "font-size": fontsize,
          });
          $(".coord").text(`(${ax / gridLineWidth}, ${ay / gridLineWidth})`);
          $(".coord").css({ top: e.clientY, left: e.clientX });
          return true;
        }
        //쌍곡선 초점 F
        else if (
          graphs[v].shape === "x"
            ? ax / gridLineWidth == f.toFixed(2) && ay == 0
            : ay / gridLineWidth == f.toFixed(2) && ax == 0
        ) {
          $(".coord").css({ display: "block", color: graphs[v].color });

          graphs[v].shape === "x"
            ? $(".coord").text(`초점 F(${f}, 0)`)
            : $(".coord").text(`초점 F(0, ${f})`);

          $(".coord").css({ top: e.clientY, left: e.clientX });
          return true;
        }
        //쌍곡선 초점 F′
        else if (
          graphs[v].shape === "x"
            ? ax / gridLineWidth == -f.toFixed(2) && ay == 0
            : ay / gridLineWidth == -f.toFixed(2) && ax == 0
        ) {
          $(".coord").css({ display: "block", color: graphs[v].color });

          graphs[v].shape === "x"
            ? $(".coord").text(`초점 F′(-${f}, 0)`)
            : $(".coord").text(`초점 F′(0, -${f})`);

          $(".coord").css({ top: e.clientY, left: e.clientX });
          return true;
        }
        //준선
        else if (graphs[v].asym == true) {
          if (
            ay / gridLineWidth == (b * (ax / gridLineWidth)) / a ||
            ay / gridLineWidth == -((b * (ax / gridLineWidth)) / a)
          ) {
            $(".coord").css({
              display: "flex",
              color: graphs[v].color,
              "flex-direction": "row",
              "align-items": "center",
            });

            let eq;
            let reduced = reduce(b, a);

            if (ay / gridLineWidth == (b * (ax / gridLineWidth)) / a) {
              if (reduced[0] == reduced[1]) {
                eq = `https://latex.codecogs.com/svg.image?y=x`;
              } else if (reduced[1] == 1) {
                eq = `https://latex.codecogs.com/svg.image?y=${reduced[0]}x`;
              } else {
                eq = `https://latex.codecogs.com/svg.image?y=\\frac{${reduced[0]}}{${reduced[1]}}x`;
              }
            } else if (
              ay / gridLineWidth ==
              -((b * (ax / gridLineWidth)) / a)
            ) {
              if (reduced[0] == reduced[1]) {
                eq = `https://latex.codecogs.com/svg.image?y=-x`;
              } else if (reduced[1] == 1) {
                eq = `https://latex.codecogs.com/svg.image?y=-${reduced[0]}x`;
              } else {
                eq = `https://latex.codecogs.com/svg.image?y=-\\frac{${reduced[0]}}{${reduced[1]}}x`;
              }
            }
            $(".coord").text(`점근선 `);
            $(".coord").append(`<div id="asym"><img src=${eq} /></div>`);
            $(".coord").css({ top: e.clientY, left: e.clientX });
            return true;
          }
        }
      }

      for (var i = -sensitivity; i < sensitivity; i += 0.5) {
        let ay = y + i; // y
        for (var j = -sensitivity; j < sensitivity; j += 0.5) {
          let ax = x + j; // x

          //포물선
          if (isParabola(ax, ay)) {
            passed = true;
            break;
            //타원
          } else if (isEllipse(ax, ay)) {
            passed = true;
            break;

            //쌍곡선
          } else if (isHyperbola(ax, ay)) {
            passed = true;
            break;
          }
        }
        if (passed) break;
      }
    }

    //끄기
    if (!passed) {
      $(".coord").css({ display: "none" });
    }
  });
});
