$(document).ready(function () {
  //쌍곡선

  //가로로
  $("#h-draw-x").click(function () {
    if (!$("#ha-x").val() || !$("#hb-x").val())
      return alert("a와 b를 모두 입력해주세요.");
    if (Number($("#ha-x").val()) <= 0 || Number($("#hb-x").val()) <= 0)
      return alert("a와 b는 0이거나 음수일 수 없습니다.");

    ctx.lineWidth = lineWidth;
    let color = random_rgb();

    let a = Number($("#ha-x").val()) * gridLineWidth;
    let b = Number($("#hb-x").val()) * gridLineWidth;
    let f =
      Math.sqrt((a / gridLineWidth) ** 2 + (b / gridLineWidth) ** 2) *
      gridLineWidth; //초점

    let asymOn = false;

    if ($("#x-asym").is(":checked")) {
      asymOn = true;
    }

    //좌표 기록
    let coords23;
    let coords14;
    let coords;

    //draw
    drawHyperbolaX = function (a, b, f, color) {
      //1사분면
      const points1 = [];
      for (var i = a; i < lwidth; i++) {
        let x = i;
        let y;

        let c = Math.sqrt(a ** 2 + b ** 2);
        let e = c / a;
        y = -Math.sqrt(-((x - c) ** 2) + (a - e * x) ** 2);

        points1.push({ x: x, y: y });
      }

      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(a, 0);

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
      for (var i = a; i < lwidth; i++) {
        let x = -i;
        let y;

        let c = Math.sqrt(a ** 2 + b ** 2);
        let e = c / a;
        y = -Math.sqrt(-((x - c) ** 2) + (a - e * x) ** 2);

        points2.push({ x: x, y: y });
      }

      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(-a, 0);

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
      for (var i = a; i < lwidth; i++) {
        let x = -i;
        let y;

        let c = Math.sqrt(a ** 2 + b ** 2);
        let e = c / a;
        y = Math.sqrt(-((x - c) ** 2) + (a - e * x) ** 2);

        points3.push({ x: x, y: y });
      }

      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(-a, 0);

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
      for (var i = a; i < lwidth; i++) {
        let x = i;
        let y;

        let c = Math.sqrt(a ** 2 + b ** 2);
        let e = c / a;
        y = Math.sqrt(-((x - c) ** 2) + (a - e * x) ** 2);

        points4.push({ x: x, y: y });
      }

      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(a, 0);

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

      //점근선
      if (asymOn) {
        // + 부호
        let asymP = [];
        for (var i = -lwidth; i < lwidth; i++) {
          let x = i;
          let y = (b * x) / a;

          asymP.push({ x: x, y: y });
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.setLineDash([20, 20]);
        ctx.moveTo(asymP.shift().x, asymP.shift().y);
        ctx.lineTo(asymP.pop().x, asymP.pop().y);
        ctx.stroke();
        ctx.closePath();

        // - 부호
        let asymN = [];
        for (var i = -lwidth; i < lwidth; i++) {
          let x = i;
          let y = -((b * x) / a);

          asymN.push({ x: x, y: y });
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.setLineDash([20, 20]);
        ctx.moveTo(asymN.shift().x, asymN.shift().y);
        ctx.lineTo(asymN.pop().x, asymN.pop().y);
        ctx.stroke();
        ctx.closePath();
      }

      //좌표 기록
      coords = [points1, points2, points3, points4];
      coords23 = [[].concat(...points2), [].concat(...points3)];
      coords14 = [[].concat(...points1), [].concat(...points4)];
    };

    drawHyperbolaX(a, b, f, color);

    // 목록
    let equationURL = formatEquation(
      a,
      b,
      "https://latex.codecogs.com/svg.image?\\frac{x^{2}}{a_2}-\\frac{y^{2}}{b_2}=1"
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
      type: "hyperbola",
      shape: "x",
      asym: asymOn,
      c: f / gridLineWidth,
      a: a / gridLineWidth,
      b: b / gridLineWidth,
      color: color,
      equationURL: equationURL,
      active: true,
      redraw: false,
      coords: [].concat(...coords),
      coords23: coords23,
      coords14: coords14,
    });
    console.log(graphs);
    listid++;
  });

  //세로로
  $("#h-draw-y").click(function () {
    if (!$("#ha-y").val() || !$("#hb-y").val())
      return alert("a와 b를 모두 입력해주세요.");
    if (Number($("#ha-y").val()) <= 0 || Number($("#hb-y").val()) <= 0)
      return alert("a와 b는 0이거나 음수일 수 없습니다.");

    ctx.lineWidth = lineWidth;
    let color = random_rgb();

    let a = Number($("#ha-y").val()) * gridLineWidth;
    let b = Number($("#hb-y").val()) * gridLineWidth;
    let f =
      Math.sqrt((a / gridLineWidth) ** 2 + (b / gridLineWidth) ** 2) *
      gridLineWidth; //초점

    let asymOn = false;

    if ($("#y-asym").is(":checked")) {
      asymOn = true;
    }

    let coords23;
    let coords14;
    let coords;

    //draw
    drawHyperbolaY = function (a, b, f, color) {
      //1사분면
      const points1 = [];
      for (var i = 0; i < lheight; i++) {
        let x = i;
        let y;

        let c = Math.sqrt(a ** 2 + b ** 2);
        let e = c / b;
        y = -Math.sqrt(-(a ** 2 + x ** 2) / (1 - e ** 2));

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
      for (var i = 0; i < lheight; i++) {
        let x = -i;
        let y;

        let c = Math.sqrt(a ** 2 + b ** 2);
        let e = c / b;
        y = -Math.sqrt(-(a ** 2 + x ** 2) / (1 - e ** 2));

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
      for (var i = 0; i < lheight; i++) {
        let x = -i;
        let y;

        let c = Math.sqrt(a ** 2 + b ** 2);
        let e = c / b;
        y = Math.sqrt(-(a ** 2 + x ** 2) / (1 - e ** 2));

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
      for (var i = 0; i < lheight; i++) {
        let x = i;
        let y;

        let c = Math.sqrt(a ** 2 + b ** 2);
        let e = c / b;
        y = Math.sqrt(-(a ** 2 + x ** 2) / (1 - e ** 2));

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

      //y축 초점
      ctx.fillStyle = color;
      ctx.fillText("F′", 20, f + 10);
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

      //점근선
      if (asymOn) {
        // y 부호
        let asymP = [];
        for (var i = -lheight; i < lheight; i++) {
          let x = i;
          let y = (b * x) / a;

          asymP.push({ x: x, y: y });
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.setLineDash([20, 20]);
        ctx.moveTo(asymP.shift().x, asymP.shift().y);
        ctx.lineTo(asymP.pop().x, asymP.pop().y);
        ctx.stroke();
        ctx.closePath();

        // - 부호
        let asymN = [];
        for (var i = -lheight; i < lheight; i++) {
          let x = i;
          let y = -((b * x) / a);

          asymN.push({ x: x, y: y });
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.setLineDash([20, 20]);
        ctx.moveTo(asymN.shift().x, asymN.shift().y);
        ctx.lineTo(asymN.pop().x, asymN.pop().y);
        ctx.stroke();
        ctx.closePath();
      }

      //좌표 기록
      coords23 = [[].concat(...points2), [].concat(...points3)];
      coords14 = [[].concat(...points1), [].concat(...points4)];
      coords = [].concat(...points1, ...points2, ...points3, ...points4);
    };

    drawHyperbolaY(a, b, f, color);

    // 목록
    let equationURL = formatEquation(
      a,
      b,
      "https://latex.codecogs.com/svg.image?\\frac{x^{2}}{a_2}-\\frac{y^{2}}{b_2}=-1"
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
      type: "hyperbola",
      shape: "y",
      asym: asymOn,
      c: f / gridLineWidth,
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
