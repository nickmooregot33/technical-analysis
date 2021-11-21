plot window;
window = low > high[1];

window.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
AddChartBubble(window is true,low - (high - low),"RW",Color.Green,no);
