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
    let coords = [];

    //draw
    drawEllipse = function (a, b, f, color) {
      //1사분면
      const points1 = [];
      for (var i = 0; i <= a; i++) {
        let x = i;
        let y = -Math.sqrt(a ** 2 * b ** 2 - b ** 2 * x ** 2) / a;
        points1.push({ x: x, y: y });
      }

      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(0, -b);
      for (const point of points1) {
        const xMid = (point.x + point.x) / 2;
        const yMid = (point.y + point.y) / 2;
        const cpX1 = (xMid + point.x) / 2;
        const cpX2 = (xMid + point.x) / 2;

        ctx.quadraticCurveTo(cpX1, point.y, xMid, yMid);
        ctx.quadraticCurveTo(cpX2, point.y, point.x, point.y);
      }
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();

      //2사분면
      const points2 = [];
      for (var i = 0; i <= a; i++) {
        let x = -i;
        let y = -Math.sqrt(a ** 2 * b ** 2 - b ** 2 * x ** 2) / a;
        points2.push({ x: x, y: y });
      }

      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(0, -b);
      for (const point of points2) {
        const xMid = (point.x + point.x) / 2;
        const yMid = (point.y + point.y) / 2;
        const cpX1 = (xMid + point.x) / 2;
        const cpX2 = (xMid + point.x) / 2;

        ctx.quadraticCurveTo(cpX1, point.y, xMid, yMid);
        ctx.quadraticCurveTo(cpX2, point.y, point.x, point.y);
      }
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();

      //3사분면
      const points3 = [];
      for (var i = 0; i <= a; i++) {
        let x = -i;
        let y = Math.sqrt(a ** 2 * b ** 2 - b ** 2 * x ** 2) / a;
        points3.push({ x: x, y: y });
      }

      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(0, b);
      for (const point of points3) {
        const xMid = (point.x + point.x) / 2;
        const yMid = (point.y + point.y) / 2;
        const cpX1 = (xMid + point.x) / 2;
        const cpX2 = (xMid + point.x) / 2;

        ctx.quadraticCurveTo(cpX1, point.y, xMid, yMid);
        ctx.quadraticCurveTo(cpX2, point.y, point.x, point.y);
      }
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();

      //4사분면
      const points4 = [];
      for (var i = 0; i <= a; i++) {
        let x = i;
        let y = Math.sqrt(a ** 2 * b ** 2 - b ** 2 * x ** 2) / a;
        points4.push({ x: x, y: y });
      }

      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(0, b);
      for (const point of points4) {
        const xMid = (point.x + point.x) / 2;
        const yMid = (point.y + point.y) / 2;
        const cpX1 = (xMid + point.x) / 2;
        const cpX2 = (xMid + point.x) / 2;

        ctx.quadraticCurveTo(cpX1, point.y, xMid, yMid);
        ctx.quadraticCurveTo(cpX2, point.y, point.x, point.y);
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
      coords = [points1, points2, points3, points4];
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
      coords: [].concat(...coords),
    });
    console.log(graphs);
    listid++;
  });
});
