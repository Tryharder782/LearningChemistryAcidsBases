
const beaker = (
  ctx: CanvasRenderingContext2D,
  lipHeight: number,
  lipWidthLeft: number,
  lipWidthRight: number,
  leftCornerRadius: number,
  rightCornerRadius: number,
  bottomGap: number,
  rightGap: number,
  fillColor: string,
) => {
  const { height: rectHeight, width: rectWidth } = ctx.canvas
  const rect = {
    width: rectWidth,
    height: rectHeight
  }
  ctx.beginPath();

  // Left lip curve
  ctx.arc(
    lipHeight + 1,
    lipHeight + 1,
    lipHeight - 1,
    270 * (Math.PI / 180),
    90 * (Math.PI / 180),
    true,
  );

  // Left lip
  ctx.lineTo(
    lipHeight + lipWidthLeft,
    lipHeight * 2,
  );

  // Left edge
  ctx.lineTo(
    lipHeight + lipWidthLeft,
    rect.height - leftCornerRadius - bottomGap,
  );

  // Bottom left curve
  ctx.quadraticCurveTo(
    lipHeight + lipWidthLeft,
    rect.height - bottomGap,
    lipHeight + lipWidthLeft + leftCornerRadius,
    rect.height - bottomGap,
  );

  // Bottom edge
  ctx.lineTo(
    rect.width - lipHeight - lipWidthRight - rightCornerRadius - rightGap,
    rect.height - bottomGap,
  );

  // Bottom right curve
  ctx.quadraticCurveTo(
    rect.width - lipHeight - lipWidthRight - rightGap,
    rect.height - bottomGap,
    rect.width - lipHeight - lipWidthRight - rightGap,
    rect.height - rightCornerRadius - bottomGap,
  );

  // Right edge
  ctx.lineTo(
    rect.width - lipHeight - lipWidthRight - rightGap,
    lipHeight * 2,
  );

  // Right lip
  ctx.lineTo(
    rect.width - lipHeight - rightGap,
    lipHeight * 2,
  );

  // Right lip curve
  ctx.arc(
    rect.width - lipHeight - rightGap,
    lipHeight + 1,
    lipHeight - 1,
    90 * (Math.PI / 180),
    270 * (Math.PI / 180),
    true,
  );

  ctx.closePath();
  if (fillColor === 'black') {
    ctx.lineWidth = 3;
    ctx.stroke();
  } else {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
}

export {
  beaker
}