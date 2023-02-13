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
    let coords14;
    let coords23;
    let coords = [];

    //draw
    drawParabola = function (f, p, color) {
      if (f / gridLineWidth > 0) {
        // y값 음수
        const pointsPY = [];

        for (var i = 0; i < lwidth; i++) {
          let x = i;
          let y = Math.sqrt(Math.abs(4 * p * x));
          pointsPY.push({ x: x, y: y });
        }

        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(0, 0);

        for (var i = 0; i < pointsPY.length - 1; i++) {
          var x_mid = (pointsPY[i].x + pointsPY[i + 1].x) / 2;
          var cp_x2 = (x_mid + pointsPY[i + 1].x) / 2;
          ctx.quadraticCurveTo(
            cp_x2,
            pointsPY[i + 1].y,
            pointsPY[i + 1].x,
            pointsPY[i + 1].y
          );
        }

        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();

        //y값 양수
        const pointsNY = [];

        for (var i = 0; i < lwidth; i++) {
          let x = i;
          let y = -Math.sqrt(Math.abs(4 * p * x));
          pointsNY.push({ x: x, y: y });
        }

        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(0, 0);

        for (var i = 0; i < pointsNY.length - 1; i++) {
          var x_mid = (pointsNY[i].x + pointsNY[i + 1].x) / 2;
          var cp_x2 = (x_mid + pointsNY[i + 1].x) / 2;
          ctx.quadraticCurveTo(
            cp_x2,
            pointsNY[i + 1].y,
            pointsNY[i + 1].x,
            pointsNY[i + 1].y
          );
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
        coords = [pointsNY, pointsPY];
        coords14 = [[].concat(...pointsNY), [].concat(...pointsPY)];
        coords23 = [[], []];
      } else if (f / gridLineWidth < 0) {
        const pointsPY = [];
        for (var i = 0; i < lwidth; i++) {
          let x = i;
          let y = Math.sqrt(Math.abs(4 * p * x));
          pointsPY.push({ x: -x, y: y });
        }

        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(0, 0);

        for (var i = 0; i < pointsPY.length - 1; i++) {
          var x_mid = (pointsPY[i].x + pointsPY[i + 1].x) / 2;
          var cp_x2 = (x_mid + pointsPY[i + 1].x) / 2;
          ctx.quadraticCurveTo(
            cp_x2,
            pointsPY[i + 1].y,
            pointsPY[i + 1].x,
            pointsPY[i + 1].y
          );
        }

        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();

        const pointsNY = [];
        for (var i = 0; i < lwidth; i++) {
          let x = i;
          let y = -Math.sqrt(Math.abs(4 * p * x));
          pointsNY.push({ x: -x, y: y });
        }

        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(0, 0);

        for (var i = 0; i < pointsNY.length - 1; i++) {
          var x_mid = (pointsNY[i].x + pointsNY[i + 1].x) / 2;
          var cp_x2 = (x_mid + pointsNY[i + 1].x) / 2;
          ctx.quadraticCurveTo(
            cp_x2,
            pointsNY[i + 1].y,
            pointsNY[i + 1].x,
            pointsNY[i + 1].y
          );
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
        coords23 = [[].concat(...pointsNY), [].concat(...pointsPY)];
        coords14 = [[], []];
        coords = [].concat(...pointsNY, ...pointsPY);
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
      coords: coords,
      coords14: coords14,
      coords23: coords23,
    });
    console.log(graphs);
    listid++;
  });
};
