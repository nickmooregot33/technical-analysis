plot window;
window = high < low[1];

window.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
AddChartBubble(window is true,high + (high - low),"FW",Color.Red,yes);
