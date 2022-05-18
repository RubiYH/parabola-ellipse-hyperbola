//포물선
window.onload = function () {
  $("#p-draw").click(function () {
    if (!$("#p-F").val()) return alert("초점을 입력하세요.");
    if (Number($("#p-F").val()) == 0) return alert("초점은 0일 수 없습니다.");

    ctx.lineWidth = lineWidth;
    let color = random_rgb();
    let f = Number($("#p-F").val() * 4 * gridLineWidth);
    let p = f / 4; // 초점

    //좌표 기록
    let coords = [];

    //draw
    drawParabola = function (f, p, color) {
      if (f / gridLineWidth > 0) {
        // y값 양수
        const pointsPY = [];

        for (var i = 0; i < lwidth; i++) {
          let x = i;
          let y = Math.sqrt(2 * Math.abs(x) * Math.abs(p) + 2 * x * p);
          pointsPY.push({ x: x, y: y });
        }

        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(0, 0);
        for (const point of pointsPY) {
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

        //y값 음수
        const pointsNY = [];

        for (var i = 0; i < lwidth; i++) {
          let x = i;
          let y = -Math.sqrt(2 * Math.abs(x) * Math.abs(p) + 2 * x * p);
          pointsNY.push({ x: x, y: y });
        }

        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(0, 0);
        for (const point of pointsNY) {
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

        ctx.fillStyle = color;
        ctx.fillText("F", p, -20); //초점 F
        ctx.beginPath();
        ctx.arc(p, 0, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        //좌표 기록
        coords = [pointsPY, pointsNY];
      } else if (f / gridLineWidth < 0) {
        const pointsPY = [];
        for (var i = 0; i < lwidth; i++) {
          let x = i;
          let y = Math.sqrt(2 * Math.abs(x) * Math.abs(p) - 2 * x * p);
          pointsPY.push({ x: -x, y: y });
        }

        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(0, 0);
        for (const point of pointsPY) {
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

        const pointsNY = [];
        for (var i = 0; i < lwidth; i++) {
          let x = i;
          let y = -Math.sqrt(2 * Math.abs(x) * Math.abs(p) - 2 * x * p);
          pointsNY.push({ x: -x, y: y });
        }

        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(0, 0);
        for (const point of pointsNY) {
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

        ctx.fillStyle = color;
        ctx.fillText("F", p, -20); //초점 F
        // ctx.fillRect(f, -5, 10, 10); //초점
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.arc(p, 0, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        //좌표 기록
        coords = [pointsPY, pointsNY];
      }

      //준선
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.setLineDash([20, 20]);
      ctx.moveTo(-p, 0);
      ctx.lineTo(-p, lheight);
      ctx.stroke();
      ctx.lineTo(-p, -lheight);
      ctx.stroke();
      ctx.closePath();
    };

    drawParabola(f, p, color);

    //목록
    let equationURL = `https://latex.codecogs.com/svg.image?\\inline&space;\\large&space;y^{2}&space;=&space;${
      f / gridLineWidth
    }x`;
    $(".list").append(
      `<div style="color: ${color.replaceAll(
        ",",
        " "
      )}"><span>● <img src=${equationURL} />
      </span></div>`
    );

    graphs.push({
      id: listid,
      type: "parabola",
      F: p / gridLineWidth,
      color: color,
      equationURL: equationURL,
      active: true,
      redraw: false,
      coords: [].concat(...coords),
    });
    console.log(graphs);
    listid++;
  });
};
