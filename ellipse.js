$(document).ready(function () {
  //타원
  $("#e-draw").click(function () {
    if (!$("#ea").val() || !$("#eb").val())
      return alert("a와 b를 모두 입력해주세요.");
    if (Number($("#ea").val()) <= 0 || Number($("#eb").val()) <= 0)
      return alert("a와 b는 0이거나 음수일 수 없습니다.");

    ctx.lineWidth = lineWidth;
    let color = random_rgb();

    let a = Number($("#ea").val()) * gridLineWidth;
    let b = Number($("#eb").val()) * gridLineWidth;
    let f = a > b ? Math.sqrt(a ** 2 - b ** 2) : Math.sqrt(b ** 2 - a ** 2); //초점

    //좌표 기록
    let coords23 = [];
    let coords14 = [];
    let coords = [];

    //draw
    drawEllipse = function (a, b, f, color) {
      let x_range = a; //x 범위

      //1사분면
      const points1 = [];
      for (var i = 0; i <= x_range; i++) {
        let x = i;
        let y;

        if (a >= b) {
          let c = Math.sqrt(a ** 2 - b ** 2);
          let e = c / a;
          y = -Math.sqrt(-((x - c) ** 2) + (a - e * x) ** 2);
        } else {
          let c = Math.sqrt(b ** 2 - a ** 2);
          let e = c / b;
          y = -(Math.sqrt(a ** 2 - x ** 2) / Math.sqrt(1 - e ** 2));
        }
        points1.push({ x: x, y: y });
      }

      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(0, -b);

      for (var i = 0; i < points1.length - 1; i++) {
        var x_mid = (points1[i].x + points1[i + 1].x) / 2;
        var cp_x2 = (x_mid + points1[i + 1].x) / 2;
        ctx.quadraticCurveTo(
          cp_x2,
          points1[i + 1].y,
          points1[i + 1].x,
          points1[i + 1].y
        );
      }

      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();

      //2사분면
      const points2 = [];
      for (var i = 0; i <= x_range; i++) {
        let x = -i;
        let y;

        if (a >= b) {
          let c = Math.sqrt(a ** 2 - b ** 2);
          let e = c / a;
          y = -Math.sqrt(-((x - c) ** 2) + (a - e * x) ** 2);
        } else {
          let c = Math.sqrt(b ** 2 - a ** 2);
          let e = c / b;
          y = -(Math.sqrt(a ** 2 - x ** 2) / Math.sqrt(1 - e ** 2));
        }
        points2.push({ x: x, y: y });
      }

      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(0, -b);

      for (var i = 0; i < points2.length - 1; i++) {
        var x_mid = (points2[i].x + points2[i + 1].x) / 2;
        var cp_x2 = (x_mid + points2[i + 1].x) / 2;
        ctx.quadraticCurveTo(
          cp_x2,
          points2[i + 1].y,
          points2[i + 1].x,
          points2[i + 1].y
        );
      }

      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();

      //3사분면
      const points3 = [];
      for (var i = 0; i <= x_range; i++) {
        let x = -i;
        let y;

        if (a >= b) {
          let c = Math.sqrt(a ** 2 - b ** 2);
          let e = c / a;
          y = Math.sqrt(-((x - c) ** 2) + (a - e * x) ** 2);
        } else {
          let c = Math.sqrt(b ** 2 - a ** 2);
          let e = c / b;
          y = Math.sqrt(a ** 2 - x ** 2) / Math.sqrt(1 - e ** 2);
        }
        points3.push({ x: x, y: y });
      }

      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(0, b);

      for (var i = 0; i < points3.length - 1; i++) {
        var x_mid = (points3[i].x + points3[i + 1].x) / 2;
        var cp_x2 = (x_mid + points3[i + 1].x) / 2;
        ctx.quadraticCurveTo(
          cp_x2,
          points3[i + 1].y,
          points3[i + 1].x,
          points3[i + 1].y
        );
      }

      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();

      //4사분면
      const points4 = [];
      for (var i = 0; i <= x_range; i++) {
        let x = i;
        let y;

        if (a >= b) {
          let c = Math.sqrt(a ** 2 - b ** 2);
          let e = c / a;
          y = Math.sqrt(-((x - c) ** 2) + (a - e * x) ** 2);
        } else {
          let c = Math.sqrt(b ** 2 - a ** 2);
          let e = c / b;
          y = Math.sqrt(a ** 2 - x ** 2) / Math.sqrt(1 - e ** 2);
        }

        points4.push({ x: x, y: y });
      }

      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(0, b);

      for (var i = 0; i < points4.length - 1; i++) {
        var x_mid = (points4[i].x + points4[i + 1].x) / 2;
        var cp_x2 = (x_mid + points4[i + 1].x) / 2;
        ctx.quadraticCurveTo(
          cp_x2,
          points4[i + 1].y,
          points4[i + 1].x,
          points4[i + 1].y
        );
      }

      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();

      //초점
      if (a > b) {
        //x축 초점
        ctx.fillStyle = color;
        ctx.fillText("F", f, -20);
        ctx.fillText("F′", -f, -20);
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.arc(f, 0, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(-f, 0, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
      } else if (a < b) {
        //y축 초점
        ctx.fillStyle = color;
        ctx.fillText("F′", 20, f - 10);
        ctx.fillText("F", 20, -f + 60);
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.arc(0, f, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(0, -f, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
      } else if (a == b) {
        //원의 중심
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.arc(0, 0, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
      }

      //좌표 기록
      coords23 = [[].concat(...points2), [].concat(...points3)];
      coords14 = [[].concat(...points1), [].concat(...points4)];
      coords = [].concat(...points1, ...points2, ...points3, ...points4);
    };

    drawEllipse(a, b, f, color);

    // 목록
    let equationURL = formatEquation(
      a,
      b,
      "https://latex.codecogs.com/svg.image?\\frac{x^{2}}{a_2}+\\frac{y^{2}}{b_2}=1"
    );
    $(".list").append(
      `<div style="color: ${color.replaceAll(
        ",",
        " "
      )}">● <img src=${equationURL} />
         </div>`
    );

    graphs.push({
      id: listid,
      type: "ellipse",
      F: f / gridLineWidth,
      a: a / gridLineWidth,
      b: b / gridLineWidth,
      color: color,
      equationURL: equationURL,
      active: true,
      redraw: false,
      coords: coords,
      coords23: coords23,
      coords14: coords14,
    });
    console.log(graphs);
    listid++;
  });
});
